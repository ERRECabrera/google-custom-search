define(function() {

  return {
    cleanContainer: function(section){
      var ids = {
        web: "list-web-results",
        img: "imgs-wall"
      };
      document.getElementById(ids[section]).innerHTML = '';
    },
    cleanNavigation: function(section){
      document.getElementById('pagination-'+section).innerHTML = '';
    },
    appendWeb: function(item) {

      // DOM component
      var li = document.createElement('LI');
        var article = document.createElement('ARTICLE');
          var header = document.createElement('HEADER');
            var h3 = document.createElement('H3');
              var h3_text = document.createTextNode(item.title);
          var cite = document.createElement('CITE');
            var a = document.createElement('A');
              var a_link = document.createTextNode(item.link);
          var div = document.createElement('DIV');
            var p = document.createElement('P');
              var p_text = document.createTextNode(item.snippet);

      // Class&Attributes
      article.className = 'web-result';
      a.href = item.link;

      li.appendChild(article);
      article.appendChild(header);
      article.appendChild(cite);
      article.appendChild(div);
      header.appendChild(h3);
      h3.appendChild(h3_text);
      cite.appendChild(a);
      a.appendChild(a_link);
      div.appendChild(p);
      p.appendChild(p_text);

      document.getElementById("list-web-results").appendChild(li);
    },
    appendImage: function(item) {

      // DOM component
      var figure = document.createElement('FIGURE');
        var a = document.createElement('A');
          var img = document.createElement('IMG');

      // Class&Attributes
      figure.className = 'img-result';
      a.href = item.link;
      img.src = item.link;
      img.alt = item.title;

      figure.appendChild(a);
      a.appendChild(img);

      document.getElementById("imgs-wall").appendChild(figure);
    },
    appendNavigation: function(section,start,page,tag) {

      // DOM component
      var span = document.createElement('SPAN');
        var a = document.createElement('A');
          var b = document.createElement('B');

      // Class&Attributes
      var arrowSym, arrowId, arrowPosition;

      if (start > page.startIndex) {
        arrowSym = '&#8592;';
        arrowId = 'previous-'+section;
        arrowPosition = '-30px';
      } else {
        arrowSym = '&rarr;';
        arrowId = 'next-'+section;
        arrowPosition = '30px';
      }

      span.className = 'arrow';
      b.id = arrowId;
      b.style.position = 'relative';
      b.style.left = arrowPosition;
      b.dataset.start = page.startIndex;
      b.dataset.section = section;
      b.dataset.tag = tag;

      span.appendChild(a);
      a.appendChild(b);
      b.innerHTML = arrowSym;

      document.getElementById("pagination-"+section).appendChild(span);
    }
  };

});