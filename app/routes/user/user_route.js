//API calls for /api/users to add and get all users
module.exports = function(router, knex)
{
	router.route('/users')
	.post(function(req,res) {

		var data = ({
			"fb_id":req.body.fb_id,
			"gcm_id":req.body.gcm_id
		});
		knex
		.raw('INSERT INTO `HCIQuickSend`.`FB_GCM` (`fb_id`,`gcm_id`) values' +
		'(?,?) ON DUPLICATE KEY UPDATE gcm_id=?', [ data.fb_id,data.gcm_id,data.gcm_id])
		.then(function(result){
			res.send({success:true});
		})
		.catch(function(error) {
			console.log(error);
			res.send({error:'GCM Error'});
		});
	});
};