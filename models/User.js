const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: String,
        password: String,
        refreshTokens: [String]
    },
    {
        collection: 'user'
    }
);

const UserModel = mongoose.model('User', User);
module.exports = UserModel;