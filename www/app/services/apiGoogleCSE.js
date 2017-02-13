define(function() {

  var _API_KEY = 'AIzaSyDDC0TISK8ONY0m0-2acnw0Z4QVPJmclrM',
      _CX = '011732389714672956297:ar9nqghouqc',
      _API_URL = 'https://www.googleapis.com/customsearch/v1';

  var endpoint = function(query,start,images) {
    url = _API_URL+'?key='+_API_KEY+'&cx='+_CX+'&q='+query;
    url += images ? '&searchType=image&imgSize=medium' : '';
    return url+'&start='+start;
  };

  var getJSON = function(query,start,images) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', endpoint(query,start,images));
      request.responseType = 'json';
      request.onload = function() {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('error code:' + request.statusText));
        }
      };
      request.onerror = function() {
          reject(Error('network error'));
      };
      request.send();
    });
  };

  return {
    getWebs: getJSON,
    getImages: getJSON
  };

});