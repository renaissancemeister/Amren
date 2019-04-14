(function() {
  var scripts = document.getElementsByTagName( 'script' );
  var thisScriptTag = scripts[ scripts.length - 1 ];

  for (var index = scripts.length - 1; index >= 0; index--) {
    if (scripts[index].src.indexOf("iframe.js") > -1) {
      thisScriptTag = scripts[index];
      break;
    }
  }

  var iframe = document.createElement('iframe');
  iframe.src = thisScriptTag.src.replace(/\.js/,'.html');
  iframe.src += '&docUrl='+encodeURIComponent(window.location.href);
  iframe.frameBorder = 0;
  iframe.setAttribute('webkitallowfullscreen', 'true');
  iframe.setAttribute('height', thisScriptTag.getAttribute('height') || "100%");
  iframe.setAttribute('width', thisScriptTag.getAttribute('width') || "100%");
  thisScriptTag.parentNode.insertBefore(iframe, thisScriptTag.nextSibling);
}());