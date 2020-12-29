//API calls to Spyfu
const axios = require('axios');
const fs = require('fs');

const website = 'sastodeal.com'; //okdam.com thulo.com
let domainID;

const writeStream = fs.createWriteStream(`spyfuAPI_${website}.csv`);

async function getDomainID() {
  const URL = `https://www.spyfu.com/Endpoints/Search/JsonSearch?query=${website}&tryAsTermFirst=false&isSiteQuery=true`;
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

        let organicSearchKeywordsCount, estMonthlySeoClicks, estMonthlySeoClicksValue;
        //write header to csv
        writeStream.write(`\n \n domainID, organicSearchKeywordsCount, estMonthlySeoClicks, estMonthlySeoClicksValue`);

        organicSearchKeywordsCount = result.CurrentTotalCount;
        estMonthlySeoClicks = result.CurrentMonthlyClicks;
        estMonthlySeoClicksValue = result.CurrentMonthlyValue;

        //write each row to csv
        writeStream.write(`\n ${domainID}, ${organicSearchKeywordsCount}, ${estMonthlySeoClicks}, ${estMonthlySeoClicksValue}`);

      } catch(error) {
        console.log(error);
      }
    }

    async function getHistoryDate() {
      const URL = `https://www.spyfu.com/NsaApi/Domain/HistoryStartDates?domainId=${domainID}`;
      
      try {
        const res = await axios.get(URL);
        console.log(res.status, res.statusText);
        const result = res.data;

        let activeSince;
        //write header to csv
        writeStream.write(`\n \nactiveSince`);

        activeSince = result.OrganicFirstRecordDate;

        //write each row to csv
        writeStream.write(`\n ${activeSince}`);

      } catch(error) {
        console.log(error);
      }
    }

    async function getOrganicVsPaidData() {
      const URL = `https://www.spyfu.com/NsaApi/Domain/ChartOrganicVsPaidClicks?domainId=${domainID}&numberOfMonths=12`;
      
      try {
        const res = await axios.get(URL);
        console.log(res.status, res.statusText);
        const result = res.data;
    
        let categories, organicClicks, paidClicks;
        //write header to csv
        writeStream.write(`\n \n Organic vs Paid Clicks Graph\n categories, organicClicks, paidClicks`);
    
        for(let i=0; i < result.Categories.length; i++) {
          categories = result.Categories[i];
          organicClicks = result.Organic_Clicks[i];
          paidClicks = result.Paid_Clicks[i];
    
          //write each row to csv
          writeStream.write(`\n ${categories}, ${organicClicks}, ${paidClicks}`);
        }
    
      } catch (error) {
        console.error(error);
      }
    }

    getOverview();
    getHistoryDate();
    getOrganicVsPaidData();

  } catch (error) {
    console.error(error);
  }

};


async function getKeywordsData() {
  const URL = `https://www.spyfu.com/NsaApi/Serp/GetAllOrganicKeywordLists?query=${website}`;
  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let type, keyword, url, seoClicks, searchVolume, rank, clicks;
    //write header to csv
    writeStream.write(`\n \n keywordType, keyword, url, seoClicks, searchVolume, rank, clicks`);

    result.forEach(el => {
      type = el.searchType;

      el.keywords.forEach(ele => {
        keyword = ele.term;
        url = ele.topRankedUrl;
        seoClicks = ele.seoClicks;
        searchVolume = ele.searchVolume;
        rank = ele.rank;
        clicks = ele.clicks;

        //write each row to csv
        writeStream.write(`\n ${type}, ${keyword}, ${url}, ${seoClicks}, ${searchVolume}, ${rank}, ${clicks}`);
      })
    });
  } catch (error) {
    console.error(error);
  }
}


async function getTopPagesData() {
  const URL = `https://www.spyfu.com/NsaApi/Serp/GetTopPages?domain=${website}&pageSize=5&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=true`;

  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let topPages, topKeyword, url, keywordCount, estMonthlySeoClicks;
    //write header to csv
    writeStream.write(`\n \n topPages, topKeyword, url, keywordCount, estMonthlySeoClicks`);

    result.topPages.forEach(el => {
      topPages = el.title;
      topKeyword = el.topKeyword;
      url = el.url;
      keywordCount = el.keywordCount;
      estMonthlySeoClicks = el.estMonthlySeoClicks;

      //write each row to csv
      writeStream.write(`\n ${topPages}, ${topKeyword}, ${url}, ${keywordCount}, ${estMonthlySeoClicks}`);
    });

  } catch (error) {
    console.error(error);
  }
}


async function getBacklinkData() {
  const URL = `https://www.spyfu.com/NsaApi/Backlink/GetUrlSearch?filteredBacklinkDomainsCsv=&filteredKeywordsCsv=&filteredUrlDomainsCsv=&linkTypesCsv=&requiredUrlDomainsCsv=&query=${website}&rowsPerPage=5&startingRow=1`;

  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let backlinkDomain, backlink, domainMonthlyOrganicClicks, pageMonthlyOrganicClicks, domainStrength, rankedKeywords, outboundLinks;
    //write header to csv
    writeStream.write(`\n \n backlinkDomain, backlink, domainMonthlyOrganicClicks, pageMonthlyOrganicClicks, domainStrength, rankedKeywords, outboundLinks`);

    result.results.forEach(el => {
      backlinkDomain = el.backlinkDomain;
      backlink = el.backlink;
      domainMonthlyOrganicClicks = el.domainMonthlyOrganicClicks;
      pageMonthlyOrganicClicks = el.pageMonthlyOrganicClicks;
      domainStrength = el.domainStrength;
      rankedKeywords = el.rankedKeywords;
      outboundLinks = el.numOutboundLinks;

      //write each row to csv
      writeStream.write(`\n ${backlinkDomain}, ${backlink}, ${domainMonthlyOrganicClicks}, ${pageMonthlyOrganicClicks}, ${domainStrength}, ${rankedKeywords}, ${outboundLinks}`);
    });

  } catch (error) {
    console.error(error);
  }
}

getDomainID();
getKeywordsData();
getTopPagesData();
getBacklinkData();


// data: [
//     { searchType: 'JustFellOff', keywords: [], total: 0 },
//     { searchType: 'JustMadeIt', keywords: [Array], total: 3 },
//     { searchType: 'NewlyRanked', keywords: [Array], total: 488 },
//     { searchType: 'GainedRanks', keywords: [Array], total: 120 },
//     { searchType: 'LostRanks', keywords: [Array], total: 108 },
//     { searchType: 'MostValuable', keywords: [Array], total: 727 },
//     { searchType: 'AlmostThere', keywords: [Array], total: 3 },
//     { searchType: 'PageOne', keywords: [Array], total: 7 },
//     { searchType: 'PastPageOne', keywords: [Array], total: 720 },
//     { searchType: 'GainedClicks', keywords: [Array], total: 6 },
//     { searchType: 'LostClicks', keywords: [Array], total: 7 }
//   ]


// const options = {
//     url: `https://www.spyfu.com/NsaApi/Serp/GetAllOrganicKeywordLists?query=sastodeal.com`,
//     json: true
// }

// ax.get(options)
//     .then((data) => {
//         // let keywordArray = []
//         // for (let eachObj of data ) {
//         //     keywordArray.push({type: eachObj.searchType, name: eachObj.keywords[0].keyword});
//         // }
//         console.log('loading');
//         process.stdout.write(data);

//         // getChallengesCompletedAndPushToKeywordArray(keywordArray)
//     })
//     .catch((err) => {
//         console.log(err);
//     })