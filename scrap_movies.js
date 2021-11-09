// importing the modules cheerio -- stable module for web scrapping in node and axios for networking and its promise use case 
const cheerio = require("cheerio");
const axios = require("axios");

async function scrapeImdb(n) {
  const html = await axios.get("https://www.imdb.com/chart/boxoffice");
  const $ = await cheerio.load(html.data);
  let data = [];

  let movie = await new Promise(function (resolve, reject) {
    const allMovies = $("table.chart > tbody > tr");
    // n can be less or equal to total movies on the page
    n = n <= allMovies.length ? n : allMovies.length;
    allMovies.each(async (i, elem) => {
      if (i <= n) {
        const movieId = $(elem)
          .find("td.watchlistColumn > div.wlb_ribbon")
          .attr("data-tconst");
        let movieCast = await scrapeCast(movieId);
        data.push({
          movieCast: movieCast,
          title: $(elem).find("td.titleColumn > a").text(),
        });
        if (data.length == n) {
          resolve(data);
        }
      }
    });
  });
  console.log(data);
}


// Seperate Call to scrap the cast of movies
async function scrapeCast(id) {
  const html = await axios.get(`https://www.imdb.com/title/${id}/fullcredits`);
  const $ = await cheerio.load(html.data);
  let cast = [];
  $("table.cast_list > tbody > tr").each(function (index) {
    if ($(this).find("td.primary_photo a img").attr("title"))
      cast.push($(this).find("td.primary_photo a img").attr("title"));
  });
  return cast;
}

scrapeImdb(100);
