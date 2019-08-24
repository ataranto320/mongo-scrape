// pasreses html to find elements 
const cheerio = require("cheerio");
// makes http request for the html page
const axios = require("axios");

// console.log()

//make request with axios from website. html page is passed as callback's third argument 
axios.get("webstie").then(function(response) {
    //load html into cheerio and save as variable
    // '$' becomes shorthand for cheerio commands
    const $ = cheerio.load(response.data);
    // empty array to save data that will be scrape
    let results = [];
    // with cheerio, find each p-tag (paragraph) with title of class
    $("p.title").each(function(i, element) {
        //save text of element in a "title" variable 
        let title = $(element).children().attr("href");

        // find parent/child tag and save href values as "link"
        // let link = $(element).parent().attr("href");
        // let link = $(element).children().attr("href");

        //save results in object that will be pushed into results array
        results.push({
            title: title,
            link: link
        });
    });
    console.log(results);
});