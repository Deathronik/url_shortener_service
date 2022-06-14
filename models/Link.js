const {Schema, Types, model} = require("mongoose");

const linkSchema = new Schema({
    owner: {type: Types.ObjectId, ref: "User", required: true},
    code: {type: String, required: true,  unique: true},
    from: {type: String, required: true, unique: true},
    to: {type: String, required: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0}
})

module.exports = model('Link', linkSchema)