const router = require('express').Router();
const { getBookmarks, addBookmark, deleteBookmark, addLike, getBookmarksBySiteName } = require('../controllers/bookmarksController');
const { auth } = require('../middlewares/auth');


router
.route("/")
.get(getBookmarks)
.post(
    auth, 
    addBookmark,
    )

/* router
.route("/:website")
.get(getBookmarksBySiteName) */

router
.route("/:id")
.patch(auth, addLike)
.delete(auth, deleteBookmark); 
/* .patch(auth, async (req,res)=>{
    const username = await Users.findById(req.user).then(user => res.json(user.username))
    
}) */

module.exports = router;
