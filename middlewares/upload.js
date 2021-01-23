const multer = require('multer');

//multer config
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,done)=>{
        let filenameUpload = `${req.user}-${file.originalname}`
        done(null, filenameUpload);
    }
})

const upload = multer({storage: storage});

module.exports = upload;