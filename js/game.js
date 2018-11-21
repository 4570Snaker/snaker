var game = {
	block: [
		{"color": "black"},
		{"color": "blue"},
		{"color": "grey"},
		{"color": "red"},
		{"color": "green"}
	],
	
	init: function(){
		//set 3 second to start game
/*
		setTimeout(function(){
			game.ready();
		}, 1000);
*/
		$("#game-ready").hide();
		$("#game-console").show().animate({opacity: 1}, 1000);
		game.showNextBlock();
		game.movingBlock();
/*
		setTimeout(function(){
			game.showNextBlock();
			game.movingBlock();
		}, 3000);
*/
	
	},
	
	movingBlock: function() {
		var timecount = $("#game-time").html();
		var position = parseInt($("#game-block").css("margin-top"));
		position+=2;
		console.log($("#game-block").offset().top , $("#index-content").outerHeight(true));
		if ($("#game-block").offset().top < $("#index-content").outerHeight()){
			setTimeout(function(){
				$("#game-block").css('margin-top', position);
				game.movingBlock();
			}, 5);
		}else{
			$("#game-block").css('margin-top', 0);
			game.movingBlock();
		}
	},
	
	showNextBlock: function() {
		game.shuffleColor();
		var i = 0;
		while (i < 5){
			$("#game-block").append("<div id='blcok_"+i+"'>"+game.block[i].color+"</div>");
			$('#blcok_'+i).css('background', game.block[i].color);
			i++;
		}
	},
	
	randomColor: function() {
		console.log(game.block[Math.round(Math.random()*4)].color);
	},
	
	shuffleColor: function() {
		var currentIndex = game.block.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;			
			temporaryValue = game.block[currentIndex];
			game.block[currentIndex] = game.block[randomIndex];
			game.block[randomIndex] = temporaryValue;
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