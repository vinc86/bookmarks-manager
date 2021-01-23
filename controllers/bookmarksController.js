const Bookmarks = require('../models/Bookmarks');
const meta = require("html-metadata-parser");
const Users = require('../models/Users');



exports.getBookmarks = async(req,res)=>{
    await Bookmarks
    .find()
    .sort({createdAt: -1})
    .then(bookmarks => {
        if(!bookmarks.length){
            return res
            .status(500)
            .json({error: "No Bookmarks saved"})
        }
        res.json(bookmarks)
    })
}

/* exports.getBookmarksBySiteName = async (req,res) =>{
    console.log(req.params.website)
    await Bookmarks.find({site_name: req.params.website})
    .then( result => res.json(result))
    .catch(err => res.status(500).json(err))
} */
exports.addBookmark = async (req,res)=>{
    const userId = req.user;
    const {url,status} = req.body;
    const checkBookmark = await Bookmarks.findOne({url});
    if(!url){
        return res.status(400).json({message: "Paste an Url to save"})
    }
    if(checkBookmark){
        return res.status(422).json({message: "Bookmark already saved"})
    }
    await meta.parser(url,(err,result)=>{
    
        try {
            if (err) throw err
            const {title,description,image,site_name} = result.og;
            const videoUrl = result.og.videos.length >0 ? result.og.videos[0].url : "" ;

            new Bookmarks({
                userId,
                url,
                status,
                title,
                description,
                image,
                site_name,
                videoUrl
            })
            .save()
            .then(bookmark => res.json(bookmark))
        } catch (err) {
            console.log(err)
        }
    })
}

exports.deleteBookmark = async(req,res)=>{
    const id = req.params.id;
    await Bookmarks.findById(id)
    .then( item => item.remove().then(()=>res.json({message: "Bookmark deleted"})))
}

exports.addLike = async(req,res) => {
    const userId = req.user;
    const getUserName = await Users.findById(userId).then(user => user.username)
    const bookmarkId = req.params.id;



    const toUpdate = await Bookmarks.findbyId(bookmarkId)
    Object.assign(toUpdate,{likes:[...getUsername]})
    res.json(toUpdate)
}