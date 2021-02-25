//API calls to Spyfu
const axios = require('axios');

const website = 'sastodeal.com'; //okdam.com thulo.com
let domainID;

//all data are stored in these objects
let overviewData = {
  searchKeywordsCount: 0,
  estMonthlySeoClick: 0,
  estMonthlySeoClicksValue: 0
}
let organicVsPaidData = {
  allCategories: [],
  allOrganicClicks: [],
  allPaidClicks: []
}
let keywordsData = {
  allTypes: [],
  allKeywords: [],
  allUrls: [],
  allSeoClicks: [],
  allSearchVolumes: [],
  allRanks: [],
  allMonthlyClicks: []
}
let topPagesData = {
  allTitles: [],
  allTopKeywords: [],
  allUrls: [],
  allKeywordCounts: [],
  allEstMonthlySeoClicks: []
}
let backlinksData = {
  allBacklinkDomains: [],
  allBacklinks: [],
  allDomainMonthlyOrganicClicks: [],
  allPageMonthlyOrganicClicks: [],
  allDomainStrengths: [],
  allRankedKeywords: [],
  allOutboundLinks: []
}

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

        let searchKeywordsCount, estMonthlySeoClick, estMonthlySeoClicksValue;

        searchKeywordsCount = result.CurrentTotalCount;
        overviewData.searchKeywordsCount = searchKeywordsCount;

        estMonthlySeoClick = result.CurrentMonthlyClicks;
        overviewData.estMonthlySeoClick = estMonthlySeoClick;

        estMonthlySeoClicksValue = result.CurrentMonthlyValue;
        overviewData.estMonthlySeoClicksValue = estMonthlySeoClicksValue;

        console.log(overviewData);
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
    
        let category, organicClick, paidClick;
    
        for(let i=0; i < result.Categories.length; i++) {
          category = result.Categories[i];
          organicVsPaidData.allCategories.push(category);

          organicClick = result.Organic_Clicks[i];
          organicVsPaidData.allOrganicClicks.push(organicClick);

          paidClick = result.Paid_Clicks[i];
          organicVsPaidData.allPaidClicks.push(paidClick);
        }

        console.log(organicVsPaidData);
      } catch (error) {
        console.error(error);
      }
    }

    // getOverview();
    getOrganicVsPaidData();

  } catch (error) {
    console.error(error);
  }
}

async function getKeywordsData() {
  const URL = `https://www.spyfu.com/NsaApi/Serp/GetAllOrganicKeywordLists?query=${website}`;
  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;
    console.log(res.data);
    let keyword, url, seoClick, searchVolume, rank, monthlyClick;
    let temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];

    result.forEach(el => {
      if (el.searchType == 'MostValuable') {
        keywordsData.allTypes.push('Top Keywords');

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

        keywordsData.allKeywords.push(temp_keywords);
        keywordsData.allUrls.push(temp_urls);
        keywordsData.allSeoClicks.push(temp_seoClicks);
        keywordsData.allSearchVolumes.push(temp_searchVolumes);
        keywordsData.allRanks.push(temp_ranks);
        keywordsData.allMonthlyClicks.push(temp_monthlyClicks);

        temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
      }

      if (el.searchType == 'NewlyRanked') {
        keywordsData.allTypes.push('New Keywords');

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

        keywordsData.allKeywords.push(temp_keywords);
        keywordsData.allUrls.push(temp_urls);
        keywordsData.allSeoClicks.push(temp_seoClicks);
        keywordsData.allSearchVolumes.push(temp_searchVolumes);
        keywordsData.allRanks.push(temp_ranks);
        keywordsData.allMonthlyClicks.push(temp_monthlyClicks);

        temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
      }

      if (el.searchType == 'GainedClicks') {
        keywordsData.allTypes.push('Clicks Gaining Keywords');

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

        keywordsData.allKeywords.push(temp_keywords);
        keywordsData.allUrls.push(temp_urls);
        keywordsData.allSeoClicks.push(temp_seoClicks);
        keywordsData.allSearchVolumes.push(temp_searchVolumes);
        keywordsData.allRanks.push(temp_ranks);
        keywordsData.allMonthlyClicks.push(temp_monthlyClicks);

        temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
      }

      if (el.searchType == 'LostClicks') {
        keywordsData.allTypes.push('Clicks Losing Keywords');

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

        keywordsData.allKeywords.push(temp_keywords);
        keywordsData.allUrls.push(temp_urls);
        keywordsData.allSeoClicks.push(temp_seoClicks);
        keywordsData.allSearchVolumes.push(temp_searchVolumes);
        keywordsData.allRanks.push(temp_ranks);
        keywordsData.allMonthlyClicks.push(temp_monthlyClicks);

        temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
      }

      if (el.searchType == 'PageOne') {
        keywordsData.allTypes.push('First Page Keywords');

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

        keywordsData.allKeywords.push(temp_keywords);
        keywordsData.allUrls.push(temp_urls);
        keywordsData.allSeoClicks.push(temp_seoClicks);
        keywordsData.allSearchVolumes.push(temp_searchVolumes);
        keywordsData.allRanks.push(temp_ranks);
        keywordsData.allMonthlyClicks.push(temp_monthlyClicks);
        
        temp_keywords=[], temp_urls=[], temp_seoClicks=[], temp_searchVolumes=[], temp_ranks=[], temp_monthlyClicks=[];
      }
    })
    console.log(keywordsData);
  } 
  catch (error) {
    console.error(error);
  }
}

