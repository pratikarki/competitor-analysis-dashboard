import axios from 'axios';
import { showAlert } from './alerts';

export const register = async (regUser, user_id) => {

  //these objects are needed to update user
  let domain_id = '';
  let competitorSites = [];

  //this object is needed to save domain
  let domainData = {};


  //Check if regUser.domain already exists in db, if so get that domain, save to a variable and update domain_id field''
  //else
  //Search for the domain, save to a variable
    //save domain to database and update domain_id''

  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/domains/find',
      data: {
        name: regUser.domainName
      }
    })
  
    if (res.data.status === 'success') {
      //console.log(res.data.data._id, res.data.data);
      domain_id = res.data.data._id;
      domainData = res.data.data;
      //console.log(`this iz domainID${domain_id}, this iz domainData ${domainData}`);
    }
  }
  catch(err) {
    // console.log(err);
    // get data from scraping and 3rd party api
    try {
      const result = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/domains/search',
        data: {
          domain: regUser.domainName
        }
      })
      domainData = result.data.data;
    }
    catch(err) {
      showAlert('error', 'Sorry, something went wrong while fetching your website data. Please try again..');
      return false;
    }

    //saving domainData to database and updating domain_id''
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/domains/save',
        data: domainData
      })
  
      if (res.data.status === 'success') {
        domain_id = res.data.data.data._id;
        // console.log(domain_id, domainData);
      }
    }
    catch {
      showAlert('error', 'Sorry, something went wrong while saving your data. Please try again..');
      return false;
    }
  }


  //loop the variable for each similarSites
    //check if each site exists in db, if so push id to competitorSites[] and skip that loop;
    //else
    //search/save each site to db and push id to competitorSites[]

  const justAnotherAsyncFunction = async (domainData) => {
    for (let site of domainData.similarSites.siteName) {
      //check if site already exists in db
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/api/v1/domains/find',
          data: {
            name: site
          }
        })
      
        if (res.data.status === 'success') {
          competitorSites.push(res.data.data._id);
          // console.log(competitorSites);
        }
      }
      catch {
        // get each site data from scraping and 3rd party api
        const result = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/api/v1/domains/search',
          data: {
            domain: site
          }
        })
        domainData = result.data.data;
  
        //save each domainData to database and push id to competitorSites[]
        try {
          const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/domains/save',
            data: domainData
          })
      
          if (res.data.status === 'success') {
            competitorSites.push(res.data.data.data._id);
            // console.log(competitorSites);
          }
        }
        catch {
          showAlert('error', 'Some data of your competition could not be processed.');
        }
      }
    }
  }

  await justAnotherAsyncFunction(domainData);

  // Update the user with domain_id and competitorSites
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/users/update/${user_id}`,
      data: {
        domain_id: domain_id,
        competitorSites: competitorSites
      }
    })

    if (res.data.status === 'success') {
      // Finally log in
      window.location.assign('/overview');
    }
  }
  catch(err) {
    // console.log(err);
    showAlert('error', 'Sorry, something went very wrong while saving your data. Please try again later.');
  }

}


