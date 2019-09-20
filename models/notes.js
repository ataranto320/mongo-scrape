const mongoose = require("mongoose");

const schema = mongoose.schema;

const notesSchema = new schema ({
    title: String,
    sum: String,
    url: String
});

const Notes = module.exports = mongoose.model("Note", noteSchema);

module.exports = Notes;