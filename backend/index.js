const express = require("express");
const cors = require("cors");
const PORT = 8000;

require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config.json");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/User");
const Note = require("./models/Note");

const app = express();

mongoose.connect(config.connectionString);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});
// account api
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "fullname is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({ error: true, message: "User Already Exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successful",
  });
});

// Login api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "please enter a email" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "please enter a password" });
  }

  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ error: true, message: "user not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "3600m",
    });

    return res.json({
      error: false,
      message: "login successfull",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      message: "invalid Credentials",
    });
  }
});

// Get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Add new note Api
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Enter The Title",
    });
  }
  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Enter The Content",
    });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note Added Successfully",
    });
  } catch (err) {
    return res.send(500).json({
      message: "Internal Server Error",
    });
  }
});

//edit note

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note not found",
      });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// get-all-notes Api
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message:"All Notes Retrived successfully"
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// Delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const  noteId  = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(500).json({
        error: true,
        message: "Note Not Found",
      });
    }
    await Note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({
      error: false,
      message: "note deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.send(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

// search-note 
app.get("/search-notes/",authenticateToken , async (req,res)=>{
  const {user} = req.user
  const {query} = req.query

  if(!query){
    return res.status(400).json({
      error:true,
      message:"Enter a Query for the search"
    })
  }
  try{
    const matchingNotes = await Note.find({userId:user._id,
      $or:[
        {title:{$regex: new RegExp(query,"i") } },
        {title:{$regex: new RegExp(query,"i") } }
      ]
    })

    return res.json({
      error:false,
      notes:matchingNotes,
      message:"Matched note retrived successfully"
    })
  }catch(error){
    return res.json({
      error:true,
      message:"Internal server Error"
    })
  }
})
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
