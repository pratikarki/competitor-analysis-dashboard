const mongoose = require('mongoose');

//schema for Keyword
// const keywordStringSchema = mongoose.Schema({ type: String })
// const keywordNumberSchema = mongoose.Schema({ type: Number })

//schema for Keywords
const keywordsSchema = mongoose.Schema({
    allTypes: [{
        type: String
    }],
    allKeywords: [[ String ]],
    allUrls: [[ String ]],
    allSeoClicks: [[ Number ]],
    allSearchVolumes: [[ Number ]],
    allRanks: [[ Number ]],
    allMonthlyClicks: [[ Number ]]
})

//schema for Backlinks
const backlinkSchema = mongoose.Schema({
    backlinkDomain: { type: Array, required: true },
    backlinkUrl: { type: Array, required: true },
    domainMonthlyOrganicClicks: { type: Array },
    pageMonthlyOrganicClicks: { type: Array },
    domainStrength: { type: Array },
    rankedKeywords: { type: Array },
    outboundLinks: { type: Array }
});

//schema for TopPages
const topPageSchema = mongoose.Schema({
    pageTitle: { type: Array, required: true },
    topKeyword: { type: Array },
    pageUrl: { type: Array, required: true },
    keywordCount: { type: Array },
    estMonthlySeoClicks: { type: Array }
});

//schema for Clicks
const clickSchema = mongoose.Schema({
    categories: { type: Array, required: true },
    organicClicks: { type: Array, required: true },
    paidClicks: { type: Array, required: true },
});

//schema for Country
const countrySchema = mongoose.Schema({
    countryCode: { type: Array, required: true },
    countryName: { type: Array, required: true },
    visitorPercent: { type: Array, required: true },
    siteCountryRank: { type: Array }
});

//schema for SimilarSites
const similarSiteSchema = mongoose.Schema({
    siteName: { type: Array, required: true },
    overlapScore: { type: Array },
    rank: { type: Array }
});

//defining schema for domain collection
const domainSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A domain must have a name'],
        unique: [true, 'Domain name cannot be duplicate']
    },
    url: {
        type: String,
        required: [true, 'A domain must have a url'],
        unique: [true, 'Url cannot be duplicate']
    },
    // user_id: [
    //     {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'User'
    //     }
    // ],
    overallRank: { type: String },
    bounceRate: { type: String, required: true },
    searchTrafficPercent: { type: String },
    avgTimeOnSite: { type: String },
    avgPageView: { type: String },
    noOrganicSearchKeyword: { type: Number },
    estMonthlySeoClick: { type: Number },
    estMonthlySeoClickValue: { type: Number },
    similarSites: similarSiteSchema,
    countries: countrySchema,
    clicks: clickSchema,
    topPages: topPageSchema,
    backlinks: backlinkSchema,
    keywords: keywordsSchema
    // User_id: { type: Object }
});


//defining model for domain collection
const DomainModel = mongoose.model('Domain', domainSchema);

module.exports = DomainModel;