async function getTopPagesData() {
  const URL = `https://www.spyfu.com/NsaApi/Serp/GetTopPages?domain=${website}&pageSize=5&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=true`;

  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let title, topKeyword, url, keywordCount, estMonthlySeoClick;

    result.topPages.forEach(el => {
      title = el.title;
      topPagesData.allTitles.push(title);

      topKeyword = el.topKeyword;
      topPagesData.allTopKeywords.push(topKeyword);

      url = el.url;
      topPagesData.allUrls.push(url);

      keywordCount = el.keywordCount;
      topPagesData.allKeywordCounts.push(keywordCount);

      estMonthlySeoClick = el.estMonthlySeoClicks;
      topPagesData.allEstMonthlySeoClicks.push(estMonthlySeoClick);
    });

    console.log(topPagesData);
  } catch (error) {
    console.error(error);
  }
}

async function getBacklinksData() {
  const URL = `https://www.spyfu.com/NsaApi/Backlink/GetUrlSearch?filteredBacklinkDomainsCsv=&filteredKeywordsCsv=&filteredUrlDomainsCsv=&linkTypesCsv=&requiredUrlDomainsCsv=&query=${website}&rowsPerPage=5&startingRow=1`;

  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let backlinkDomain, backlink, domainMonthlyOrganicClick, pageMonthlyOrganicClick, domainStrength, rankedKeyword, outboundLink;

    result.results.forEach(el => {
      backlinkDomain = el.backlinkDomain;
      backlinksData.allBacklinkDomains.push(backlinkDomain);

      backlink = el.backlink;
      backlinksData.allBacklinks.push(backlink);

      domainMonthlyOrganicClick = el.domainMonthlyOrganicClicks;
      backlinksData.allDomainMonthlyOrganicClicks.push(domainMonthlyOrganicClick);

      pageMonthlyOrganicClick = el.pageMonthlyOrganicClicks;
      backlinksData.allPageMonthlyOrganicClicks.push(pageMonthlyOrganicClick);

      domainStrength = el.domainStrength;
      backlinksData.allDomainStrengths.push(domainStrength);

      rankedKeyword = el.rankedKeywords;
      backlinksData.allRankedKeywords.push(rankedKeyword);

      outboundLink = el.numOutboundLinks;
      backlinksData.allOutboundLinks.push(outboundLink);
    });

    console.log(backlinksData);
  } catch (error) {
    console.error(error);
  }
}

getDomainID();
// getKeywordsData();
// getTopPagesData();
// getBacklinksData();
