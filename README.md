# Javascript URI Query
Core Javascript Library for URL Operations.

[![Packagist](https://img.shields.io/badge/v.2.0-Build-green.svg)](https://github.com/global-source/javascript_uri_query/releases/tag/v.2)
[![Packagist](https://img.shields.io/badge/ES6-Support-blue.svg)](https://github.com/global-source/javascript_uri_query)

___

One library to perform most of the **URI** operations. 
Such as,
 
 
 Action       | Method                            | Description |
 -------------|-----------------------------------|-------------|
  Add         | URI.addNew(key, val)              | To add new param to URL. |
  Bulk Add    | URI.add([{key1 : val1},{key2: val2}])| To add multiple params to URL.|
  Append      | URI.append(key, val)              | To add new item to the existing value. |
  Update      | URI.add([{key: val}])            | To update param by simple add same param. |
  Delete      | URI.remove(key)                | To remove param from URL. |
  Bulk Delete | URI.remove([key1, key2])      | To remove multiple param from URL. |
  Delete All  | URI.removeAll()                   | To remove all param in the URL. |
  Clear       | URI.clear()                       | TO clear the URL history. |
  Update      | URI.update()                      | To update URI status. |
  Get         | URI.get(key)                   | To get value of a param. |


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
                
### addNew()
  
To add single param to the URI. If item already exists, then value get updated.    
       
```javascript 
   
           URI.add('page', 1);
        
        // Before URL : http://domain.com/?type=my-ticket
        
        // After URL : http://domain.com/?type=my-ticket&page=1
        
```
        
### add()
  
To add list of params to the URI. If item already exists, then value get updated.    
       
```javascript 
   
           URI.add([{'page': 1}, {'limit': 5}]);
        
        // Before URL : http://domain.com/?type=my-ticket
        
        // After URL : http://domain.com/?type=my-ticket&page=1&limit=5
        
```
        
### append()
  
To append value to the param in the URI.   
       
```javascript 
   
           URI.append(name, bala);
        
        // Before URL : http://domain.com/?name=shankar
        
        // After URL : http://domain.com/?name=shankar,bala
        
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
