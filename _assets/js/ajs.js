;(function(w, d, undefined) {
  if (!window._ldAdIdMap) {
    window._ldAdIdMap = {};
  }
  var localIds = {};

  var src = d.getElementById('ld-ajs').src;
  var a = d.createElement('a');
  a.href = src;
  var host = /^(cdn\d\.)?lockerdome.com$/.test(a.hostname) ? 'lockerdome.com': a.hostname;
  var isIE = false;
  /*@cc_on isIE = @_jscript_version;@*/
  var forceHttps = isIE === 9 && host === 'lockerdome.com';
  var protocol = forceHttps ? 'https:' : a.protocol;
  var port = forceHttps ? 443 : parseInt(a.port, 10);
  var eventProp = d.addEventListener ? 'addEventListener' : 'attachEvent';
  var eventName = d.addEventListener ? 'message' : 'onmessage';

  function renderWidget(info) {
    var el = d.getElementById(info.id);
    if (!el) return;
    if (configureIframe(info, el)) return;
    var interval = setInterval(function() {
      if (configureIframe(info, el)) {
        clearInterval(interval);
      }
    }, 100);
  }

  function attachEvent(node, eventName, handler) {
    if (node.addEventListener) {
      node.addEventListener(eventName, handler, false);
    } else {
      node.attachEvent("on"+eventName, handler);
    }
  }

  function configureIframe(info, el) {
    if (!el.offsetWidth) return false;
    if (info.preview) el.style.maxWidth = '300px';
    if (!el.style.maxWidth) el.style.maxWidth = '1000px';

    var alreadyRendered = window._ldAdIdMap[info.id];
    var iframe_css_text = '-webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important; max-width: 1000px; min-width: 225px;';
    var search = '?pubid=' + encodeURIComponent(info.id) + '&pubo=' + encodeURIComponent(w.location.protocol + '//' + w.location.host) + '&width=' +  Math.min(1000, el.offsetWidth);
    if (info.preview && info.preview.backfill_strategy) search +='&preview_backfill_strategy=' + info.preview.backfill_strategy;
    if (info.preview && info.preview.backfill) search += '&preview_backfill=' + info.preview.backfill;
    if (info.preview && typeof info.preview.is_testifiable === 'boolean') search += '&preview_testimonial=' + info.preview.is_testifiable;

    if (alreadyRendered) {
      if (info.preview) {
        alreadyRendered.preview_styles = info.preview.styles;
        if (info.preview.styles.max_width) search += '&preview_max_width=' + info.preview.styles.max_width;
        if (info.preview.styles.min_width) search += '&preview_min_width=' + info.preview.styles.min_width;
        if (info.preview.styles.limit_height) search += '&preview_limit_height=' + info.preview.styles.limit_height;
        if (info.preview.styles.primary_color != null) search += '&preview_primary_color=' + info.preview.styles.primary_color;

        alreadyRendered.frame.style.display = 'none';
        alreadyRendered.frame.setAttribute('src', alreadyRendered.origin + '/lad/' + info.slot + search);
      }
      return true;
    }

    if (info.custom) {
      var blacklisted= ['pubid', 'pubo'];
      for (var custom_key in info.custom) {
        if (blacklisted.indexOf(custom_key) === -1) {
          search += "&" + encodeURIComponent(custom_key) + "=" + encodeURIComponent(info.custom[custom_key]);
        }
      }
    }

    var origin = protocol + '//' + host;
    // Only add a port number if it could not be implied.
    if (port && !((protocol === 'https:' && port === 443) || (protocol === 'http:' && port === 80))) {
      origin += ':' + port;
    }
    var iframe = d.createElement('iframe');
    iframe.setAttribute('src', origin + '/lad/' + info.slot + search);
    var dataWidth = el.getAttribute('data-width');
    var dataExtraCssText = el.getAttribute('data-iframe-extra-csstext') || '';
    iframe.setAttribute('width', dataWidth || '100%');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('seamless', '');
    iframe.style.cssText = iframe_css_text + dataExtraCssText;

    // Hide until 'ready' signal.
    iframe.style.display = 'none';

    el.appendChild(iframe);
    localIds[info.id] = window._ldAdIdMap[info.id] = {
      origin: origin,
      id: info.id,
      frame: iframe,
      el: el,
      contentWindow: iframe.contentWindow
    };
    return true;
  }

  w[eventProp](eventName, handleEvent);

  function handleStyles(styles, el, info) {
    if (styles.max_width) el.style.maxWidth = styles.max_width + 'px';
    if (styles.min_width) el.style.minWidth = styles.min_width + 'px';
    if (styles.centered) el.style.margin = '0 auto';
    if (styles.hasOwnProperty('outer_cntnr')) el.setAttribute('style', styles.outer_cntnr);
    if (styles.hasOwnProperty('iframe')) info.frame.style.cssText += styles.iframe;

    if (info.preview_styles) {
      var styleSheets = info.contentWindow.document.styleSheets;
      for (var i in styleSheets) {
        if (styleSheets[i].ownerNode && styleSheets[i].ownerNode.id === 'custom_styles') {
          styleSheets[i].disabled = true;
        }
      }
      $("<style type='text/css' id='preview_styles'>" + styles.inner_styles + "</style>").appendTo(info.contentWindow.document.head);
    }
  }

  function handleEvent(event) {
    try {
      var data = JSON.parse(event.data);
      var info = localIds[data && data.id];

      if (!info || event.origin !== info.origin) return;
      if (data.type === 'ready') {
        var el = d.getElementById(info.id);
        if (info.preview_styles) handleStyles(info.preview_styles, el, info);
        else if (data.styles) handleStyles(data.styles, el, info);
        info.frame.style.display = '';
      }
      if (data.type === 'passback') {
        var parent = info.el;

        var snippet = (function (snippet) {
          try {
            var isOnlyJavaScript = new Function (snippet);
            snippet = "<script>" + snippet + "</script>";
          } catch (e) {
            // If it throws then we know it was more than just javascript
          }

          if (!/<!doctype|<html/.test(snippet)) {
            snippet = "<html>\n<head>\n<script>var inDapIF=true;\x3c/script>\n</head><body>" + snippet + "</body></html>
\n";
          }

          return snippet;
        })(data.snippet);

        var friendlyIFrame = document.createElement('iframe');
        friendlyIFrame.style.display = 'none';
        friendlyIFrame.allowTransparency = "true";
        friendlyIFrame.seamless = "seamless";
        friendlyIFrame.frameBorder = 0;
        friendlyIFrame.border = 0;
        friendlyIFrame.width = '100%';
        friendlyIFrame.scrolling = "no";
        friendlyIFrame.style.border = 0;

        parent.appendChild(friendlyIFrame);

        attachEvent(friendlyIFrame, "load", function (e) {
          var body = friendlyIFrame.contentWindow.document.body;
          body.style.width = parent.offsetWidth + 'px';

          friendlyIFrame.width = body.offsetWidth;
          friendlyIFrame.height = body.offsetHeight;

          friendlyIFrame.style.display = '';

          setInterval(function () {
            var width = body.offsetWidth;
            var height = body.offsetHeight;
            if (friendlyIFrame.width != width) {
              friendlyIFrame.width = width;
            }
            if (friendlyIFrame.height != height) {
              friendlyIFrame.height = height;
            }
          }, 500);
        });

        friendlyIFrame.contentWindow.fooface = snippet;
        friendlyIFrame.contentWindow.location.replace("javascript:window.fooface");
      }
      if (data.type === 'height') {
        info.frame.setAttribute('height', data.value);
      } else if (data.type === 'width') {
        info.frame.setAttribute('width', data.value);
      }
    } catch (e) {}
  }

  var ld_ids = w.ldAdInit;
  function renderAllWidgets() {
    var ld = ld_ids;
    if (!ld || !ld.length) return;
    var els = [];
    for (var i = 0, len = ld.length; i < len; ++i) renderWidget(ld[i]);
  }
  setTimeout(renderAllWidgets, 0);
  w.ldAdInit = { push: renderWidget };
})(window, document);