# Javascript_URI_query
Core Javascript Library for URL Operations.

[![Packagist](https://img.shields.io/badge/release-v1.0-blue.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/1.0)
[![Packagist](https://img.shields.io/badge/tests-success-brightgreen.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/1.0)

### Installation

    <script src="./uri_helper.js"></script>
    
### Example
  
  **1. getParams()**
  
  To get list of URI params as Object.    
    
        Ex. 
              URI.getParam();
        
        URL : http://domain.com/?type=myTicket&page=1&limit=5
        
        OUT : ["type=myTicket", "page=1", "limit=5"]
        
        

**2. addParam()**
  
To add list of param from the URI.    
    
        Ex.        
                     URI.addParam([{'page': 1}, {'limit': 5}]);
        
        Before URL : http://domain.com/?type=myTicket
        
        After URL : http://domain.com/?type=myTicket&page=1&limit=5
        

**3. removeParam()**  
  
To remove list of param from the URI.
  
        Ex.         
                     URI.removeParam(['page']);
        
        Before URL : http://domain.com/?type=myTicket&page=1&limit=5
        
        After URL : http://domain.com/?type=myTicket&limit=5
        
     
**4. nextPage()**
  
To move to next page by update the URI.
    
        Ex.        
                     URI.nextPage();
        
        Before URL : http://domain.com/?type=myTicket&page=1&limit=5
        
        After URL : http://domain.com/?type=myTicket&page=2&limit=5
        
     
**5. prevPage()**
    
To go back to previous page by update the URI.
    
        Ex.         
                     URI.prevPage();
        
        Before URL : http://domain.com/?type=myTicket&page=2&limit=5
        
        After URL : http://domain.com/?type=myTicket&page=1&limit=5
        
        
**6. isParamExists()**
  
To check the param is exist in URI or Not.
    
        Ex .
        
        1: URI.isParamExists('page');
        
        2: URI.isParamExists('newPage');
        
        URL : http://domain.com/?type=myTicket&page=2&limit=5
        
        OUT 1 : true
        OUT 2 : false
        
        
**7. replaceParam()**
  
To replace the value of the param in URI.
    
        Ex.         
                    URI.replaceParam('page',5);
        
        Before URI : http://domain.com/?type=myTicket&page=2&limit=5
        
        After URI : http://domain.com/?type=myTicket&page=5&limit=5
        
           
**8. getParamByName()**
  
To get value of the param from URI.
    
        Ex.        
              URI.getParamByName('type');
        
        URI : http://domain.com/?type=myTicket&page=2&limit=5
        
        OUT : 'myTicket'
        
        
### License 
   
   MIT License
