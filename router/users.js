const router = require('express').Router();


const { userRegValidator, userLoginValidator } = require('../middlewares/validator');
const { auth } = require('../middlewares/auth');
const  upload  = require('../middlewares/upload');
const { 
    userBookmarks,
    getUsers, 
    findUser,
    userSignup,
    userLogin,
    deleteUser,
    uploadAvatar 
} = require('../controllers/usersController');


router
.get("/dashboard",auth, userBookmarks)
.get("/", getUsers)
/* .post("/find",auth, findUser) */
.post("/register", userRegValidator, userSignup)
.post("/login",userLoginValidator, userLogin)
.delete("/:_id", auth, deleteUser )
.patch("/avatar/:_id", upload.single('avatar'), uploadAvatar)


module.exports = router;

