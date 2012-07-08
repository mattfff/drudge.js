(function() {
  var checkRequirements, loadLinks,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  checkRequirements = function() {
    try {
      return __indexOf.call(window, 'localStorage') >= 0 && window['localStorage'] !== null;
    } catch (error) {
      return false;
    }
    return true;
  };

  loadLinks = function() {
    var anchor, data, found, record, url;
    if (data = localStorage.getItem("drudge.js.links")) {
      data = JSON.parse(data);
    } else {
      data = [];
    }
    found = [];
    for (anchor in document.getElementByTagName("a")) {
      url = anchor.attributes["a"].value;
      found.push(url);
      if (data[url]) {
        data[url].views++;
      } else {
        data[url] = {
          views: 1,
          text: anchor.text
        };
      }
      if (data[url].views === 1) anchor.attribute["style"].value = "color: green;";
      if (data[url].views > 1) anchor.attribute["style"].value = "color: blue;";
    }
    for (url in data) {
      record = data[url];
      if (!(found.indexOf(url) > 0)) delete data[url];
    }
    return localStorage.setItem("drudge.js.links", data);
  };

  if (checkRequirements()) {
    loadLinks();
  } else {
    alert("your browser sucks, go away.");
  }

}).call(this);
