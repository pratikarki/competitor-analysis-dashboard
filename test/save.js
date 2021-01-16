// const mocha = require('mocha');
const assert = require('assert');
const DomainModel = require('../mongoDB/models/domainModel');
const UserModel = require('../mongoDB/models/userModel');

//describe tests
describe('Saving data', function(){

    //create tests
    it('Saves User and Domain record', function(done){

        const newDomain = new DomainModel({
            Name: "sastodeal.com",
            Url: "https://www.sastodeal.com",
            OverallRank: "96,185",
            BounceRate: "28.00%",
            SearchTrafficPercent: "17%",
            AvgTimeOnSite: "5:07",
            AvgPageView: "3.7",
            FirstRecorded: "2012/02/01",
            NoOrganicSearchKeyword: 130,
            EstMonthlySeoClick: 4723.99,
            EstMonthlySeoClickValue: 18641.54,
            SimilarSites: { 
                            SiteName: ["daraz.com.np", "hamrobazaar.com", "thulo.com", "okdam.com"], 
                            OverlapScore: [55, 49, 47.7, 35.6] 
            },
            Countries: {
                            CountryCode: ["NP", "US", "IN"],
                            CountryName: ["Nepal", "United States", "India"],
                            VisitorPercent: ["57.10%", "22.90%", "13.60%"],
                            SiteCountryRank: ["#146", "#90,571", "#83,145"]
            },
            Clicks: {
                        Categories: ["Jan '20", "Feb '20", "Mar '20", "Apr '20", "May '20", "Jun '20", "Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
                        OrganicClicks: [4776, 6071, 5384, 4870, 8126, 5784, 4642, 4713, 4666, 5667, 4867, 4724],
                        PaidClicks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            TopPages: {
                        PageTitle: ["Online shopping in Nepal | Buy online in Nepal | Online store nepal ...", "For OnePlus Bullets Wireless Bluetooth Earphone BT32B Magnetic ...", "Bajeko Sekuwa | Frozen Food | SD Fast | Sastodeal"],
                        TopKeyword: ["online shopping in Nepal", "oneplus bullets wireless", "bajeko sekuwa"],
                        PageUrl: ["https://www.sastodeal.com/", "https://www.sastodeal.com/remax-concave-convex-wired-music-earphone-rm-510-sd-af-1-sd-ah-1-sd-ah-sd-ai-1-sd-ai-sd-aj-1-sd-aj-sd-ak-1-sd-ak-sd-al.html", "https://www.sastodeal.com/sd-fast/frozen-food/bajeko-sekuwa.html"],
                        KeywordCount: [397, 2, 1],
                        EstMonthlySeoClicks: [205, 11, 6]
            },
            Backlinks: {
                        BacklinkDomain: ["reviews.com.np", "blincventures.com", "nepalishoppingstation.com"],
                        BacklinkUrl: [" https://reviews.com.np/article/best-online-sites-for-electronic-gadget-purchase-in-nepal", " https://blincventures.com/ecommerce-registration/", " https://nepalishoppingstation.com/product/women-kurtas/pakistani-karachi-floral-blue-soft-cotton-digital-style-printed-kurta-salwar-5e2960ab64c71"],
                        DomainMonthlyOrganicClicks: [340, 4, 46],
                        PageMonthlyOrganicClicks: [1, 1, 18],
                        DomainStrength: [23, 9, 8],
                        RankedKeywords: [2, 1, 1],
                        OutboundLinks: [6, 4, 1]
            },
            Keywords: [
                        {
                            KeywordType: "NewlyRanked",
                            Keyword: [
                                        {Term: "flypaper jeans", Url: "https://www.sastodeal.com/", SeoClicks: null, SearchVolume: 4500, Rank: 65, Clicks: 181},
                                        {Term: "oneplus bullets wireless", Url: "https://www.sastodeal.com/remax-concave-convex-wired-music-earphone-rm-510-sd-af-1-sd-ah-1-sd-ah-sd-ai-1-sd-ai-sd-aj-1-sd-aj-sd-ak-1-sd-ak-sd-al.html", SeoClicks: 8, SearchVolume: 3300, Rank: 78, Clicks: 150},
                                        {Term: "sajha", Url: "https://www.sastodeal.com/", SeoClicks: 7, SearchVolume: 3100, Rank: 80, Clicks: 181}
                            ],
                            total: 3
                        },
                        {
                            KeywordType: "GainedRanks",
                            Keyword: [
                                        {Term: "kama sutra rubber bands", Url: "https://www.sastodeal.com/kamasutra-dotted-condoms-72-pieces-pack-of-6-ksdott12x6.html", SeoClicks: 0, SearchVolume: null, Rank: 49, Clicks: null},
                                        {Term: "acupressure socks", Url: "https://www.sastodeal.com/happy-feet-pack-of-6-100-cotton-antibacterial-acupressure-ankle-for-men-1027-rn-hfms-13.html", SeoClicks: 1, SearchVolume: 150, Rank: 50, Clicks: 5},
                                        {Term: "kurtha", Url: "https://www.sastodeal.com/womens-fashion/clothing/kurtha-and-kurta-sets.html", SeoClicks: 5, SearchVolume: 950, Rank: 38, Clicks: 13}
                            ],
                            total: 3
                        },
                        {
                            KeywordType: "LostRanks",
                            Keyword: [
                                        {Term: "bsn suppliments", Url: "https://www.sastodeal.com/home-living/fitness-health-care/nutrition-suppliments.html", SeoClicks: 0, SearchVolume: 40, Rank: 70, Clicks: 0},
                                        {Term: "sipper bottles for gym", Url: "https://www.sastodeal.com/", SeoClicks: 0, SearchVolume: null, Rank: 95, Clicks: null},
                                        {Term: "religious laptop skins", Url: "https://www.sastodeal.com/", SeoClicks: 0, SearchVolume: null, Rank: 74, Clicks: null}
                            ],
                            total: 3
                        }
            ]
        })

        const newUser = new UserModel({
            FullName: 'Pratik Karki',
            UserName: 'PK',
            EmailAddress: 'pratik.karki@gmail.com',
            Password: 'pw123',
            Country: 'Nepal',
            RegisteredDate: '12/11/2020',
            Domain_id: (newDomain._id)
        })
        
        newUser.save().then(function(){ //save() is asynchronous so we wait for it to complete
            newDomain.save().then(function(){
                assert(newUser.isNew === false || newDomain.isNew === false) //once object is saved in db, isNew becomes false so //assert confirms if data is saved or not
                done();
            })
        })
    })
})

