var location_path = "";
   location_path = document.location.hostname;
   if(typeof window.top.location != "undefined"){
    	try{
  			location_path = window.top.location.hostname;
  		}catch(e){}
   }
  location_path = location_path.replace("www.","");
	  
  var vhtml = '<iframe src="http://video.foxnews.com/v/video-embed.html?video_id=1200598457001&amp;w=466&amp;h=263{#LOC#}" width="466" height="263" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>';
  vhtml = vhtml.replace('{#LOC#}','&amp;loc='+location_path)
  if(document.domain.indexOf('rightscoop') < 0) { document.write(vhtml); }