//Scraping information from alexa
const axios = require('axios');
const cheerio = require('cheerio');
const lookup = require('country-code-lookup');

const website = 'sastodeal.com';

//all data are stored in these objects
let metricsData = {
    overallRank: '',
    bounceRate: '',
    searchTrafficPercent: '',
    avgTimeOnSite: '',
    avgPageView: ''
}
let similarSitesData = {
    allSimilarSites: [],
    allOverlapScores: [],
    allRanks: []
}
let countriesData = {
    allCountryCodes: [],
    allCountryNames: [],
    allVisitorPercents: [],
    allSiteCountryRanks: []
}
let url = `https://www.alexa.com/siteinfo/${website}`;

(async function () {
    try {
        let res = await axios.get(url);
        console.log(res.status, res.statusText);
        let $ = cheerio.load(res.data);

        //function to get data of site's metrics
        function getMetricsData() {
            //select Average Page View
            metricsData.avgPageView = $('#card_metrics > section.engagement > div.flex > div:nth-child(1) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];

            //select Average Time On Site
            metricsData.avgTimeOnSite = $('#card_metrics > section.engagement > div.flex > div:nth-child(2) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];

            //select Bounce Rate
            metricsData.bounceRate = $('#card_metrics > section.engagement > div.flex > div:nth-child(3) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];

            //select Search Traffic Percent
            metricsData.searchTrafficPercent = $('#card_mini_competitors > section.group > div:nth-child(2) > div.ThirdFull.ProgressNumberBar > span').text();

            //select Overall Rank
            metricsData.overallRank = $('#card_rank > section.rank > div.rank-global > div:nth-child(1) > div:nth-child(2) > p.big.data').text().replace(/\s+/g, ''); //.replace(/,/g, '');

            console.log(metricsData);
        }

        //function to get data of similar sites
        function getSimilarSitesData() {
            let similarSite, overlapScore, rank;

            //select site, score and rank of each site
            $('#card_overlap > div > div.padding20 > section > div.ThirdFull.Right > section > div.Body > div.Row').each((i, el) => {
                similarSite = $(el).find('.site ').text().replace(/\s\s+/g, '');
                similarSitesData.allSimilarSites.push(similarSite);

                overlapScore = $(el).find('.overlap ').text().replace(/\s\s+/g, '');
                similarSitesData.allOverlapScores.push(overlapScore);

                rank = $(el).find('.metric_two ').text().replace(/\s\s+/g, ''); //.replace(/,/g, '');
                similarSitesData.allRanks.push('#'+rank);
            });
            console.log(similarSitesData);
        }

        //function to get data of countries
        function getCountriesData() {
            let countryCode, countryName, visitorPercent, siteCountryRank;
            
            //select siteCountryRank of each country
            $('#countrydropdown > ul > li').each((i, el) => {
                siteCountryRank = $(el).find('.pull-right').text();
                if(siteCountryRank != '') {
                    countriesData.allSiteCountryRanks.push(siteCountryRank);
                }
            });

            //select CountryName, CountryCode and VisitorPercent of each country
            $('#card_geography > div > section:nth-child(3) > section > div.visitorList > ul > li').each((i, el) => {
                countryName = $(el).find('#countryName').text().substring(5);
                countriesData.allCountryNames.push(countryName);

                let info = lookup.byCountry(countryName);
                countryCode = info.fips;
                countriesData.allCountryCodes.push(countryCode);

                visitorPercent = $(el).find('#countryPercent').text();
                countriesData.allVisitorPercents.push(visitorPercent);
            })
            console.log(countriesData);
        }
        
    }
    catch(error) {
        console.log(error);
    }

    getMetricsData();
    getSimilarSitesData();
    getCountriesData();

}) ();
