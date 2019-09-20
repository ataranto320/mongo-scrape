const mongoose = require("mongoose");

const schema = mongoose.schema;

const articlesSchema = new schema ({
    headline: {
        type: String,
        unique: true
    },

    sum: {
        type: String
    },

    url: {
        url: String
    }
});

const Articles = module.exports = mongoose.model("Articles", articleSchema);

module. exports = Articles;