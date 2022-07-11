const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    owner_id:{
        type: String,
    },
    store_name:{
        type: String,
    },
    required:[
        'id',
        'store_name',
    ],
});
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    full_name:{
        type: String,
    },
    password: {
        type: String, // encrypted type instead of String
    },
    email: {
        type: String,
    },
    // token: {
    //     type: String,
    // },
    stores: {
        type: [StoreSchema],
    },
    required: [
        'username',
        'password',
        
    ]

});
module.exports = mongoose.model('User', UserSchema);