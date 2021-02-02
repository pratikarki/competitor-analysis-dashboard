// const mocha = require('mocha');
const assert = require('assert');
const DomainModel = require('../mongoDB/models/domainModel');
const UserModel = require('../mongoDB/models/userModel');

//describe tests
describe('Saving data', function(){

    //create tests
    it('Saves User and Domain record', function(done){

        const newDomain = new DomainModel(
            {
                "name": "sastodeal.com",
                "url": "https://www.sastodeal.com",
                "overallRank": "96,185",
                "bounceRate": "28.00%",
                "searchTrafficPercent": "17%",
                "avgTimeOnSite": "5:07",
                "avgPageView": "3.7",
                "firstRecorded": "2012/02/01",
                "noOrganicSearchKeyword": 130,
                "estMonthlySeoClick": 4723.99,
                "estMonthlySeoClickValue": 18641.54,
                "similarSites": { 
                    "siteName": ["daraz.com.np", "hamrobazaar.com", "thulo.com", "okdam.com"], 
                    "overlapScore": [55, 49, 47.7, 35.6] 
                },
                "countries": {
                    "countryCode": ["NP", "US", "IN"],
                    "countryName": ["Nepal", "United States", "India"],
                    "visitorPercent": ["57.10%", "22.90%", "13.60%"],
                    "siteCountryRank": ["#146", "#90,571", "#83,145"]
                },
                "clicks": {
                    "categories": ["Jan '20", "Feb '20", "Mar '20", "Apr '20", "May '20", "Jun '20", "Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
                    "organicClicks": [4776, 6071, 5384, 4870, 8126, 5784, 4642, 4713, 4666, 5667, 4867, 4724],
                    "paidClicks": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                "topPages": {
                    "pageTitle": ["Online shopping in Nepal | Buy online in Nepal | Online store nepal ...", "For OnePlus Bullets Wireless Bluetooth Earphone BT32B Magnetic ...", "Bajeko Sekuwa | Frozen Food | SD Fast | Sastodeal"],
                    "topKeyword": ["online shopping in Nepal", "oneplus bullets wireless", "bajeko sekuwa"],
                    "pageUrl": ["https://www.sastodeal.com/", "https://www.sastodeal.com/remax-concave-convex-wired-music-earphone-rm-510-sd-af-1-sd-ah-1-sd-ah-sd-ai-1-sd-ai-sd-aj-1-sd-aj-sd-ak-1-sd-ak-sd-al.html", "https://www.sastodeal.com/sd-fast/frozen-food/bajeko-sekuwa.html"],
                    "keywordCount": [397, 2, 1],
                    "estMonthlySeoClicks": [205, 11, 6]
                },
                "backlinks": {
                    "backlinkDomain": ["reviews.com.np", "blincventures.com", "nepalishoppingstation.com"],
                    "backlinkUrl": [" https://reviews.com.np/article/best-online-sites-for-electronic-gadget-purchase-in-nepal", " https://blincventures.com/ecommerce-registration/", " https://nepalishoppingstation.com/product/women-kurtas/pakistani-karachi-floral-blue-soft-cotton-digital-style-printed-kurta-salwar-5e2960ab64c71"],
                    "domainMonthlyOrganicClicks": [340, 4, 46],
                    "pageMonthlyOrganicClicks": [1, 1, 18],
                    "domainStrength": [23, 9, 8],
                    "rankedKeywords": [2, 1, 1],
                    "outboundLinks": [6, 4, 1]
                },
                "keywords": [
                    {
                        "keywordType": "NewlyRanked",
                        "keyword": [
                                    {"term": "flypaper jeans", "url": "https://www.sastodeal.com/", "seoClicks": null, "searchVolume": 4500, "rank": 65, "clicks": 181},
                                    {"term": "oneplus bullets wireless", "url": "https://www.sastodeal.com/remax-concave-convex-wired-music-earphone-rm-510-sd-af-1-sd-ah-1-sd-ah-sd-ai-1-sd-ai-sd-aj-1-sd-aj-sd-ak-1-sd-ak-sd-al.html", "seoClicks": 8, "searchVolume": 3300, "rank": 78, "clicks": 150},
                                    {"term": "sajha", "url": "https://www.sastodeal.com/", "seoClicks": 7, "searchVolume": 3100, "rank": 80, "clicks": 181}
                        ],
                        "total": 3
                    },
                    {
                        "keywordType": "GainedRanks",
                        "keyword": [
                                    {"term": "kama sutra rubber bands", "url": "https://www.sastodeal.com/kamasutra-dotted-condoms-72-pieces-pack-of-6-ksdott12x6.html", "seoClicks": 0, "searchVolume": null, "rank": 49, "clicks": null},
                                    {"term": "acupressure socks", "url": "https://www.sastodeal.com/happy-feet-pack-of-6-100-cotton-antibacterial-acupressure-ankle-for-men-1027-rn-hfms-13.html", "seoClicks": 1, "searchVolume": 150, "rank": 50, "clicks": 5},
                                    {"term": "kurtha", "url": "https://www.sastodeal.com/womens-fashion/clothing/kurtha-and-kurta-sets.html", "seoClicks": 5, "searchVolume": 950, "rank": 38, "clicks": 13}
                        ],
                        "total": 3
                    },
                    {
                        "keywordType": "LostRanks",
                        "keyword": [
                                    {"term": "bsn suppliments", "url": "https://www.sastodeal.com/home-living/fitness-health-care/nutrition-suppliments.html", "seoClicks": 0, "searchVolume": 40, "rank": 70, "clicks": 0},
                                    {"term": "sipper bottles for gym", "url": "https://www.sastodeal.com/", "seoClicks": 0, "searchVolume": null, "rank": 95, "clicks": null},
                                    {"term": "religious laptop skins", "url": "https://www.sastodeal.com/", "seoClicks": 0, "searchVolume": null, "rank": 74, "clicks": null}
                        ],
                        "total": 3
                    }
                ]
            }
        )

        const newUser = new UserModel({
            fullName: 'Pratik Karki',
            userName: 'PK',
            email: 'pratik.karki@gmail.com',
            password: 'pw123',
            country: 'Nepal',
            registeredDate: '12/11/2020',
            domain_id: (newDomain._id)
        })
        
        newUser.save().then(function(){ //save() is asynchronous so we wait for it to complete
            newDomain.save().then(function(){
                assert(newUser.isNew === false || newDomain.isNew === false) //once object is saved in db, isNew becomes false so //assert confirms if data is saved or not
                done();
            })
        })
    })
})

