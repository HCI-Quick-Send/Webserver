//Creating a Model for the gcm Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'GCM',
		idAttribute: 'gcm_id'
	});
};