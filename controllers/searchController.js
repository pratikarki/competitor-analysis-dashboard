//Scraping from Alexa and Getting data from Spyfu
const axios = require('axios');
const cheerio = require('cheerio');
const lookup = require('country-code-lookup');

// import axios from 'axios';
// import cheerio from 'cheerio';
// import lookup from 'country-code-lookup';


exports.getDomainData = async (domain) => {
  // define an object
  let domainID;
  let data = {
    name: domain,
    url: `https://www.${domain}`,
    overallRank: '',
    bounceRate: '',
    searchTrafficPercent: '',
    avgTimeOnSite: '',
    avgPageView: '',
    noOrganicSearchKeyword: 0,
    estMonthlySeoClick: 0,
    estMonthlySeoClickValue: 0,
    similarSites: {
      siteName: [],
      overlapScore: [],
      rank: []
    },
    countries: {
      countryCode: [],
      countryName: [],
      visitorPercent: [],
      siteCountryRank: []
    },
    clicks: {
      categories: [],
      organicClicks: [],
      paidClicks: []
    },
    topPages: {
      pageTitle: [],
      topKeyword: [],
      pageUrl: [],
      keywordCount: [],
      estMonthlySeoClicks: []
    },
    backlinks: {
      backlinkDomain: [],
      backlinkUrl: [],
      domainMonthlyOrganicClicks: [],
      pageMonthlyOrganicClicks: [],
      domainStrength: [],
      rankedKeywords: [],
      outboundLinks: []
    },
    keywords: {
      allTypes: [],
      allKeywords: [],
      allUrls: [],
      allSeoClicks: [],
      allSearchVolumes: [],
      allRanks: [],
      allMonthlyClicks: []
    }
  }

  //define all async functions

  async function Scraper() {
    let url = `https://www.alexa.com/siteinfo/${domain}`;
    try {
      let res = await axios.get(url);
      console.log(res.status, res.statusText);
      let $ = cheerio.load(res.data);
  
      //function to get data of site's metrics
      function getMetricsData() {
        //select Average Page View
        data.avgPageView = $('#card_metrics > section.engagement > div.flex > div:nth-child(1) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];
  
        //select Average Time On Site
        data.avgTimeOnSite = $('#card_metrics > section.engagement > div.flex > div:nth-child(2) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];
  
        //select Bounce Rate
        data.bounceRate = $('#card_metrics > section.engagement > div.flex > div:nth-child(3) > p.small.data').text().replace(/\s\s+/g, '').split(' ')[0];
  
        //select Search Traffic Percent
        data.searchTrafficPercent = $('#card_mini_competitors > section.group > div:nth-child(2) > div.ThirdFull.ProgressNumberBar > span').text();
  
        //select Overall Rank
        data.overallRank = $('#card_rank > section.rank > div.rank-global > div:nth-child(1) > div:nth-child(2) > p.big.data').text().replace(/\s+/g, ''); //.replace(/,/g, '');
  
      }
  
      //function to get data of similar sites
      function getSimilarSites() {
        let similarSite, overlapScore, rank;
  
        //select site, score and rank of each site
        $('#card_overlap > div > div.padding20 > section > div.ThirdFull.Right > section > div.Body > div.Row').each((i, el) => {
          similarSite = $(el).find('.site ').text().replace(/\s\s+/g, '');
          data.similarSites.siteName.push(similarSite);
  
          overlapScore = $(el).find('.overlap ').text().replace(/\s\s+/g, '');
          data.similarSites.overlapScore.push(overlapScore);
  
          rank = $(el).find('.metric_two ').text().replace(/\s\s+/g, ''); //.replace(/,/g, '');
          data.similarSites.rank.push('#'+rank);
        });
      }
  
      //function to get data of countries
      function getCountries() {
        let countryCode, countryName, visitorPercent, siteCountryRank;
        
        //select siteCountryRank of each country
        $('#countrydropdown > ul > li').each((i, el) => {
          siteCountryRank = $(el).find('.pull-right').text();
          if(siteCountryRank != '') {
            data.countries.siteCountryRank.push(siteCountryRank);
          }
        });
  
        //select CountryName, CountryCode and VisitorPercent of each country
        $('#card_geography > div > section:nth-child(3) > section > div.visitorList > ul > li').each((i, el) => {
          countryName = $(el).find('#countryName').text().substring(5);
          data.countries.countryName.push(countryName);
  
          let info = lookup.byCountry(countryName);
          countryCode = info.fips;
          data.countries.countryCode.push(countryCode);
  
          visitorPercent = $(el).find('#countryPercent').text();
          data.countries.visitorPercent.push(visitorPercent);
        })
      }
    getMetricsData();
    getSimilarSites();
    getCountries();
    }
    catch(error) {
      console.log(error);
    }
  }
  
  async function getDomainID() {
    const URL = `https://www.spyfu.com/Endpoints/Search/JsonSearch?query=${domain}&tryAsTermFirst=false&isSiteQuery=true`;
    try {
      const res = await axios.get(URL);
      console.log(res.status, res.statusText);
      domainID = res.data.QueryId;
  
      async function getOverview() {
        const URL = `https://www.spyfu.com/NsaApi/Domain/KeywordRankChanges?domainId=${domainID}`;
        try {
          const res = await axios.get(URL);
          console.log(res.status, res.statusText);
          const result = res.data;
  
          let noOrganicSearchKeyword, estMonthlySeoClick, estMonthlySeoClickValue;
  
          noOrganicSearchKeyword = result.CurrentTotalCount;
          data.noOrganicSearchKeyword = noOrganicSearchKeyword;
  
          estMonthlySeoClick = result.CurrentMonthlyClicks;
          data.estMonthlySeoClick = estMonthlySeoClick;
  
          estMonthlySeoClickValue = result.CurrentMonthlyValue;
          data.estMonthlySeoClickValue = estMonthlySeoClickValue;
  
        } catch(error) {
          console.log(error);
        }
      }
  
      async function getClicks() {
        const URL = `https://www.spyfu.com/NsaApi/Domain/ChartOrganicVsPaidClicks?domainId=${domainID}&numberOfMonths=12`;
        
        try {
          const res = await axios.get(URL);
          console.log(res.status, res.statusText);
          const result = res.data;
      
          let category, organicClick, paidClick;
      
          for(let i=0; i < result.Categories.length; i++) {
            category = result.Categories[i];
            data.clicks.categories.push(category);
  
            organicClick = result.Organic_Clicks[i];
            data.clicks.organicClicks.push(organicClick);
  
            paidClick = result.Paid_Clicks[i];
            data.clicks.paidClicks.push(paidClick);
          }
  
        } catch (error) {
          console.error(error);
        }
      }
  
      getOverview();
      getClicks();
  
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getKeywords() {
    const URL = `https://www.spyfu.com/NsaApi/Serp/GetAllOrganicKeywordLists?query=${domain}`;
    try {
      const res = await axios.get(URL);
      console.log(res.status, res.statusText);
      const result = res.data;
  
      let keyword, url, seoClick, searchVolume, rank, monthlyClick;
      let temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
  
      result.forEach(el => {
        if (el.searchType == 'MostValuable') {
          data.keywords.allTypes.push('Top Keywords');
  
          el.keywords.forEach(ele => {
            keyword = ele.keyword;
            temp_keywords.push(keyword);
  
            url = ele.topRankedUrl;
            temp_urls.push(url);
  
            seoClick = ele.seoClicks;
            temp_seoClicks.push(seoClick);
  
            searchVolume = ele.searchVolume;
            temp_searchVolumes.push(searchVolume);
  
            rank = ele.rank;
            temp_ranks.push(rank);
  
            monthlyClick = ele.totalMonthlyClicks;
            temp_monthlyClicks.push(monthlyClick);
          })
  
          data.keywords.allKeywords.push(temp_keywords);
          data.keywords.allUrls.push(temp_urls);
          data.keywords.allSeoClicks.push(temp_seoClicks);
          data.keywords.allSearchVolumes.push(temp_searchVolumes);
          data.keywords.allRanks.push(temp_ranks);
          data.keywords.allMonthlyClicks.push(temp_monthlyClicks);
  
          temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
        }
  
        if (el.searchType == 'NewlyRanked') {
          data.keywords.allTypes.push('New Keywords');
  
          el.keywords.forEach(ele => {
            keyword = ele.keyword;
            temp_keywords.push(keyword);
  
            url = ele.topRankedUrl;
            temp_urls.push(url);
  
            seoClick = ele.seoClicks;
            temp_seoClicks.push(seoClick);
  
            searchVolume = ele.searchVolume;
            temp_searchVolumes.push(searchVolume);
  
            rank = ele.rank;
            temp_ranks.push(rank);
  
            monthlyClick = ele.totalMonthlyClicks;
            temp_monthlyClicks.push(monthlyClick);
          })
  
          data.keywords.allKeywords.push(temp_keywords);
          data.keywords.allUrls.push(temp_urls);
          data.keywords.allSeoClicks.push(temp_seoClicks);
          data.keywords.allSearchVolumes.push(temp_searchVolumes);
          data.keywords.allRanks.push(temp_ranks);
          data.keywords.allMonthlyClicks.push(temp_monthlyClicks);
  
          temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
        }
  
        if (el.searchType == 'GainedClicks') {
          data.keywords.allTypes.push('Clicks Gaining Keywords');
  
          el.keywords.forEach(ele => {
            keyword = ele.keyword;
            temp_keywords.push(keyword);
  
            url = ele.topRankedUrl;
            temp_urls.push(url);
  
            seoClick = ele.seoClicks;
            temp_seoClicks.push(seoClick);
  
            searchVolume = ele.searchVolume;
            temp_searchVolumes.push(searchVolume);
  
            rank = ele.rank;
            temp_ranks.push(rank);
  
            monthlyClick = ele.totalMonthlyClicks;
            temp_monthlyClicks.push(monthlyClick);
          })
  
          data.keywords.allKeywords.push(temp_keywords);
          data.keywords.allUrls.push(temp_urls);
          data.keywords.allSeoClicks.push(temp_seoClicks);
          data.keywords.allSearchVolumes.push(temp_searchVolumes);
          data.keywords.allRanks.push(temp_ranks);
          data.keywords.allMonthlyClicks.push(temp_monthlyClicks);
  
          temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
        }
  
        if (el.searchType == 'LostClicks') {
          data.keywords.allTypes.push('Clicks Losing Keywords');
  
          el.keywords.forEach(ele => {
            keyword = ele.keyword;
            temp_keywords.push(keyword);
  
            url = ele.topRankedUrl;
            temp_urls.push(url);
  
            seoClick = ele.seoClicks;
            temp_seoClicks.push(seoClick);
  
            searchVolume = ele.searchVolume;
            temp_searchVolumes.push(searchVolume);
  
            rank = ele.rank;
            temp_ranks.push(rank);
  
            monthlyClick = ele.totalMonthlyClicks;
            temp_monthlyClicks.push(monthlyClick);
          })
  
          data.keywords.allKeywords.push(temp_keywords);
          data.keywords.allUrls.push(temp_urls);
          data.keywords.allSeoClicks.push(temp_seoClicks);
          data.keywords.allSearchVolumes.push(temp_searchVolumes);
          data.keywords.allRanks.push(temp_ranks);
          data.keywords.allMonthlyClicks.push(temp_monthlyClicks);
  
          temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
        }
  
        if (el.searchType == 'PageOne') {
          data.keywords.allTypes.push('First Page Keywords');
  
          el.keywords.forEach(ele => {
            keyword = ele.keyword;
            temp_keywords.push(keyword);
  
            url = ele.topRankedUrl;
            temp_urls.push(url);
  
            seoClick = ele.seoClicks;
            temp_seoClicks.push(seoClick);
  
            searchVolume = ele.searchVolume;
            temp_searchVolumes.push(searchVolume);
  
            rank = ele.rank;
            temp_ranks.push(rank);
  
            monthlyClick = ele.totalMonthlyClicks;
            temp_monthlyClicks.push(monthlyClick);
          })
  
          data.keywords.allKeywords.push(temp_keywords);
          data.keywords.allUrls.push(temp_urls);
          data.keywords.allSeoClicks.push(temp_seoClicks);
          data.keywords.allSearchVolumes.push(temp_searchVolumes);
          data.keywords.allRanks.push(temp_ranks);
          data.keywords.allMonthlyClicks.push(temp_monthlyClicks);
          
          temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
        }
      })
    } 
    catch (error) {
      console.error(error);
    }
  }
  
  async function getTopPages() {
    const URL = `https://www.spyfu.com/NsaApi/Serp/GetTopPages?domain=${domain}&pageSize=5&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=true`;
  
    try {
      const res = await axios.get(URL);
      console.log(res.status, res.statusText);
      const result = res.data;
  
      let title, topKeyword, url, keywordCount, estMonthlySeoClick;
  
      result.topPages.forEach(el => {
        title = el.title;
        data.topPages.pageTitle.push(title);
  
        topKeyword = el.topKeyword;
        data.topPages.topKeyword.push(topKeyword);
  
        url = el.url;
        data.topPages.pageUrl.push(url);
  
        keywordCount = el.keywordCount;
        data.topPages.keywordCount.push(keywordCount);
  
        estMonthlySeoClick = el.estMonthlySeoClicks;
        data.topPages.estMonthlySeoClicks.push(estMonthlySeoClick);
      });
  
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getBacklinks() {
    const URL = `https://www.spyfu.com/NsaApi/Backlink/GetUrlSearch`;
    try {
      const res = await axios.post(URL, { query: `${domain}` });
      console.log(res.status, res.statusText);
      const result = res.data;

      let backlinkDomain, backlink, domainMonthlyOrganicClick, pageMonthlyOrganicClick, domainStrength, rankedKeyword, outboundLink;
  
      result.backlinks.forEach(el => {
        backlinkDomain = el.backlinkDomain;
        data.backlinks.backlinkDomain.push(backlinkDomain);
  
        backlink = el.url;
        data.backlinks.backlinkUrl.push(backlink);
  
        domainMonthlyOrganicClick = el.domainMonthlyOrganicClicks;
        data.backlinks.domainMonthlyOrganicClicks.push(domainMonthlyOrganicClick);
  
        pageMonthlyOrganicClick = el.pageMonthlyOrganicClicks;
        data.backlinks.pageMonthlyOrganicClicks.push(pageMonthlyOrganicClick);
  
        domainStrength = el.domainStrength;
        data.backlinks.domainStrength.push(domainStrength);
  
        rankedKeyword = el.rankedKeywords;
        data.backlinks.rankedKeywords.push(rankedKeyword);
  
        outboundLink = el.numOutboundLinks;
        data.backlinks.outboundLinks.push(outboundLink);
      });
  
    } catch (error) {
      console.error(error);
    }
  }

  //call and await all async functions
  await Scraper();
  await getDomainID();
  await getKeywords();
  await getTopPages();
  await getBacklinks();

  //return the object containing data
  // console.log(data);
  return data;
}