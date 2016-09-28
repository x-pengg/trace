var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var PhotoSchema = new Schema({

    photo_url: { type: String },
    lat: { type: Number },
    lon: { type: Number },
    camera: { type: String },
    moment: { type: Date, default: Date.now },
    user_id:{ type: ObjectId  }

});

mongoose.model('Photo', PhotoSchema);