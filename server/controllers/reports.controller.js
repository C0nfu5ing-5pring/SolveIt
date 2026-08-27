import { db } from "../db/mysql.js";

export const submitReport = async (req, res) => {
  try {
    const { name, email, bugType, description } = req.body;

    if (!name || !email || !bugType || !description) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const sql = `
        INSERT INTO bug_reports 
        (name, email, bug_type, description)
        VALUES (?, ?, ?, ? )
        `;

    await db.execute(sql, [name, email, bugType, description]);

    res.status(201).json({
      message: "Bug report submitted sucessfully",
    });
  } catch (err) {
    console.error("Submit report error :( :", err);

    res.status(500).json({
      message: "Failed to submit bug report",
    });
  }
};
