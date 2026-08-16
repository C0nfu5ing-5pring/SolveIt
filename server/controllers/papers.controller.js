import { db } from "../db/mysql.js";
import path from "path";

export const uploadPaper = async (req, res) => {
  try {
    const {
      title,
      class: className,
      subject,
      exam_name,
      country,
      state,
      year,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "You can only upload PDF files" });
    }

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Titile is required" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const [result] = await db.query(
      "INSERT INTO papers (uploaded_by, title, class, subject, exam_name, country, state, year, file_path) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        req.userId,
        title,
        className,
        subject,
        exam_name,
        country,
        state,
        year || null,
        filePath,
      ],
    );

    return res.json({
      success: true,
      paper: { id: result.insertId, title, file_path: filePath },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getPapers = async (req, res) => {
  try {
    const { class: className, subject, exam_name, country, state } = req.query;

    let query =
      "SELECT papers.*, users.name AS uploader_name FROM papers LEFT JOIN users ON papers.uploaded_by = users.id WHERE 1=1";
    const parameters = [];

    if (className) {
      query += " AND class = ?";
      parameters.push(className);
    }
    if (subject) {
      query += " AND subject = ?";
      parameters.push(subject);
    }

    if (exam_name) {
      query += "AND subject = ?";
      parameters.push(subject);
    }

    if (country) {
      query += " AND country = ?";
      parameters.push(country);
    }

    if (state) {
      query += " AND state = ?";
      parameters.push(state);
    }

    query += " ORDER BY uploaded_at DESC";

    const [papers] = await db.query(query, parameters);
    return res.json({
      success: true,
      count: papers.length,
      papers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};

export const downloadPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const [papers] = await db.query("SELECT * FROM papers WHERE id =?", [id]);

    if (papers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Paper not found" });
    }

    const paper = papers[0];

    await db.query(
      "UPDATE papers SET download_count = download_count + 1 WHERE id = ?",
      [id],
    );

    const filePath = path.join(process.cwd(), paper.file_path);

    return res.download(filePath, `${paper.title}.pdf`);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
