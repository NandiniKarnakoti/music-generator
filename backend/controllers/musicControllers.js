const Music = require('../models/Music');
exports.createMusic = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ msg: 'Title and URL are required' });
  }

  try {
    const music = new Music({ title, url });
    await music.save();
    res.status(201).json({ msg: 'Music added successfully', music });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.find().sort({ createdAt: -1 });
    res.json(musicList);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.deleteMusic = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findByIdAndDelete(id);
    if (!music) {
      return res.status(404).json({ msg: 'Music not found' });
    }
    res.json({ msg: 'Music deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
