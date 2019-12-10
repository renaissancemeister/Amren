$(document).ready(function() {
  // load the ad columns
  $("#right")
    .html("Loading ...")
    .load("/_includes/right-ads.html");
  $("#left")
    .html("Loading ...")
    .load("/_includes/left-ads.html");
});
