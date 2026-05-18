let notes = [];

function listNotes() {
  return notes;
}

function getNote(id) {
  return notes.find((note) => note.id === id) || null;
}

function createNote({ title = '', body = '' }) {
  const note = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(title),
    body: String(body),
  };

  notes.push(note);
  return note;
}

function updateNote(id, { title, body }) {
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return null;
  }

  const updated = {
    ...notes[index],
    ...(title !== undefined ? { title: String(title) } : {}),
    ...(body !== undefined ? { body: String(body) } : {}),
  };

  notes[index] = updated;
  return updated;
}

function deleteNote(id) {
  const before = notes.length;
  notes = notes.filter((note) => note.id !== id);
  return notes.length < before;
}

function resetStore() {
  notes = [];
}

module.exports = {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  resetStore,
};
