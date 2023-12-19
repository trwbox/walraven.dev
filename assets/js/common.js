$(document).ready(function() {
  // add toggle functionality to abstract and bibtex buttons
  $('a.abstract').click(function() {
    $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass('open');
  });
  $('a.bibtex').click(function() {
    $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass('open');
  });
  $('a').removeClass('waves-effect waves-light');

  // bootstrap-toc
  if($('#toc-sidebar').length){
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  console.log('Running from %s', window.location.pathname)
  console.log('Running from URL', window.location.href)
  console.log('Current css path', cssLink.href)
  cssLink.href  = "../css/jupyter.css";
  console.log('New css path', cssLink.href)
  cssLink.rel   = "stylesheet";
  cssLink.type  = "text/css";

  let theme = localStorage.getItem("theme");
  if (theme == null || theme == "null") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  }

  $('.jupyter-notebook-iframe-container iframe').each(function() {
    // Break up the commented line below for debugging
    var contens = $(this).contents();
    var head = contens.find("head");
    head.append(cssLink);
    var new_css = contens.find("head link");
    //$(this).contents().find("head").append(cssLink);

    if (theme == "dark") {
      console.log('Setting dark theme for juptyer iframe');
      // Find the body element of the iframe and set the theme to dark
      var new_data = $(this).contents().find("body").attr({
        "data-jp-theme-light": "false",
        "data-jp-theme-name": "JupyterLab Dark"});
      // Wait for the iframe to load before setting the theme to 
      $(this).bind("load",function(){
        new_data
      });
    }
  });
});

