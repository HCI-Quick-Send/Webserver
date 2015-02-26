//Google Cloud Messaging Function
module.exports = function(data,u_ids, GCMDB, knex) 
{
	var gcm = require('node-gcm');

	// create a message with default values
	var message = new gcm.Message();
	var apiKey = require('../../config/gcmconfig.js');
	var sender = new gcm.Sender(apiKey);
	message.addDataWithObject(data);
	
	console.log("Came here!!");
	r_ids = [];
	var response = [];
	
	console.log("Sending to Users: ");
	console.log(u_ids);
	knex('gcm')
	.whereIn("User_id",u_ids)
	.then(function(result) {
		for( u in result)
		{
			r_ids.push(result[u]["reg_id"]);
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
		return true;
	})
	.catch(function(error) {
			console.log(error);
			res.json(error_json("101"));
	});
	
	

}