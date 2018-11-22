var title = {
	level: [
		{"id": "1"},
		{"id": "2"},
		{"id": "3"}
	],
	
	init: function() {
		title.showlevel();
		$("#title-start_button").on("click", function(){
			$("#index-loading").show().animate({opacity:1}, 300, function(){
				var level = title.choose_level();
				$.ajax({
					type: "get",
					url: "game.html",
					success: function(data){
					    	$("#index-content").html(data);
					    	$("#level").html(level);
							$("#index-loading").animate({opacity:0}, 300, function(){
							$("#index-loading").hide();
				    	});
					},
				  	error: function(){
				    	console.log("Error when loading game.html");
					}
				});
			});
		});
	
		$("#title-ranking_button").on("click", function(){
			$("#index-loading").show().animate({opacity:1}, 300, function(){
				$.ajax({
					type: "get",
					url: "ranking.html",
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
	
		$("#title-about_button").on("click", function(){
	    	$("#index-loading").show().animate({opacity:1}, 300, function(){
	    		$.ajax({
					type: "get",
					url: "about.html",
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
	
	},
	
	showlevel: function() {
		$("#title-level_chooser").on("click", function(){
			var level = $("#title-level_chooser div").html();
			if (level.substr(6)<title.level.length){
				$("#title-level_chooser div").html("LEVEL "+(parseInt(level.substr(6))+1));
			}else{
				$("#title-level_chooser div").html("LEVEL 1");
			}
		});
	},
	
	choose_level: function() {
		return $("#title-level_chooser div").html().substr(6);
	}
};

title.init();