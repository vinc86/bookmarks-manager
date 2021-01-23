
const {model, Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    avatar:{
        type: String,
        default: null
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["User","Admin"],
        default: "User",
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

userSchema.methods.hashPassword = function(){
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(this.password, salt);
    return this.password = hash;

}




module.exports = model("users", userSchema);