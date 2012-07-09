checkRequirements = ->
  try
    return window.localStorage && window['localStorage'] != null
  catch error
    return false
  
  true;

checkContext = ->
  return false unless document.body.getAttribute("class") == null || document.body.getAttribute("class").indexOf("drudge_js_ran") < 0
  return false unless window.location.href.indexOf("drudgereport.com") >= 0
  true

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
    
    anchor.setAttribute "target", "_blank"

    if data[url]
      data[url].views++;
    else
      data[url] = views: 1, text: anchor.text
    
    hideThreshhold = localStorage.getItem("drudge.js.hideThreshhold")
    hideThreshhold = 10 if hideThreshhold == null

    if data[url].views == 1
      anchor.setAttribute 'style', "color: green;"
    else
      opacity = 1 - (data[url].views / 20) if data[url].views < 20
      opacity = 0.3 if opacity < 0.3

      #if hideThreshhold < data[url].views
      #anchor.setAttribute 'style', 'display: none;'
      #else
      anchor.setAttribute 'style', 'opacity: ' + opacity

  count = 0
  for own url, record of data
    delete data[url] unless found.indexOf(url) > 0
    count++

  localStorage.setItem "drudge.js.links", JSON.stringify(data)
  document.body.setAttribute "class", document.body.getAttribute("class") + "drudge_js_ran"

loadUI = ->
  navBar = document.createElement 'div'
  navBar.setAttribute "style", "position:absolute;top:10px;right:10px;border:1px solid #000;box-shadow:1px 1px 3px #000;border-radius: 3px;padding:3px;background:#000"
  navBar.id = "drudge_js_navbar";

  resetButton = document.createElement 'a'
  resetButton.innerHTML = "Reset"
  resetButton.setAttribute "style", "font-family:sans-serif;color:#fff;text-decoration:none;cursor:pointer;"
  navBar.appendChild resetButton

  document.body.appendChild navBar

  hideThreshholdSelect = document.createElement 'select'

  hideThreshhold = localStorage.getItem("drudge.js.hideThreshhold")
  hideThreshhold = 10 if hideThreshhold == null
  
  for num in [2..20]
    opt = document.createElement "option"
    opt.value = num
    opt.appendChild(document.createTextNode(num))
    opt.selected = "selected" if num == parseInt(hideThreshhold, 10)
    hideThreshholdSelect.appendChild(opt)

  hideThreshholdSelect.onchange = ->
    value = this.options[this.selectedIndex].value
    data = JSON.parse localStorage.getItem("drudge.js.links")
    localStorage.setItem "drudge.js.hideThreshhold", value

    for anchor, index in document.getElementsByTagName 'a'
      if data[anchor.href] && data[anchor.href].views > value
        anchor.setAttribute "style", anchor.getAttribute("style") + "display: none;"
      else
        anchor.setAttribute "style", anchor.getAttribute("style").replace("display: none;", "") if anchor.hasAttribute "style"

        #navBar.appendChild hideThreshholdSelect

  resetButton.onclick = ->
    localStorage.removeItem("drudge.js.links")
    loadLinks()

loadStyles = ->
  styles = document.createElement "style"
  styles.type = "text/css"

  style_text = "a:visited { opacity: 0.5; color: blue; }\n"
  style_text += "#drudge_js_navbar select { margin: 0 10px; }\n";

  if styles.styleSheet
    styles.styleSheet.cssText = style_text
  else 
    styles.appendChild(document.createTextNode(style_text))

  document.getElementsByTagName("head")[0].appendChild(styles)

if checkRequirements() && checkContext()
  clearInterval timer;

  loadLinks();
  loadUI();
  loadStyles();
