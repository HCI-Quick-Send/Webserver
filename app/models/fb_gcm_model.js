//Creating a Model for the User Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'FB_GCM',
		idAttribute: ['fb_id','gcm_id']
	});
};