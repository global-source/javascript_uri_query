# Javascript URI Query
Core Javascript Library for URL Operations.

[![Packagist](https://img.shields.io/badge/release-v1.0-blue.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/1.0)
[![Packagist](https://img.shields.io/badge/tests-success-brightgreen.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/1.0)

## Installation

Include the URI library to project by using,

    <script src="uri_helper.js"></script>
    
## Example
  
  **1. getParams()**
  
  To get list of URI params as Object.    
    
    ```javascript
    
        URI.getParam();    
        
    ```
        URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        Output : ["type=myTicket", "page=1", "limit=5"]

**2. getParamByName()**
  
To get value of the param from URI.
    
        Ex. URI.getParamByName('type');
        
        URI : http://domain.com/?type=myTicket&page=2&limit=5
        
        OUT : 'myTicket'
        
        
**3. addParam()**
  
To add list of param to the URI. If item already exists, then value get updated.    
    
        Ex. URI.addParam([{'page': 1}, {'limit': 5}]);
        
        Before URL : http://domain.com/?type=my-ticket
        
        After URL : http://domain.com/?type=my-ticket&page=1&limit=5
        

**4. remove()**  
  
To remove list of param from the URI.
  
        Ex. 
        URI.removeParam(['page','limit']);   // For Bulk.
        URI.removeParam('type');             // For Single.   
        
        Before URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        After URL : http://domain.com/?
        
     
**5. removeAll()**
  
To remove all param in the URI.
    
        Ex. URI.removeAll();
        
        Before URI : http://domain.com/?type=my-ticket&page=2&limit=5
        
        After URI : http://domain.com/?
        
     
**6. prevPage()**
    
To go back to previous page by update the URI.
    
        Ex. URI.prevPage();
        
        Before URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
        After URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        
**7. nextPage()**
  
To move to next page by update the URI.
    
        Ex. URI.nextPage();
        
        Before URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        After URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
        
**8. isParamExists()**
  
To check the param is exist in URI or Not.
    
        Ex.         
        1: URI.isParamExists('page');        
        2: URI.isParamExists('newPage');
        
        URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
        OUT 1 : true
        OUT 2 : false
       
        
        
# License 
   
   MIT License
