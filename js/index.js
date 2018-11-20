$(function(){
  document.addEventListener("deviceready", function(){
    console.log("Device is ready now.");
    app.init();
  });
});

var app = {
  init: function() {
    $.ajax({
      type: "get",
      url: "title.html",
      success: function(data){
        $("#index-content").html(data);
        $("#index-loading").animate({opacity:0}, 300, function(){
          $("#index-loading").hide();
        });
      },
      error: function(){
        console.log("Error when loading title.html");
      }
    }); 
  }
};