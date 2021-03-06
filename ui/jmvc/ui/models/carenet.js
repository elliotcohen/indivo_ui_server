/**
 * @tag models, home
 * Wraps backend carenet services.
 */
$.Model.extend('UI.Models.Carenet',
/* @Static */
{
  from_xml_node: function(record_id, xml_node) {
    return new UI.Models.Carenet({
      'record_id': record_id,
      'carenet_id': $(xml_node).attr('id'),
      'name': $(xml_node).attr('name')
    });
  }
},
/* @Prototype */
/* magic attrs:
   record_id
   carenet_id
   name
 */
{
  get_people: function(callback) {
    indivo_api_call("GET", '/carenets/' + this.carenet_id + '/accounts/', null, function(result) {
      var account_objects_list = $(result).find('CarenetAccount').map(function(i, account_xml_node) {
        return UI.Models.Account.from_xml_node(account_xml_node);
      })
      callback(account_objects_list);
    })
  },

  add_pha: function(pha, callback) {
    indivo_api_call("PUT", '/carenets/' + this.carenet_id + '/apps/' + pha.id, null, callback);
  },

  remove_pha: function(pha, callback) {
    indivo_api_call("DELETE", '/carenets/' + this.carenet_id + '/apps/' + pha.id, null, callback);
  },

  add_account: function(account_id, callback) {
    indivo_api_call("POST", '/carenets/' + this.carenet_id + '/accounts/', {'account_id' : account_id, 'write': 'true'}, callback);
  },

  remove_account: function(account_id, callback) {
    indivo_api_call("DELETE", '/carenets/' + this.carenet_id + '/accounts/' + encodeURIComponent(account_id), null, callback);
  }
})
