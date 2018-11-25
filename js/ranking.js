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
		if ($(this).text() == "LEVEL1")
			rankingJS.get_data("https://becc90ee.ngrok.io/practice/get_score1.php")
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
		console.log(data);
		$("#name-1").html(data[0]['username']);
		$("#score-1").html(data[0]['score']);
		$("#name-2").html(data[1]['username']);
		$("#score-2").html(data[1]['score']);
		$("#name-3").html(data[2]['username']);
		$("#score-3").html(data[2]['score']);
		$("#name-4").html(data[3]['username']);
		$("#score-4").html(data[3]['score']);
		$("#name-5").html(data[4]['username']);
		$("#score-5").html(data[4]['score']);
		$("#name-6").html(data[5]['username']);
		$("#score-6").html(data[5]['score']);
		$("#name-7").html(data[6]['username']);
		$("#score-7").html(data[6]['score']);
		$("#name-8").html(data[7]['username']);
		$("#score-8").html(data[7]['score']);
		$("#name-9").html(data[8]['username']);
		$("#score-9").html(data[8]['score']);
		$("#name-10").html(data[9]['username']);
		$("#score-10").html(data[9]['score']);
    }});
  }
};

rankingJS.init();
