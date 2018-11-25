var rankingJS = {
  init: function() {
      
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
    
    $(".action_Menu").on("click", function() {
	    var i = 1;
	    while(i <= 10){
			$("#name-"+i).empty();
			$("#score-"+i).empty();
			i++;
		}
	    if ($(this).text() == "LEVEL1")
			rankingJS.get_data("https://becc90ee.ngrok.io/practice/get_score.php")
		else if ($(this).text() == "LEVEL2")
			rankingJS.get_data("https://becc90ee.ngrok.io/practice/get_score2.php")
		else if ($(this).text() == "LEVEL3")
			rankingJS.get_data("https://becc90ee.ngrok.io/practice/get_score3.php")
    });
  },
  
  get_data: function(url) {
	  $.ajax({
		type: 'GET',
		dataType: 'json',
		url: url,
		success: function(data){
			var i = 1;
	
			while(i <= 10){
				$("#name-"+i).html(data[i-1]['username']);
				$("#score-"+i).html(data[i-1]['score']);
				i++;
			}
	 	}
	});
  }
};

rankingJS.init();
