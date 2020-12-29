const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for Keyword
const keywordSchema = new Schema({
    Term: { type: String, required: true },
    Url: { type: String, required: true },
    SeoClicks: { type: Number },
    SearchVolume: { type: Number },
    Rank: { type: Number },
    Clicks: { type: Number }
})

//schema for Keywords
const keywordsSchema = new Schema({
    KeywordType: { type: String, required: true },
    Keyword: [keywordSchema],
    total: { type: Number }
})

//schema for Backlinks
const backlinkSchema = new Schema({
    BacklinkDomain: { type: Array, required: true },
    BacklinkUrl: { type: Array, required: true },
    DomainMonthlyOrganicClicks: { type: Array },
    PageMonthlyOrganicClicks: { type: Array },
    DomainStrength: { type: Array },
    RankedKeywords: { type: Array },
    OutboundLinks: { type: Array }
});

//schema for TopPages
const topPageSchema = new Schema({
    PageTitle: { type: Array, required: true },
    TopKeyword: { type: Array },
    PageUrl: { type: Array, required: true },
    KeywordCount: { type: Array },
    EstMonthlySeoClicks: { type: Array }
});

//schema for Clicks
const clickSchema = new Schema({
    Categories: { type: Array, required: true },
    OrganicClicks: { type: Array, required: true },
    PaidClicks: { type: Array, required: true },
});

//schema for Country
const countrySchema = new Schema({
    CountryCode: { type: Array, required: true },
    CountryName: { type: Array, required: true },
    VisitorPercent: { type: Array, required: true },
    SiteCountryRank: { type: Array }
});

//schema for SimilarSites
const similarSiteSchema = new Schema({
    SiteName: { type: Array, required: true },
    OverlapScore: { type: Array }
});

//defining schema for domain collection
const domainSchema = new Schema({
    Name: { type: String, required: true },
    Url: { type: String, required: true },
    Rank: { type: String },
    BounceRate: { type: String, required: true },
    SearchTrafficPercent: { type: String },
    AvgTimeOnSite: { type: String },
    AvgPageView: { type: String },
    FirstRecorded: { type: Date },
    NoOrganicSearchKeyword: { type: Number },
    EstMonthlySeoClick: { type: Number },
    EstMonthlySeoClickValue: { type: Number },
    SimilarSites: similarSiteSchema,
    Countries: countrySchema,
    Clicks: clickSchema,
    TopPages: topPageSchema,
    Backlinks: backlinkSchema,
    Keywords: [keywordsSchema]
    // User_id: { type: Object }
});


//defining model for domain collection
const DomainModel = mongoose.model('domain', domainSchema);

module.exports = DomainModel;