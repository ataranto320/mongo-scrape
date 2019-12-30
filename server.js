// Start the server
// app.listen(process.env.PORT || 3000, function () {
//     console.log("App running on port " + PORT + "!");

// pasreses html to find elements 
const cheerio = require("cheerio");
// makes http request for the html page
const axios = require("axios");

const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const app = express();

const databaseUrl = "news";
const collections = ["scrappedData"];

// connect to mongo db
mongoose.connect("mongodb://localhost/scehma", {useNewUrlParser: true });

// create an object containing dummy data to save to database
// let data = {
//     array: ["headline", "sum", "url"]
// };

// hook mongojs config to db variable
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// app.get("/", function(req, res) {
//     res.send("message");
// });

app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(error, found) {
        if(error) {
            console.log(error);
        }
        else {
            res.json(found);
        }
    });
});

app.get("/scrape", function(req, res) {
    axios.get("website").then(function(response) {
        const $ = cheerio.load(response.data);
        $(".tittle").each(function(i, element) {
            let title = $(element).children("a").text();
            let link = $(element).children("a").attr("href");

            if (title && link) {
                //insert the data in scrapedData db
                db.scrapedData.insert({
                    title: title,
                    link: link
                },
                function(err, inserted) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                });
            }
        });
    });
    res.send("Done Scrapping");
});

app.listen(3000, function() {
    console.log("app running on 3000 port");
});

// console.log()

//make request with axios from website. html page is passed as callback's third argument 
// axios.get("webstie").then(function(response) {
//     //load html into cheerio and save as variable
//     // '$' becomes shorthand for cheerio commands
//     const $ = cheerio.load(response.data);
//     // empty array to save data that will be scrape
//     let results = [];
//     // with cheerio, find each p-tag (paragraph) with title of class
//     $("p.title").each(function(i, element) {
//         //save text of element in a "title" variable 
//         let title = $(element).children().attr("href");

//         // find parent/child tag and save href values as "link"
//         // let link = $(element).parent().attr("href");
//         // let link = $(element).children().attr("href");

//         //save results in object that will be pushed into results array
//         results.push({
//             title: title,
//             link: link
//         });
//     });
//     console.log(results);
// });