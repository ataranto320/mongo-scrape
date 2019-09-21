const mongoose = require("mongoose");

const schema = mongoose.schema;

const noteSchema = new schema ({
    title: String,
    sum: String,
    url: String,
    articles: {
        type: schema.types.id,
        ref: "Articles"
    }
});

const Notes = module.exports = mongoose.model("Note", noteSchema);

module.exports = Notes;