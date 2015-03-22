//Google Cloud Messaging Function
module.exports = function(data,u_ids, GCMDB, knex) 
{
	var gcm = require('node-gcm');

	// create a message with default values
	var message = new gcm.Message();
	var apiKey = require('../../config/gcmconfig.js');
	var sender = new gcm.Sender(apiKey);
	console.log(data);
	message.addDataWithObject(data);
	
	console.log("Came here!!");
	r_ids = [];
	var response = [];
	
	console.log("Sending to Users: ");
	console.log(u_ids);
	
	var users = data.users;
	console.log(users);
	knex('FB_GCM')
	.whereIn("fb_id",users)
	.then(function(result) {
		for( u in result)
		{
			console.log(u);
			r_ids.push(result[u]["gcm_id"]);
			try
			{
				sender.send(message, r_ids, 4, function (err, ret) {

					if(err !== null) console.log(err);
					else console.log(ret);

				});
			}
			catch(gcmerr)
			{
				console.log(gcmerr);
			}
		}
	})
	.catch(function(error) {
			console.log(error);
			res.send({error:'GCM Error'});
	});

	

}