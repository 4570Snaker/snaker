var game = {
	init: function(){
		setTimeout(function(){
			game.ready();
		}, 1000);
		game.showNextBlock();
	},
	
	showNextBlock: function() {
		var i = 1;
		while (i <= 5){
			$("#game-block").append("<img id='block"+i+"'src='img/blocks/block.png' />");
			i++;
		}
	},
	
	ready: function(){
		var readycount = $("#ready-count").html();
		if (readycount>1){
			readycount--;
			$("#ready-count").html(readycount);
			setTimeout(function(){
				game.ready();
			}, 1000);
		}else{
			$("#game-ready").hide();
			$("#game-console").show().animate({opacity: 1}, 1000);
		}
	}
}

game.init();