//API calls to Spyfu
const axios = require('axios');


//all data are stored in these objects
let data = {
  noOrganicSearchKeyword: 0,
  estMonthlySeoClick: 0,
  estMonthlySeoClickValue: 0,
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

const domain = 'sastodeal.com'; //okdam.com thulo.com
let domainID;

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

        console.log(data);
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
  const URL = `https://www.spyfu.com/NsaApi/Backlink/GetUrlSearch?filteredBacklinkDomainsCsv=&filteredKeywordsCsv=&filteredUrlDomainsCsv=&linkTypesCsv=&requiredUrlDomainsCsv=&query=${domain}&rowsPerPage=5&startingRow=1`;

  try {
    const res = await axios.get(URL);
    console.log(res.status, res.statusText);
    const result = res.data;

    let backlinkDomain, backlink, domainMonthlyOrganicClick, pageMonthlyOrganicClick, domainStrength, rankedKeyword, outboundLink;

    result.results.forEach(el => {
      backlinkDomain = el.backlinkDomain;
      data.backlinks.backlinkDomain.push(backlinkDomain);

      backlink = el.backlink;
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

// getDomainID();
// getKeywords();
// getTopPages();
// getBacklinks();
