var rankingJS = {
  init: function() {
      $.ajax({
             type: 'GET',
             dataType: 'json',
             url: "http://localhost:8080/practice/get_score.php",
             success: function(data){
            
             console.log(data);
             for(var i=0; i<data.length; i++){
             output+=data[i]['username'] + ": " + data[i]['mark'];
             }
             $("#ranking-content").html(output);
             }});
      
    $("#ranking-back").on("click", function(){
      $("#index-loading").show().animate({opacity:1}, 300, function(){
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
            console.log("Error when loading about.html");
          }
        });
      });
    });

  }
};

rankingJS.init();
