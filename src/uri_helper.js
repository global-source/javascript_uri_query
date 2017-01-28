var URI = {

        // To Get list of URL params.
        getParams: function (byString) {

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
                return queryDict;
            }
        },
        // To Remove Param From URI.
        removeParam: function (list) {

            // To Check the type is Object or Not.
            if (typeof list != 'object') return false;
            // To Get list of Params.
            var core_list = this.getParams();
            // To Count the Params to check existance.
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
        // To Go to Next Page.
        nextPage: function () {
            // To Get the actual value of "page"
            var page = this.getParameterByName('page');
            if (!page) {
                page = 0;
            }
            page++;
            // Update the Param "page" value.
            this.replaceParam('page', page);
        },
        // To Go back to Previous Page.
        prevPage: function () {
            // To Get the actual value of "page"
            var page = this.getParameterByName('page');
            if (!page) {
                page = 0;
            }

            if (page != 0) {
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
            var oldValue = param + '=' + this.getParameterByName(param);

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
            var length = 0;
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    ++length;
                }
            }
            return length;
        },
        // To Get Parameter by its Name [ex. ?page=123, function('page') => 123]
        getParameterByName: function (name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    };
