checkRequirements = ->
  try
    return window.localStorage && window['localStorage'] != null;
  catch error
    return false;
  true;

loadLinks = ->
  if data = localStorage.getItem("drudge.js.links")
    data = JSON.parse data;
  else
    data = [];

  found = [];
  for index, anchor of document.getElementsByTagName "a"
    url = anchor.attributes["a"].value;
    found.push url;
    
    if data[url]
      data[url].views++;
    else
      data[url] = views: 1, text: anchor.text;

    anchor.attribute["style"].value = "color: green;" if data[url].views == 1;
    anchor.attribute["style"].value = "color: blue;" if data[url].views > 1;

  for url, record of data
    delete data[url] unless found.indexOf(url) > 0

  localStorage.setItem "drudge.js.links", data

if checkRequirements()
  loadLinks();
else
  alert "your browser sucks, go away."
