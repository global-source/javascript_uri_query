// Simple Instance for access URI.

var URI = {
        getParams: function (byString) {
            // Sanity check.
            if(typeof byString === 'undefined') byString = false;
                
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
        // To Remove Param From URI.
        removeParam: function (list) {

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

            // Generate Update List by eliminating the element list.
            for (var i = 0; i < list.length; i++) {
                // Remove the list of elements, one by one.
                delete updated_list[list[i]];
            }

            var newQuery = '?';
            // To Form New and Updated Query.
            for (var i in updated_list) {
                newQuery += i + '=' + updated_list[i] + '&';
            }
            // To Update the URI.
            window.history.pushState('', 'Title', newQuery.slice(0, -1));
        },
        // To Add Param To URI.
        addParam: function (list) {
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
            // Loop with New Params.
            for (var i in list) {
                // Adding Params to Existing list.
                for (var k in list[i]) {
                    updated_list[k] = list[i][k];
                }
            }

            var newQuery = '?';
            // To Form New and Updated Query.
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
        getParamByName: function (name, url) {
            // Sanity check.
            if(typeof url === 'undefined') url = false;
            if(typeof name === 'undefined') name = false;
                
            if (!url) {
                url = window.location.href;
            }
            if(!name) return false;
                
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    };
