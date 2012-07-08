checkRequirements = ->
  try
    return window.localStorage && window['localStorage'] != null
  catch error
    return false
  
  return false if window.location.href.indexOf "drudgereport.com" >= 0
  true;

loadLinks = ->
  if data = localStorage.getItem("drudge.js.links")
    data = JSON.parse data
  else
    data = {}

  found = []
  for anchor, index in document.getElementsByTagName "a"
    url = anchor.getAttribute "href"
    continue if url.length == 0
    continue if url == "http://www.drudgereport.com/"

    found.push url;

    if data[url]
      data[url].views++;
    else
      data[url] = views: 1, text: anchor.text

    if data[url].views == 1
      anchor.setAttribute 'style', "color: green;"
    else
      opacity = 1 - (data[url].views / 20) if data[url].views < 20
      opacity = 0 if opacity < 0

      anchor.setAttribute 'style', "opacity: " + opacity

  for own url, record of data
    delete data[url] unless found.indexOf(url) > 0

  localStorage.setItem "drudge.js.links", JSON.stringify(data)
  document.body.setAttribute "class", document.body.getAttribute("class") + "drudge_js_ran"

loadUI = ->
  navBar = document.createElement 'div'
  navBar.setAttribute "style", "position:absolute;top:10px;right:10px;border:1px solid #000;box-shadow:1px 1px 3px #000;border-radius: 3px;padding:3px;background:#000"
  
  resetButton = document.createElement 'a'
  resetButton.innerHTML = "Reset"
  resetButton.setAttribute "style", "font-family:sans-serif;color:#fff;text-decoration:none;cursor:pointer;"
  navBar.appendChild resetButton

  document.body.appendChild navBar

  resetButton.onclick = ->
    localStorage.removeItem("drudge.js.links")
    loadLinks()

if checkRequirements()
  if document.body.getAttribute("class") == null || document.body.getAttribute("class").indexOf("drudge_js_ran") < 0
    loadLinks();
    loadUI();
else
  alert "You're not at drudgereport.com, or your browser can't support this tool. Supported browsers are IE9, Chrome, Safari, or Firefox"
