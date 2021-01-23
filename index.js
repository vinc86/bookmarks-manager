const express = require('express');
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config()
const bookmarksRouter = require('./router/bookmarks')
const userRouter = require('./router/users')

app.use("/avatars", express.static(path.join(__dirname, "uploads")));
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))
app.use("/users", userRouter)
app.use("/bookmarks", bookmarksRouter)

require('./config/db')(app)