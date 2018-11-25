var rankingJS = {
  init: function() {
      var data1;
      $.ajax({
             type: 'GET',
             dataType: 'json',
             url: "http://localhost:8080/practice/get_score.php",
             success: function(data){
             console.log(data);
             $("#name-1").html(data[0]['username']);
             $("#score-1").html(data[0]['score']);
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
