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
