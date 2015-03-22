//API calls for /api/gcm to save registration ids
module.exports = function(router, GCMDB, knex)
{
	var gcm = require('../gcm/gcm');
	router.route('/gcm/send')
	.post(function(req,res) {
		var arr = req.body.users.split(',');
		var data = {users:arr, url: req.body.url};
		gcm(data,[],GCMDB, knex);
		res.send({success:true});
	});
}