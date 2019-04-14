/* TOOLBAR width 776px or 100% ??, see on shoppping.aliceadsl.fr */
/* Script detection de la rubrique (url) pour definir la largeur de la toolbar. */
/* les variables sont definies par defaut pour la toolbar normale 776px */
var a_table_width = "776";
var a_separ_search = "<td width=\"16\"></td><td width=\"69\">";
var a_line2_width = "width=\"703\"";

// Tableau des sites qui ne sont pas en 776px
var toolbar_not_776 =
	[
	"zen.aliceadsl.fr",
	"alicecuisine.aliceblogs.fr",
	"shopping.aliceadsl.fr",
	"noel.aliceadsl.fr",
	"admin.aliceblogs.fr",
	"voyage.aliceadsl.fr/ski/",
	"voyage.aliceadsl.fr/cadeaux/",
	"voyage.aliceadsl.fr/camping/",
	"jeuconcours2006.aliceadsl.fr",
	"exemple.aliceadsl.fr",
	"saintvalentin.aliceadsl.fr",
	"billetterie.aliceadsl.fr",
	"alicerugby.aliceadsl.fr",
	"abonnementsmagazines.aliceadsl.fr",
	"people.aliceadsl.fr",
	"olivetti.aliceadsl.fr",
	"jeuconcoursphotos.aliceadsl.fr",
	"electionsrtl.aliceadsl.fr",
	"rencontres.aliceadsl.fr",
	
	
	
	
	
	
	
	"servicesplus.aliceadsl.fr",
	"annonce-automoto.aliceadsl.fr", "automoto.aliceadsl.fr",
	"empruntis.aliceadsl.fr/assuranceauto", "empruntis.aliceadsl.fr/assurancemoto", "empruntis.aliceadsl.fr/creditconso",
	"www.lacentrale.fr/alice/",
	
	"evenements.aliceadsl.fr/fetesdesmeresetdesperes",
	"jeuconcours.aliceadsl.fr",
	"parrainage.aliceadsl.fr",
	"aliceadsl.lci.fr",
	"aliceadsl.eurosport.fr",
	"aliceadsl.plurielles.fr",
	"emissionstf1.aliceadsl.fr",
	"aliceadsl.tfou.fr",
	"www.aliceadsl.fr/empruntis",
	"www.aliceadsl.fr/annonce-tf1",
	
	"recherche-voyage.aliceadsl.fr",
	"recherche-sejour.aliceadsl.fr",
	"rencontres-ulteem.aliceadsl.fr",
	"login.aliceadsl.fr/default.php",
	"qualite.aliceadsl.fr",	
	"hyperassur.aliceadsl.fr",
	"partagevideosphotos.aliceadsl.fr",	
	"anxa.aliceadsl.fr",
	"analysereves.aliceadsl.fr",
	"lettrestypes.aliceadsl.fr",
	"charme.aliceadsl.fr",
	"www.aliceadsl.fr/charme",
	"www.aliceadsl.fr/pagesjaunes",
	"www.aliceadsl.fr/jeux",
	"recherche-ski.aliceadsl.fr",
	"evenements.aliceadsl.fr/ducati",
	"evenements.aliceadsl.fr/ferrari",
	"alicemusic.aliceadsl.fr",
	"www.alicemusic.fr",
	"jeuxcadeaux.aliceadsl.fr",
	"boonty.aliceadsl.fr",
	"zylom.aliceadsl.fr/partner/alice/fr",
	"theplaybox.aliceadsl.fr/aliceadsl",
	"jeuxtvtf1.aliceadsl.fr/premium",
	"instantsgagnants.aliceadsl.fr",
	"www.aliceadsl.fr/securitepc",
	"nomdedomaine.aliceadsl.fr",
	"www.chez.aliceadsl.fr",
	"alice.cewecolor.fr",
	"photoprintit.de",
	"photo.aliceadsl.fr",
	"mes-services.aliceadsl.fr"
	];

// Si l'url contient une des valeurs du tableau => passage en 100 %
for (i=0; i< toolbar_not_776.length; i++) { 
	if(document.location.href.indexOf(toolbar_not_776[i],0) > 0) {
	var a_table_width = "100%";
	var a_separ_search = "<td align=\"right\" class=\"g\">";
		var a_line2_width = "";
		}
 }

/* *** */

var userEmail = getCookie("idlogin[m]");	// User email
var sTbPath = 'http://toolbar.aliceadsl.fr/img/';
function getCookie (CookieName)
{
	var lf = "\n";
	var CookieString = document.cookie;
	var CookieSet = CookieString.split ('; ');
	var SetSize = CookieSet.length;
	var CookiePieces;
	var ReturnValue = "";
	var x = 0;
	for (x = 0; ((x < SetSize) && (ReturnValue == "")); x++)
	{
		CookiePieces = CookieSet[x].split ('=');
		if (CookiePieces[0].substring (0,1) == ' ')
			CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
					
		if (CookiePieces[0] == CookieName)
			ReturnValue = CookiePieces[1];
	}	
	return ReturnValue;
}
	
function setCookie(name, value, days)
{
	if(!days) days = -1;
	var expire = new Date();
	expire.setTime(expire.getTime() + 86400000 * days);		
	document.cookie = name + "=" + escape(value) + ";path=/;domain=aliceadsl.fr;expires=" + expire.toGMTString() + ";";
}

