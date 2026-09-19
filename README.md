# Solve it

SolveIt is a website that I've made as a student for students. Whenever I am preparing for any examinations, I didn't have any resources so I had to buy them or ask for notes from a friend. I wanted to change that so, I made this website. You can upload your notes, PYQs, ANY PDF related to studies FOR FREE on SolveIt.

# Features

- I've gone with a brutalist and a sketchy design
- Hand drawn shapes for avatar and hand written sentences on the home page
- The site is 100% responsive on small, medium and large screen devices
- You can browse, meaning you can look at what people have uploaded on the website.
- Browse page has a mansory layout which helps you look at many papers at a time (inspired by pinterest's layout)
- On the browse page, you can search for a particular paper using the search bar
- If you want to search specific types of papers, you can use filters
- Filters can filter on the basis of examination, year, class, subject, country and state
- You can even download the PDF of what others have posted
- If you click on a paper, you will be able to see that paper on the website itself without downloading it, once you click on it, you can see the many other detailes of the paper such as uploaded by, length of document in pages, size of the document, description, etc.
- You can post your own notes too! Using the Upload page
- Upload page consists of many many many exams, and multiple countries like India, Australia, The USA, Canada and China with multiple their competitive exams like SAT, ACT, Gaokao, QCE etc.
- If the examination is state-specific, you can select the state also
- You can report a bug if you face one on Report a Bug page
- While reporting a bug, you can select any suitable reason and explain the issue faced by you while using the website
- In the settings page, you can change the email address, change password OR edit your avatar as well as see your uploads and delete them if you want
- You can delete your account if you want through settings page itself
- Every paper that you see on the website is stored in my Raspberry Pi 5
- I have used Cloudflared private tunnel (I applied for Nest but they are facing some problems so I had to continue with cloudflared)
- Raspberry Pi acts as the server and handles the backend part of the website
- For above mentioned features, I have controllers papers, auth and reports with functions like updateEmail, updateAvatar, uploadPaper, deletePaper, getMyPapers
- Routes like /getPaperById, /my-papers, /update-email, /change-avatar, /delete-me, /change-password and many more
- All the data is stored and managed using MariaDB on the Raspberry Pi
- All the passwords are first encrypted and then stored in the database

# Screenshots

![Home Page](/client/public/images/homepage.png)
![Log in Page](/client/public/images/loginpage.png)
![Sign up Page](/client/public/images/signuppage.png)
![Browse Page](/client/public/images/browsepage.png)
![Upload Page](/client/public/images/uploadpage.png)
![Report a Bug Page](/client/public/images/reportabugpage.png)
![Settings Page](/client/public/images/settingspage.png)
![Update Avatar Modal](/client/public/images/upadateavatarmodal.png)

# Live Website

[SolveIt](https://www.solve-it-nine.vercel.app)

# Architecture

- Frontend is deployed on Vercel
- Backend and uploaded PDFs are hosted on Raspberry Pi 5

# Technologies Used

- Next.js
- React
- TailwindCSS
- TypeScript
- JSX
- MariaDB
- Express.js
- Raspberry Pi
- Vercel

# Libaries Used

- bcrypt
- react-toastify
- react-dom

# AI Usage

Used AI to generate SVG of sketched borders to make the site more leaned towards the theme. Used AI for handling password encryption as I have never done that before.

# Thank you
