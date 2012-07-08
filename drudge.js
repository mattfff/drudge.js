(function() {
  var checkContext, checkRequirements, loadLinks, loadStyles, loadUI,
    __hasProp = Object.prototype.hasOwnProperty;

  checkRequirements = function() {
    try {
      return window.localStorage && window['localStorage'] !== null;
    } catch (error) {
      return false;
    }
    return true;
  };

  checkContext = function() {
    if (!(document.body.getAttribute("class") === null || document.body.getAttribute("class").indexOf("drudge_js_ran") < 0)) {
      return false;
    }
    if (!(window.location.href.indexOf("drudgereport.com") >= 0)) return false;
  };

  loadLinks = function() {
    var anchor, data, found, index, opacity, record, url, _len, _ref;
    if (data = localStorage.getItem("drudge.js.links")) {
      data = JSON.parse(data);
    } else {
      data = {};
    }
    found = [];
    _ref = document.getElementsByTagName("a");
    for (index = 0, _len = _ref.length; index < _len; index++) {
      anchor = _ref[index];
      url = anchor.getAttribute("href");
      if (url.length === 0) continue;
      if (url === "http://www.drudgereport.com/") continue;
      found.push(url);
      anchor.setAttribute("target", "_blank");
      if (data[url]) {
        data[url].views++;
      } else {
        data[url] = {
          views: 1,
          text: anchor.text
        };
      }
      if (data[url].views === 1) {
        anchor.setAttribute('style', "color: green;");
      } else {
        if (data[url].views < 20) opacity = 1 - (data[url].views / 20);
        if (opacity < 0.3) opacity = 0.3;
        anchor.setAttribute('style', "opacity: " + opacity);
      }
    }
    for (url in data) {
      if (!__hasProp.call(data, url)) continue;
      record = data[url];
      if (!(found.indexOf(url) > 0)) delete data[url];
    }
    localStorage.setItem("drudge.js.links", JSON.stringify(data));
    return document.body.setAttribute("class", document.body.getAttribute("class") + "drudge_js_ran");
  };

  loadUI = function() {
    var navBar, resetButton;
    navBar = document.createElement('div');
    navBar.setAttribute("style", "position:absolute;top:10px;right:10px;border:1px solid #000;box-shadow:1px 1px 3px #000;border-radius: 3px;padding:3px;background:#000");
    resetButton = document.createElement('a');
    resetButton.innerHTML = "Reset";
    resetButton.setAttribute("style", "font-family:sans-serif;color:#fff;text-decoration:none;cursor:pointer;");
    navBar.appendChild(resetButton);
    document.body.appendChild(navBar);
    return resetButton.onclick = function() {
      localStorage.removeItem("drudge.js.links");
      return loadLinks();
    };
  };

  loadStyles = function() {
    var style_text, styles;
    styles = document.createElement("style");
    styles.type = "text/css";
    style_text = "a:visited { opacity: 0.5; color: blue; };";
    if (styles.styleSheet) {
      styles.styleSheet.cssText = style_text;
    } else {
      styles.appendChild(document.createTextNode(style_text));
    }
    return document.getElementsByTagName("head")[0].appendChild(styles);
  };

  if (checkRequirements()) {
    clearInterval(timer);
    loadLinks();
    loadUI();
    loadStyles();
  } else {
    alert("You're not at drudgereport.com, or your browser can't support this tool. Supported browsers are IE9, Chrome, Safari, or Firefox");
  }

}).call(this);
