/*!
 * JavaScript URI Query
 * Simple Instance for access URI.
 *
 * Author : Shankar Thiyagaraajan
 * Email  : shankarthiyagaraajan@gmail.com
 * Github : https://github.com/shankarThiyagaraajan
 *
 * Source
 * https://github.com/global-source/javascript_uri_query
 *
 * Site
 * https://global-source.github.io/javascript_uri_query/
 *
 * Copyright 2017
 *
 * Released under the MIT license
 * https://github.com/global-source/javascript_uri_query/blob/master/LICENSE
 *
 */

var URI = {

    /**
     * To Get Parameter by its Name [ex. ?page=123, function('page') => 123]
     * @name : Name of an item to return,
     * @url : User defined URL to get item back,
     * @default_result : If item not found, then return the default value.
     */
    get: function (name, url, default_result) {

        // Sanity check.
        if (typeof url === 'undefined' && url) url = false;
        if (typeof name === 'undefined' && name) name = false;
        if (typeof default_result === 'undefined') default_result = false;

        // Default response.
        var response;

        // If user defined URI not given, then take active URI.
        if (!url) {
            // Getting active URI.
            url = window.location.href;
        }

        // If filter name is not valid then return the default value.
        if (!name) return default_result;

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return default_result;
        if (!results[2]) return '';
        response = decodeURIComponent(results[2].replace(/\+/g, " "));
        // If final response is not valid, then return the "default_result".
        if (null === response) return default_result;
        return response;
    },

    /**
     * To get all URI params.
     * @byString : To retrun key & value pair as string.
     */
    getAll: function (byString) {
        // If byString param is not defined, then take false as default.
        if (typeof byString === 'undefined') byString = false;
        // Initiating variables.
        var queryDict;
        // Empty object initated.
        queryDict = {};
        // If byString, then retrun string as array.
        if (byString) {
            // Return param list as String.
            return location.search.substr(1).split("&");
        } else {
            // Else, then loop to generate the object list of URI params.
            location.search.substr(1).split("&").forEach(function (item) {
                // If empty, then return.
                if ('' !== item) {
                    item = item.split("=");
                    // Make Object of Params.
                    queryDict[item[0]] = item[1];
                }
            });
        }
        // Return all list.
        return queryDict;
    },
    /**
     * To clear all URI params.
     */
    clear: function () {
        // To get all URI data's.
        var list = this.getAll();
        // Loop to remove all URI data's.
        for (var i in list) {
            this.remove(i, list[i], false);
        }
        // Update URI status.
        this.updateStructure();
    },
    /**
     * To Trigger general update action for internal purpose.
     */
    updateStructure: function () {
        // Get active URL.
        var href = window.location.href;
        // Check and remove "?" from URL.
        if (href.indexOf('?') !== -1) {
            // Remove "?" from URL.
            href = href.slice(0, href.indexOf('?'));
            // Update to URL.
            window.history.pushState('', 'Title', href)
        }
    },
    /**
     * To Remove Params by object or single.
     * @list : List of items to remove.
     */
    remove: function (list, value, multiple) {
      //TODO: check and remove "value" usage.
        // To Get list of Params.
        var core_list = this.getAll();
        // Sanity check.
        if('undefined' === core_list) core_list = 0;
        // If no objects, then clear all data.
        if (0 === this.objCount(core_list)) return this.updateStructure();

        var isObject = true;

        var item;
        var item_out;
        var temp_obj = {};
        // To Check the type is Object or Not.
        if (typeof list != 'object') isObject = false;
        // If list is not object or string, then return false.
        if (false === isObject && 'string' !== typeof list) return false;
        // To Count the Params to check existence.
        var count = this.objCount(core_list);
        // If No params exist, then return false.
        if (count <= 0) return false;
        // Make Updated_list as Core List.
        var updated_list = core_list;
        // Remove stacked item from the index.
        if (true === multiple && false === isObject) {
            item = this.get(list);
            item += ',';
            if (-1 !== item.indexOf(',')) {
                item = item.split(',');
                // if ('object' === typeof item) {
                delete item[item.indexOf(value)];
                // }
            }

            if ('string' === typeof item) item = [item];

            // Removing the empty values.
            item = item.filter(function (i) {
                return ('' !== i);
            });

            if (0 === item.length) this.remove(list);

            // Join to make string.
            item_out = item.join(',');
            temp_obj[list] = item_out;
            // Update the resulted value value to URI.
            this.add(list, item_out);
        } else {
            if (true === isObject) {
                // Generate Update List by eliminating the element list.
                for (var i = 0; i < list.length; i++) {
                    // Remove the list of elements, one by one.
                    delete updated_list[list[i]];
                }
            } else {
                // Remove single index.
                delete updated_list[list];
            }

            var newQuery = '?';
            // To Form New and Updated Query.
            for (var i in updated_list) {
                newQuery += i + '=' + updated_list[i] + '&';
            }
            // Update the query output.
            newQuery = newQuery.slice(0, -1);
            // If output is empty, then set it into "?"
            if ('' === newQuery) newQuery = '?';
            // To Update the URI.
            window.history.pushState('', 'Title', newQuery);
        }
    },
    /**
     * To remove all params in URI.
     * @reset : To Reset with window reload or not.
     */
    removeAll: function (reset) {
      //TODO: Remove those are created by this only.
        var href = window.location.href;
        if (-1 !== href.indexOf('?')) {
            href = href.split('?');
            window.history.pushState('', 'Title', href[0]);
        }
        if (true === reset) window.location.reload();
    },
    /**
    * To Add one param to URL.
    * @key : name of the item,
    * @value : value of the item,
    * @append : Is append value to existing or not.
    */
    add: function(key, value, append){
      // Create empty object.
      var list = {};
      // Adding new entry.
      list[key] = value;
      // Trigger function to append item.
      this.bulkAdd([list], append);
    },
    /**
     * To Add multiple params to the URI.
     * @list : List of items to add to URI.
     * @append : Is action to append values to existing params or not.
     */
    bulkAdd: function (list, append) {
        var temp_object;
        // To Check the type is Object or Not.
        if (typeof list != 'object') return false;
        // To Get list of Params.
        var core_list = this.getAll();
        // Make Updated_list as Core List.
        var updated_list = core_list;

        // Append multiple value for single index.
        if (true === append) {
          // Initiating variables.
            var val;
            var val_result;
            // Looping the params list.
            for (var i in list) {
              // Check each blocks are object or not.
                if (typeof list[i] === 'object') {
                  // Getting item by key & value.
                    for (var k in list[i]) {
                      // Get value of an item, if exists already.
                        val_result = URI.get(k);
                        // Check is this item is already exist, then
                        if (false !== val_result) {
                          // Appending value by separator,
                            temp_object = val_result.split(',');
                            // If already exists, then ignore.
                            if (-1 !== temp_object.indexOf(list[i][k])) continue;
                            val = val_result + ',';
                            // If not exist, then reset.
                            if (false === val_result || '' === val_result) {
                              // If no values are in existing item, then start with empty space.
                                val = '';
                            }
                            // Append initial value with item's value.
                            val = val + list[i][k];
                        } else {
                          // Default initial value.
                            val = list[i][k];
                        }
                        // Load back to params list.
                        updated_list[k] = val;
                    }
                }
            }
            // Only one value per index.
        } else {
            // Loop with New Params.
            for (var i in list) {
                // Adding Params to Existing list.
                for (var k in list[i]) {
                    // If empty, the remove
                    if ('' === list[i][k]) continue;
                    updated_list[k] = list[i][k];
                }
            }
        }
        var newQuery = '?';
        // To Form New and Updated Query.
        console.log(updated_list);
        for (var i in updated_list) {
            newQuery += i + '=' + updated_list[i] + '&';
        }

        // To Update the URI.
        window.history.pushState('', 'Title', newQuery.slice(0, -1));
    },
    /**
     * To record entry for entry management.
     */
    recordEntry: function(){

    }
    /**
     * General fix for URI.
     */
    fixURI: function () {
      // To get all item.
        var URI_items = this.getAll();
        // Remove all existing URI.
        this.removeAll();
        // Loop to add back the items.
        for (var i in URI_items) {
            if ('undefined' !== URI_items[i]) {
              // Add back the item to URI.
              this.add(i, URI_items[i]);
            }
        }
    },
    /**
     * Classic function for pagination purpose to go next page.
     */
    nextPage: function () {
        // To Get the actual value of "page"
        var page = this.get('page');
        if (!page) {
            page = 1;
        }
        page++;
        // Update the Param "page" value.
        this.replaceParam('page', page);
    },
    /**
     * Classic function for pagination purpose to go previous page.
     */
    prevPage: function () {
        // To Get the actual value of "page"
        var page = this.get('page');
        // If "page" is not defined, then init with "1".
        if (!page) {
            page = 1;
        }

        // Don't allow to remove if page index is "1".
        if (page != 1) {
            page--;
        }

        // Update the Param "page" value.
        this.replaceParam('page', page);
    },
    /**
     * Check whether the param is exist or not.
     */
    isParamExists: function (param) {
        // To extract the URI from URL.
        var paramString = location.search.substr(1);
        // Return, param is exist or not.
        return (paramString.indexOf(param + '=') !== -1);
    },
    /**
     * To Update | Append | Create param.
     */
    update: function (param, value) {
        // To extract the URI from URL.
        var queryString = location.search.substr(1);
        // To Find the Matched element.
        var total = queryString.match(/[a-z\d]+=[a-zA-Z\d]+/gi);
        // Form New Param with Value.
        var newValue = param + '=' + value;
        // Form Old Param with Value.
        var oldValue = param + '=' + this.get(param);
        // To Check have param or not.
        if (this.objCount(total) > 0) {
            // To Check, whether param is exist or not.
            if (this.isParamExists(param)) {
                // To Update the Value, If param already exist.
                queryString = '?' + queryString.replace(oldValue, newValue);
            } else {
                // To Create New Param, If not exist.
                queryString = '?' + queryString + '&' + newValue;
            }
        } else {
            // To Create First param, If no param exist.
            queryString = '?' + newValue;
        }
        // To update to the URI.
        window.history.pushState('', 'Title', queryString);
        return queryString;
    },
    /**
     * To Count number of object elements.
     */
    objCount: function (object) {
        // Initiating Length.
        var length = 0;
        // Looping the Objects.
        for (var key in object) {
            // Check with object existance.
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        // Total count of Objects.
        return length;
    }
};
