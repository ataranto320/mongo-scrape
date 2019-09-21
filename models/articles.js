const mongoose = require("mongoose");

const schema = mongoose.schema;

const articleSchema = new schema ({
    headline: {
        type: String,
        unique: true
    },

    sum: {
        type: String,
        required: true
    },

    url: {
        url: String,
        required: true
    },

    notes: [{
        type: schema.types.id,
        ref: "Notes"
    }]
});

const Articles = module.exports = mongoose.model("Articles", articleSchema);

module.exports = Articles;