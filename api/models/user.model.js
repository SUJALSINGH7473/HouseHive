import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-view&psig=AOvVaw0_AmtardVe569zZpLt8f9Y&ust=1698571709159000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCMix2Ou2mIIDFQAAAAAdAAAAABAR"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;