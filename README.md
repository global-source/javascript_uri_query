# Javascript URI Query
Core Javascript Library for URL Operations.

[![Packagist](https://img.shields.io/badge/Build-v.2.0-blue.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/v.2)
[![Packagist](https://img.shields.io/badge/tests-success-brightgreen.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/v.2)

___

One library to perform most of the **URI** operations. 
Such as,
 
 
 Action       | Method                            | Description |
 -------------|-----------------------------------|-------------|
  Add         | URI.add([{'page': 1}])            | To add new param to URL.|
  Bulk Add    | URI.add([{'page': 1},{'index',2}])| To add multiple params to URL.|
  Update      | URI.add([{'page': 2}])            | To update param by simple add same param. |
  Delete      | URI.remove('page')                | To remove param from URL. |
  Bulk Delete | URI.remove(['page','index'])      | To remove multiple param from URL. |
  Delete All  | URI.removeAll()                   | To remove all param in the URL. |
  Clear       | URI.clear()                       | TO clear the URL history. |
  Update      | URI.update()                      | To update URI status. |
  Get         | URI.get('page')                   | To get value of a param. |


## Installation

Include the URI library to project by using,

```html

    <script src="uri_helper.js"></script>
```    
    
## Methods
  
  ### getAll()
  
  To get list of URI params as Object.    
    
```javascript
    
           URI.getAll();    
        
        // URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        // Output : ["type=myTicket", "page=1", "limit=5"]
        
```
        

### get()
  
To get value of the param from URI.
        
```javascript

           URI.get('type');
        
        // URI : http://domain.com/?type=myTicket&page=2&limit=5
        
        // OUT : 'myTicket'
 ```
        
### add()
  
To add list of param to the URI. If item already exists, then value get updated.    
       
```javascript 
   
           URI.add([{'page': 1}, {'limit': 5}]);
        
        // Before URL : http://domain.com/?type=my-ticket
        
        // After URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
```

### remove()
  
To remove list of param from the URI.
      
```javascript
  
           URI.remove(['page','limit']);   // For Bulk.
           URI.remove('type');             // For Single.   
        
        // Before URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        // After URL : http://domain.com/?
```        
     
### removeAll()
  
To remove all param in the URI.
       
```javascript
   
           URI.removeAll();
        
        // Before URI : http://domain.com/?type=my-ticket&page=2&limit=5
        
        // After URI : http://domain.com/?
```        
     
### prevPage()
    
To go back to previous page by update the URI.
       
```javascript
   
           URI.prevPage();
        
        // Before URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
        // After URL : http://domain.com/?type=my-ticket&page=1&limit=5
```        
        
### nextPage()
  
To move to next page by update the URI.
        
```javascript
   
           URI.nextPage();
        
        // Before URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
        // After URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
```

### isParamExists()
  
To check the param is exist in URI or Not.
        
```javascript
        
           URI.isParamExists('page');        
           URI.isParamExists('newPage');
        
        // URL : http://domain.com/?type=my-ticket&page=2&limit=5
        
        // OUT 1 : true
        // OUT 2 : false
       
```        
        
# License 
   
   MIT License
