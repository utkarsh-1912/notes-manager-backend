const Note = require('../models/Note');

// Add Note
exports.createNote = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newNote = await Note.create({ title, description, category });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const notes = await Note.find(filter).sort({ created_at: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, category, updated_at: new Date() },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
