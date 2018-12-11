var express = require("express");
var cons = require("consolidate");
var request = require("request");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var app = express();

var port = Number(process.env.PORT || 3000);

var url = "https://www.goodreads.com/quotes/tag/";
var tag = "sucess";

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.engine("html", cons.swig);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("home", {});
});

app.post("/", function(req, res) {
  //Get quotes by Scrapper
  var tag = req.body.tag;

  getQuotes(url + tag, (quotes, next, prev) => {
    console.log(next);

    res.render("home", {
      quotes,
      next,
      prev
    });
  });
});

app.get("/work/quotes/:id", function(req, res) {
  //Get quotes by Scrapper
  var id = req.params.id;

  console.log("https://goodreads.com/work/quotes/" + id);

  getQuotes("https://goodreads.com/work/quotes/" + id, (quotes, next, prev) => {
    res.render("home", {
      quotes,
      next,
      prev
    });
  });
});

app.get("/quotes/tag/:tag", function(req, res) {
  //Get quotes by Scrapper
  var tag = req.params.tag;
  var pth = req.originalUrl;

  console.log("https://goodreads.com" + pth);

  getQuotes("https://goodreads.com" + pth, (quotes, next, prev) => {
    res.render("home", {
      quotes,
      next,
      prev
    });
  });
});

app.get("*", function(req, res) {
  res.send(404, "Page not found");
});

// EX1

function getQuotes(url, cb) {
  request(url, function(err, resp, body) {
    if (err) cb({ err: "ERROR" });
    else {
      var $ = cheerio.load(body);

      var quotes = [];

      $(".quoteDetails").each((i, quote) => {
        // console.log(quote);

        var text = $(quote)
          .find(".quoteText")
          .text();
        text = text.substring(1, text.indexOf("―\n"));
        //   text = text.substring(text.indexOf('"'), text.indexOf('"') + 1);
        var author = $(quote)
          .find("span.authorOrTitle")
          .text()
          .replace(/\n/g, "");
        var book = $(quote)
          .find("a.authorOrTitle")
          .text();
        var more = $(quote)
          .find("a.authorOrTitle")
          .prop("href");
        var image = $(quote)
          .find(".leftAlignedImage img")
          .prop("src");

        let q = { text, author, book, more, image };

        quotes.push(q);
      });
      //   console.log(quotes);

      let next = $(".next_page").prop("href");
      let prev = $(".previous_page").prop("href");

      cb(quotes, next, prev);
    }
  });
}

app.listen(port, function() {
  console.log("Running on " + port);
});