document.write('<style>'
+'body, input, textarea, select {margin:0px; padding:0px;}'
+'body, input, textarea, select	{font-family: Arial, Helvetica, sans-serif;}'
+'.g {background:#DCDADB;}'
+'#Alicetoolbar a.l {font-family:Arial;font-size:13px;text-decoration:underline;font-weight:bold;color:rgb(7, 80, 217);}'
+'.a13b {font-family:Arial;font-size:13px;color:#000000;font-weight:bold;}'
+'.a13 {font-family:Arial;font-size:13px;}'
+'#Alicetoolbar a.a13 {font-family:Arial;font-size:13px;color:rgb(7, 80, 217);text-decoration:none;font-weight:lighter;}'
+'#Alicetoolbar a.a13:HOVER {font-family:Arial;font-size:13px;color:rgb(7, 80, 217);text-decoration:underline;font-weight:lighter;}'
+'#Alicetoolbar a.a10 {font-family:Arial;font-size:10px;color:rgb(7, 80, 217);text-decoration:underline;}'
+'.a10 {font-family:Arial;font-size:10px;color:rgb(7, 80, 217);}'
+'.x {font-family:Arial;font-size:10px;color:#E42731;font-weight:bold;}'
+'.google {font-family:Arial;font-size:9px;color:#9D9D9D;font-weight:normal;text-align:center;}'
+'</style>'
+'<div id="Alicetoolbar">'
+'<table border="0" cellspacing="0" cellpadding="0" width="'+a_table_width+'">'
  +'<form action=http://rechercher.aliceadsl.fr/recherche/cgi/recherche.cgi name=frmTB id=frmTB target="_top">'
  +'<tr align="left" valign="middle" class="g">'
    +'<td width="15"><img src="'+sTbPath+'angl_g3x34.gif"/></td>'
    +'<td width="58" rowspan="2"><a href="http://www.aliceadsl.fr/" target="_top"><img src="'+sTbPath+'mini_logo.gif" border="0" alt="Alice"/></a></td>'
    +'<td width="14"></td>'
    +'<td width="84"><a href="http://www.aliceadsl.fr/" class="l" target="_top">Accueil Alice</a></td>'
    +'<td width="12"></td>'
    +'<td width="2"><img src="'+sTbPath+'sep_2x25.gif"/></td>'
    +'<td width="12"></td>'
    +'<td width="28"><a href="http://www.aliceadsl.fr/webmail/" target="_top"><img src="'+sTbPath+'pict_mel.gif" alt="E-mail" border="0"></a></td>'
	+'<td width="40" class="g"><a href="http://www.aliceadsl.fr/webmail/" class="l" target="_top">E-mail</a></td>'
    +'<td width="12"></td>'
    +'<td width="2"><img src="'+sTbPath+'sep_2x25.gif"/></td>'
    +'<td width="12"></td>'
    +'<td width="128" class="g"><a href="http://plandesite.aliceadsl.fr/" class="l" target="_top">Tout le site de A &agrave; Z</a></td>'
    +'<td width="16"></td>'
    +'<td width="2"><img src="'+sTbPath+'sep_2x25.gif"/></td>'
    +a_separ_search+'<a href="http://nomade.aliceadsl.fr/" class="l" target="_top">Recherche</a></td>'
	+'<td width="26" class="google">avec</td>'
	+'<td width="58"><img src="'+sTbPath+'google_fdgris.gif"/></td>'
    +'<td width="109"><input type="text" value="" name="qs" id="qs" style="width:105px;" maxlength="255"/></td>'
    +'<td width="8"></td>'
    +'<td width="54"><input type="image" src="'+sTbPath+'btn_ok36x20.gif" name=\'qs\' id=\'qs\' /></td>'
	+'<td width="3"><img src="'+sTbPath+'angl_d3x34.gif"/></td>'
  +'</tr>'
  +'<tr align="left" valign="middle">' 
    +'<td width="73" colspan="2" height="31"></td>'
    +'<td '+a_line2_width+' colspan="20">');
	if(userEmail=="") {
      document.write("<span class=\"a13b\" style=\"padding-left:13px;\">Bienvenue,&nbsp;</span><a href=\"http://webmail.aliceadsl.fr\" class=\"a13\" target=\"_top\"><ilayer id=tbEmailNS>consultez vos e-mails</ilayer></a>");
    } else {
      document.write("<span class=\"a13\" style=\"padding-left:13px;\"><a href=\"http://webmail.aliceadsl.fr\" class=\"a13\" target=\"_top\">" + unescape(userEmail) + " : <ilayer id=tbEmailNS>Consultez vos e-mails</ilayer></a></span><span class=\"a10\">&nbsp;&nbsp;[ <span class=\"x\">x</span> <a href='http://www.aliceadsl.fr/webmail/login.asp?mod=y' class=\"a10\" target=\"_top\">Changer d\'utilisateur</a> ]</span>");
    }
	document.write('</td>'
  +'</tr>'
  +'</form>'
+'</table>'
+'</div>');

function getQueryVariable(v) 
{
  var vs = window.location.search.substring(1).split("&");
  for (var i=0;i<vs.length;i++) 
  {
    var p = vs[i].split("=");
    if (p[0] == v)
      return unescape(p[1]);
  } 
  return '';
}
try
{
	document.getElementById('qs').value = getQueryVariable('qs');
	var sel = getQueryVariable('lr');
	switch(sel){ case 'fr':sel=1;break;case 'countryFR':sel=2;break;default:sel=0; }
	document.getElementById('frmTB_Opt').selectedIndex = sel;
}
catch (e){}