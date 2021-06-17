const mongoose = require('mongoose');

module.exports = {
	init: (client) => {
		mongoose.connect(client.config.mongodb,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(()=>{
            console.log('Mongoose connection successfully');
        }).catch((err) =>{
            console.log(err);
        });
    }	
};