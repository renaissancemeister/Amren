addLoadEvent(framebuster);

var BASE64_END_OF_INPUT = -1;

var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readReverseBase64(){   
    if (!base64Str) return BASE64_END_OF_INPUT;
    while (true){      
        if (base64Count >= base64Str.length) return BASE64_END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]){
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    } 
}

function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}

function decodeBase64(str){
    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != BASE64_END_OF_INPUT
        && (inBuffer[1] = readReverseBase64()) != BASE64_END_OF_INPUT){
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
        if (inBuffer[2] != BASE64_END_OF_INPUT){
            result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
            if (inBuffer[3] != BASE64_END_OF_INPUT){
                result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}

var DHTML = (document.getElementById || document.all || document.layers);

function getObj(name) {
  if (document.getElementById) {
    this.obj = document.getElementById(name);
    this.style = document.getElementById(name).style;
  }
  else if (document.all) {
    this.obj = document.all[name];
    this.style = document.all[name].style;
  }
  else if (document.layers) {
    this.obj = document.layers[name];
    this.style = document.layers[name];
  }
}

function framebuster() {
  if (document.location.href != top.location.href) {
    top.location.href = document.location.href;
  }
  return true;
}

function shipit() {
  var zipcode = new getObj('zipcode').obj.value;
  var number = new getObj('number').obj.value;
  top.location.href = document.location.href + zipcode + number + '/'
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      func();
      oldonload();
    }
  }
}

function createXMLHttp() {
	if (typeof XMLHttpRequest != "undefined")
		return new XMLHttpRequest();
	
	var xhrVersion = [ "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp","Microsoft.XMLHttp" ];
  
	for (var i = 0; i < xhrVersion.length; i++) {
  	try {
			var xhrObj = new ActiveXObject(xhrVersion[i]);
      return xhrObj;
    } catch (e) { }
  }
  
  return null;
}