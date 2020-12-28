const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: String,
        password: String,
    },
    {
        collection: 'user'
    }
);

const UserModel = mongoose.model('User', User);
module.exports = UserModel;