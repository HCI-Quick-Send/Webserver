//API calls for /api/users to add and get all users
module.exports = function(router, Users)
{
	router.route('/users')
	.post(function(req,res) {

		var data = ({
			"fb_id":req.body.fb_id,
			"gcm_id":req.body.gcm_id
		});
		new Users().save(data,{method:"insert"}).then(function(result) {
			var user_created = result.toJSON();
			res.send({success:true});
		}).catch(function(error) {
			  console.log(error);
			  res.send('{error:"Could not Insert."}');
		});
	});
};