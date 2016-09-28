var mongoose = require('mongoose');
var utility = require('utility');
var config = require('../config');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: { type: String},
    pass: { type: String },
    email: { type: String, unique: true},
    url: { type: String },
    location: { type: String },
    is_block: {type: Boolean, default: false},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

});

// 公共插件
UserSchema.plugin(BaseModel);
UserSchema.virtual('avatar_url').get(function () {
    return config.gravatar + utility.md5(this.email.toLowerCase());
});

mongoose.model('User', UserSchema);