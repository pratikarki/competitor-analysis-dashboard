const mongoose = require('mongoose');

//run this function before other //it is called hooks in mocha
before(function(done){

    //connect to mongodb Dashboard
    mongoose.connect('mongodb://localhost/Dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.once('open', function(){ //once the connection is open, function runs
        console.log('Connection successful!');
        done(); //makes other code wait until connection is made
    })
    .on('error', function(error){
        console.log('Connection error!', error);
    })
})

//just for convinience, dropping user collection before every test
// beforeEach(function(done){
//     mongoose.connection.collections.users.drop(function(){
//         done();
//     })
// })



