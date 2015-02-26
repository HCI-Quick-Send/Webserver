//API calls for /api/users to add and get all users
module.exports = function(router, Users, Cred, Session, error_json, success_json, check_session)
{
	var bcrypt = require('bcrypt');
	
	router.route('/users')
	.post(function(req,res) {

		var data = ({
			"FB_id":req.body.fb_id,
		});
		new Users().save(data,{method:"insert"}).then(function(result) {
			var user_created = result.toJSON();
			var uid = user_created["User_id"];
		}).catch(function(error) {
			  console.log(error);
			  res.send(error_json("110"));
		});
	});
};