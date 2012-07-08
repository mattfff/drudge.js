(function() {
  var checkRequirements, loadLinks;

  checkRequirements = function() {
    try {
      return window.localStorage && window['localStorage'] !== null;
    } catch (error) {
      return false;
    }
    return true;
  };

  loadLinks = function() {
    var anchor, data, found, index, record, url, _ref;
    if (data = localStorage.getItem("drudge.js.links")) {
      data = JSON.parse(data);
    } else {
      data = [];
    }
    found = [];
    _ref = document.getElementsByTagName("a");
    for (index in _ref) {
      anchor = _ref[index];
      url = anchor.getAttribute("href");
      found.push(url);
      if (data[url]) {
        data[url].views++;
      } else {
        data[url] = {
          views: 1,
          text: anchor.text
        };
      }
      console.log("test");
      if (data[url].views === 1) anchor.setAttribute('style', "color: green;");
      if (data[url].views > 1) anchor.setAttribute('style', "color: blue;");
    }
    for (url in data) {
      record = data[url];
      if (!(found.indexOf(url) > 0)) delete data[url];
    }
    return localStorage.setItem("drudge.js.links", JSON.stringify(data));
  };

  if (checkRequirements()) {
    loadLinks();
  } else {
    alert("your browser sucks, go away.");
  }

}).call(this);
