const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefreshToken = new Schema(
    {
        token: String,
    },
    {
        collection: 'refreshToken'
    }
);

const RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken);
module.exports = RefreshTokenModel;