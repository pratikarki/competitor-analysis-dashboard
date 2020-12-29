//Scraping few information from alexa
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const website = 'sastodeal.com';
const writeStream = fs.createWriteStream(`alexaScrape_${website}.csv`);

const url = `https://www.alexa.com/siteinfo/${website}`;

(async function () {
    try {
        const res = await axios.get(url);
        console.log(res.status, res.statusText);
        let $ = cheerio.load(res.data);

        //function to get data of similar sites
        function getSimilarSitesData() {
            let title, similarSitesText, similarSitesOverlapText;
            let site = [];
            let score = [];

            //selecting title
            title = $('.smalltitle > h1').text();
            console.log(`${title}\n`);

            //selecting heading text
            similarSitesText = $('div[id="card_mini_audience"] > section[class="Header"] > div > h3 > span[class="Desktop"] > div[class="Catch "] > h3').text();
            similarSitesOverlapText = $('div[id="card_mini_audience"] > section > section[class="table "] > div[class="header"] > div[class="overlap"] > span > div[class="Catch "] > h3').text();    
            
            //writing headers to csv
            writeStream.write(`${similarSitesText}, ${similarSitesOverlapText}`);

            //selecting site and score
            $('div[id="card_mini_audience"] > section > section[class="table "] > div[class="Body"] > div[class="Row"]').each((i, el) => {
                site[i] = $(el).find('.site ').text().replace(/\s\s+/g, ''); // > div[class="Row"] > div[class="site "] > a[class="truncation"]
                score[i] = $(el).find('.overlap ').text().replace(/\s\s+/g, '');
                // const link = $(el).find('a').attr('href'); //console.log(`${site[i]}\n${score[i]}`);
                
                //writing each row to csv
                writeStream.write(`\n ${site[i]}, ${score[i]}`);
            });

            console.log(`Similar Sites: ${site}`);
            console.log(`Overlap Scores: ${score}`);
        }

        //function to get data of Site Metrics
        function getSiteMetricsData() {
            let headingText, subHeadingText, searchTrafficTitle, searchTrafficValue;
            let title = [];
            let value = [];

            //selecting heading texts
            headingText = $('div[id="card_metrics"] > section[class="Header"] > div > h3').text().split('\n')[0].replace(/\s\s+/g, '');
            subHeadingText = $('div[id="card_metrics"] > section[class="Header"] > div > p').text();

            //writing Headers to csv
            writeStream.write(`\n \n${headingText}`);

            //selecting title and value
            $('div[id="card_metrics"] > section[class="engagement"] > div[class="flex"] > div[class="Third sectional"]').each((i, el) => {

                //adding to array
                title[i] = $(el).find('.title').text().split('  \n')[0].replace(/\s\s+/g, '');
                value[i] = $(el).find('.small ').text().replace(/\s\s+/g, '').split(' ')[0];

                //writing each row to csv
                writeStream.write(`\n${title[i]},${value[i]}`);
            });

            //selecting Search Traffic title and value
            searchTrafficTitle =  $('div[id="card_mini_competitors"] > section[class="group"] > h5[class="title"]').text().split('\n')[0].replace(/\s\s+/g, '');
            searchTrafficValue =  $('#card_mini_competitors > section.group > div:nth-child(2) > div.ThirdFull.ProgressNumberBar > span').text();
            
            //adding to array
            title[title.length] = searchTrafficTitle;
            value[value.length] = searchTrafficValue;

            //writing search traffic to csv
            writeStream.write(`\n${searchTrafficTitle},${searchTrafficValue}`);

            console.log();
            console.log(`Site Metrics: ${title}`);
            console.log(`Value: ${value}`);
        }
    }
    catch(error) {
        console.log(error);
    }

    getSimilarSitesData();
    getSiteMetricsData();

}) ();




//APPENDIX

// $('div[id="card_mini_audience"] > section > section[class="table "] > div[class="Body"]').each((i, el) => {
//      //'> div[class="Row"] > div[class="overlap "] > span[class="truncation"]'
//     console.log(score);
// })

// let competitors = $('div[class="site "]').text(); $('div[id="card_mini_audience"] > section > ')

// let competitors = $('div[id="competitorsList"] > a').text();
//
// let globalRankValue = $('').text(); 

    //, similarSites