const {model, Schema} = require('mongoose');

const bookmarkSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: String,
    image: String,
    description: String,
    site_name: String,
    videoUrl: String,
    url: {
        type: String,
        required: true,
    },
    
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    likes: [
        {
        username: String, 
        }
    ],
    comments:[
        {
            username: String,
            body: String,
            createdAt: {
                type: Date,
                defalut: Date.now().toLocaleString()
            }
        }
    ]
},{
    timestamps: true
})

module.exports = model("bookmarks", bookmarkSchema);