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
		$("#game-block").show().animate({opacity: 1}, 1000);
		
		game.showNextBlock();
// 		$("#game-block").css('top', 493);
		game.smilingFace();
		game.setupHandler();

/*
		setTimeout(function(){
			game.showNextBlock();
			game.movingBlock();
		}, 3000);
*/
	
	},
	
	setupHandler: function() {
		$("#game-smileFace").on("touchstart", function(e){
			e.preventDefault();
			$(this).css({"z-index":300});
// 			$(this).attr("top", $(this).position().top);
			$(this).attr("left", $(this).position().left);
			
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]; 
			$(this).attr("pageX", touch.pageX);
			game.movingBlock();
		});
		
	    $("#game-smileFace").on("touchmove", function(e){
		    e.preventDefault();
		    
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var offSetPageX = touch.pageX - parseFloat($(this).attr("pageX"));
			var left = parseFloat($(this).attr("left")) + offSetPageX;
// 			console.log(offSetPageX);
// 			game.blockTouched($(this), left);
		    if (left >= -160 && left <= 160){
				$(this).css({"left":left+"px"});
				
		    }
		});
	},
	
	isSmileTouchBlock: function(smileFace) {
		var top = smileFace.position().top;

// 	    console.log(top, left, width);
	    var block_bottom = $("#game-block").position().top+$("#game-block").height();
// 	    console.log(top, block_bottom);
	    
	    if (top > block_bottom){
		    return false;
	    }else{
		    return true;
	    }
	},
	
	blockTouched: function(smileFace, left) {
	    var width = smileFace.width();
	    var pos = left+width/2;
// 	    console.log(left, pos);
	    if (pos <= -85)
	    	return $("#block_0");
	    else if (pos > -85 && pos <= -10)
	    	return $("#block_1");
		else if (pos > -10 && pos <= 65)
	    	return $("#block_2");
		else if (pos > 65 && pos <= 140)
	    	return $("#block_3");
		else if (pos > 140)
	    	return $("#block_4");
	},
	
	smilingFace: function() {
		$("#game-smileFace").append("<img src='img/smileFace.png'>");
		$("#game-smileFace").show();
	},
	
	movingBlock: function() {
		var position = parseInt($("#game-block").css("top"));		
		if (!game.isSmileTouchBlock($("#game-smileFace"))){
			setTimeout(function(){
				$("#game-block").css('top', position+=3);
				game.movingBlock();
			}, 5);
		}else{
			game.destroyBlock();
// 			game.resetBlock();
			game.moveNonDestroyBlock();
		}
	},
	
	destroyBlock: function() {
		var block_touch = game.blockTouched($("#game-smileFace"), parseFloat($("#game-smileFace").css("left").replace("px", "")));
// 		console.log(block_touch);
		block_touch.css("background", "white").animate({opacity: 1}, 500);
	},
	
	moveNonDestroyBlock: function() {
		var position = parseInt($("#game-block").css("top"));
// 		console.log(position, $("#index-content").height());
		if (position <= $("#index-content").height()){
			setTimeout(function(){
				$("#game-block").css('top', position+=3);
				game.movingBlock();
			}, 5);
		}else{
			$("#game-block").empty();
			game.showNextBlock();
			game.movingBlock();
		}
	},
	
	showNextBlock: function() {
		$("#game-block").css("top", 0);
		game.shuffleColor();
		var i = 0;
		while (i < 5){
			$("#game-block").append("<div id='block_"+i+"'>"+game.block[i].color+"</div>");
			$('#block_'+i).css('background', game.block[i].color);
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