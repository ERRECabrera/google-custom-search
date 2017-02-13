define(['../services/apiGoogleCSE','../stubs/fakeGoogleResponse','../controllers/ctrlRender','../controllers/ctrlEvents'], function(apiGoogleCSE,fakeGoogleCSE,ctrlRender,ctrlEvents) {

  var API = fakeGoogleCSE;

  var promiseHandler = {
    cseJSON: function(promise,start,tag,section) {
      promise.then(function(response){
        console.info(response);
        ctrlRender.cleanContainer(section);
        ctrlRender.cleanNavigation(section);
        var renderType = (section=='web') ? ctrlRender.appendWeb : ctrlRender.appendImage ;
        response.items.forEach(function(item){
          renderType(item);
        });
        var previousPage = response.queries.previousPage;
        var nextPage = response.queries.nextPage;
        [previousPage,nextPage].forEach(function(page){
          if (page) {
            ctrlRender.appendNavigation(section,start,page[0],tag);
          }
        });
        // show section
        document.getElementById('results-'+section).style.visibility = 'visible';
        // arrow events
        Array.from(document.getElementsByClassName('pagination-section')).forEach(function(footer) {
          Array.from(footer.children[0].children).forEach(function(arrow) {
            var b_arrow = arrow.children[0].children[0];
            ctrlEvents.listen(b_arrow, 'click', ctrlSearch.getSection, false);
          });
        });
      },function(error){
        console.error(error.message);
      });
    }
  };

  var ctrlSearch = {
    getAll: function(e) {
      if(e.type == 'click' || (e.type == 'keydown' && e.keyCode === 13)){
        var tag = document.getElementById('search-input').value;
        if (tag !== ''){
          var start = 1;
          promiseImages = API.getImages(tag,start,true);
          promiseWebs = API.getWebs(tag,start,false);
          promiseHandler.cseJSON(promiseImages,start,tag,'img');
          promiseHandler.cseJSON(promiseWebs,start,tag,'web');
        }
      }
    },
    getSection: function(e) {
      var section = this.dataset.section;
      var start = parseInt(this.dataset.start);
      var tag = this.dataset.tag;
      if (section == 'web') {
        promiseWebs = API.getWebs(tag,start,false);
        promiseHandler.cseJSON(promiseWebs,start,tag,'web');
      } else {
        promiseImages = API.getImages(tag,start,true);
        promiseHandler.cseJSON(promiseImages,start,tag,'img');
      }
    }
  };

  return ctrlSearch;

});