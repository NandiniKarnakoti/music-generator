const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Music', musicSchema);
