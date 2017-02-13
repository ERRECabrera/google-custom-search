define(['./controllers/ctrlEvents','./controllers/ctrlSearch'], function(ctrlEvents,ctrlSearch) {

  var submit_btn = document.getElementById('search-button');
  var input_tag = document.getElementById('search-input');

  ctrlEvents.listen(submit_btn, 'click', ctrlSearch.getAll, false);
  ctrlEvents.listen(input_tag, 'keydown', ctrlSearch.getAll, false);

});