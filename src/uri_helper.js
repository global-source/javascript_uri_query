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
    getParams: function (byString) {
        // Sanity check.
        if (typeof byString === 'undefined') byString = false;

        if (byString) {
            // Return param list as String.
            return location.search.substr(1).split("&");
        } else {
            var queryDict = {};
            // To loop the params.
            location.search.substr(1).split("&").forEach(function (item) {
                // Make Object of Params.
                queryDict[item.split("=")[0]] = item.split("=")[1]
            });
        }
        return queryDict;
    },
       // To Remove Params by object or single.
    remove: function (list, value, multiple) {

        var isObject = true;

        var item;
        var item_out;
        var temp_obj = {};

        // To Check the type is Object or Not.
        if (typeof list != 'object') isObject = false;

        // If list is not object or string, then return false.
        if (false === isObject && 'string' !== typeof list) return false;

        // To Get list of Params.
        var core_list = this.getParams();
        // To Count the Params to check existence.
        var count = this.objCount(core_list);
        // If No params exist, then return false.
        if (count <= 0) return false;

        // Make Updated_list as Core List.
        var updated_list = core_list;

        // Remove stacked item from the index.
        if (true === multiple && false === isObject) {
            item = this.getParamByName(list);
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
            this.addParam([temp_obj]);
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
     // To remove all params in URI.
    removeAll: function () {
        window.history.pushState('', 'Title', '?');
    },
        // To Add Param To URI.
    addParam: function (list, append) {
        var temp_object;
        // To Check the type is Object or Not.
        if (typeof list != 'object') return false;
        // To Get list of Params.
        var core_list = this.getParams();
        // To Count the Params to check existence.
        var count = this.objCount(core_list);
        // If No params exist, then return false.
        if (count <= 0) return false;
        // Make Updated_list as Core List.
        var updated_list = core_list;

        // Append multiple value for single index.
        if (true === append) {
            var val;
            var val_result;
            for (var i in list) {
                if (typeof list[i] === 'object') {
                    for (var k in list[i]) {
                        val_result = URI.getParamByName(k);
                        if (false !== val_result) {
                            temp_object = val_result.split(',');
                            // If already exists, then ignore.
                            if (-1 !== temp_object.indexOf(list[i][k])) continue;
                            val = val_result + ',';
                            // If not exist, then reset.
                            if (false === val_result || '' === val_result) {
                                val = '';
                            }
                            // Append to the list.
                            val = val + list[i][k];
                        } else {
                            val = list[i][k];
                        }
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
    // To Go to Next Page.
    nextPage: function () {
        // To Get the actual value of "page"
        var page = this.getParamByName('page');
        if (!page) {
            page = 1;
        }
        page++;
        // Update the Param "page" value.
        this.replaceParam('page', page);
    },
    // To Go back to Previous Page.
    prevPage: function () {
        // To Get the actual value of "page"
        var page = this.getParamByName('page');
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
    // Sanity check of param.
    isParamExists: function (param) {
        // To extract the URI from URL.
        var paramString = location.search.substr(1);
        // Return, param is exist or not.
        return (paramString.indexOf(param + '=') !== -1);
    },
    // To Replace | Append | Create param.
    replaceParam: function (param, value) {

        // To extract the URI from URL.
        var queryString = location.search.substr(1);

        // To Find the Matched element.
        var total = queryString.match(/[a-z\d]+=[a-zA-Z\d]+/gi);

        // Form New Param with Value.
        var newValue = param + '=' + value;
        // Form Old Param with Value.
        var oldValue = param + '=' + this.getParamByName(param);

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
    // To Count number of object elements.
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
    },
   // To Get Parameter by its Name [ex. ?page=123, function('page') => 123]
    getParamByName: function (name, url, default_result) {
        // Sanity check.
        if (typeof url === 'undefined' && url) url = false;
        if (typeof name === 'undefined' && name) name = false;
        if (typeof default_result === 'undefined') default_result = false;
        // Default response.
        var response;
        // Sanity check.
        if (!url) {
            // If not valid, then update the active url.
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
    }
};
