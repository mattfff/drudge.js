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
    return true;
  };

  loadLinks = function() {
    var anchor, count, data, found, hideThreshhold, index, opacity, record, url, _len, _ref;
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
      hideThreshhold = localStorage.getItem("drudge.js.hideThreshhold");
      if (hideThreshhold === null) hideThreshhold = 10;
      if (data[url].views === 1) {
        anchor.setAttribute('style', "color: green;");
      } else {
        if (data[url].views < 20) opacity = 1 - (data[url].views / 20);
        if (opacity < 0.3) opacity = 0.3;
        anchor.setAttribute('style', 'opacity: ' + opacity);
      }
    }
    count = 0;
    for (url in data) {
      if (!__hasProp.call(data, url)) continue;
      record = data[url];
      if (!(found.indexOf(url) > 0)) delete data[url];
      count++;
    }
    localStorage.setItem("drudge.js.links", JSON.stringify(data));
    return document.body.setAttribute("class", document.body.getAttribute("class") + "drudge_js_ran");
  };

  loadUI = function() {
    var hideThreshhold, hideThreshholdSelect, navBar, num, opt, resetButton;
    navBar = document.createElement('div');
    navBar.setAttribute("style", "position:absolute;top:10px;right:10px;border:1px solid #000;box-shadow:1px 1px 3px #000;border-radius: 3px;padding:3px;background:#000");
    navBar.id = "drudge_js_navbar";
    resetButton = document.createElement('a');
    resetButton.innerHTML = "Reset";
    resetButton.setAttribute("style", "font-family:sans-serif;color:#fff;text-decoration:none;cursor:pointer;");
    navBar.appendChild(resetButton);
    document.body.appendChild(navBar);
    hideThreshholdSelect = document.createElement('select');
    hideThreshhold = localStorage.getItem("drudge.js.hideThreshhold");
    if (hideThreshhold === null) hideThreshhold = 10;
    for (num = 2; num <= 20; num++) {
      opt = document.createElement("option");
      opt.value = num;
      opt.appendChild(document.createTextNode(num));
      if (num === parseInt(hideThreshhold, 10)) opt.selected = "selected";
      hideThreshholdSelect.appendChild(opt);
    }
    hideThreshholdSelect.onchange = function() {
      var anchor, data, index, value, _len, _ref, _results;
      value = this.options[this.selectedIndex].value;
      data = JSON.parse(localStorage.getItem("drudge.js.links"));
      localStorage.setItem("drudge.js.hideThreshhold", value);
      _ref = document.getElementsByTagName('a');
      _results = [];
      for (index = 0, _len = _ref.length; index < _len; index++) {
        anchor = _ref[index];
        if (data[anchor.href] && data[anchor.href].views > value) {
          _results.push(anchor.setAttribute("style", anchor.getAttribute("style") + "display: none;"));
        } else {
          if (anchor.hasAttribute("style")) {
            _results.push(anchor.setAttribute("style", anchor.getAttribute("style").replace("display: none;", "")));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };
    return resetButton.onclick = function() {
      localStorage.removeItem("drudge.js.links");
      return loadLinks();
    };
  };

  loadStyles = function() {
    var style_text, styles;
    styles = document.createElement("style");
    styles.type = "text/css";
    style_text = "a:visited { opacity: 0.5; color: blue; }\n";
    style_text += "#drudge_js_navbar select { margin: 0 10px; }\n";
    if (styles.styleSheet) {
      styles.styleSheet.cssText = style_text;
    } else {
      styles.appendChild(document.createTextNode(style_text));
    }
    return document.getElementsByTagName("head")[0].appendChild(styles);
  };

  if (checkRequirements() && checkContext()) {
    clearInterval(timer);
    loadLinks();
    loadUI();
    loadStyles();
  }

}).call(this);
