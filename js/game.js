var game = {
	block_destroy: false,
		
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
			var width = game.return_css_width($(this));
			
		    if (left >= 0 && left+width <= game.return_css_width($("#index-content"))){
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
	
	isPassable: function(block_touch, smileFace) {
		var left = block_touch.position().left;
		var width = game.return_css_width(block_touch);
		
		if (smileFace.position().left >= left && smileFace.position().left+game.return_css_width(smileFace) <= left+width)
			return true;
		else
			return false;
	},
	
	isPassThrough: function(smileFace, pos_incre) {
		var top = smileFace.position().top;
		var height = smileFace.height();
		var block_top = $("#game-block").position().top;
		var block_height = $("#game-block").height();
		var block_bottom = block_top+block_height;
// 		console.log(top, height, block_top, block_height, block_bottom);
		if (top+height < block_top)
			return true;
		else
			return false;
	},
	
	blockTouched: function(pos) {
		screen_width = game.return_css_width($("#index-content"));
	    if (pos <= screen_width/5)
	    	return $("#block_0");
	    else if (pos > screen_width/5 && pos <= screen_width/5*2)
	    	return $("#block_1");
		else if (pos > screen_width/5*2 && pos <= screen_width/5*3)
	    	return $("#block_2");
		else if (pos > screen_width/5*3 && pos <= screen_width/5*4)
	    	return $("#block_3");
		else if (pos > screen_width/5*4)
	    	return $("#block_4");
	},
	
	movingBlock: function() {
		var position = parseInt($("#game-block").css("top"));
		var smileFace = $("#game-smileFace");	
		if (!game.isSmileTouchBlock(smileFace)){
			setTimeout(function(){
				$("#game-block").css('top', position+=2);
				game.movingBlock();
			}, 5);
		}else{
			var blockTouched = game.blockTouched(smileFace.position().left + game.return_css_width(smileFace)/2);
			game.destroyBlock(blockTouched);
			
			//range
			if (game.isPassable(blockTouched, smileFace)){
				console.log("y");
				game.moveNonDestroyBlock();
			}else{
				console.log("n");
			}
			console.log(game.isPassThrough(smileFace, 2));
		}
	},
	
	destroyBlock: function(block_touch) {
		if (!game.block_destroy){
			block_touch.css("background", "white").animate({opacity: 1}, 500);
			game.block_destroy = true;
		}
	},
	
	moveNonDestroyBlock: function() {
		var position = parseInt($("#game-block").css("top"));
// 		console.log(position, $("#index-content").height());
		if (position <= $("#index-content").height()){
			setTimeout(function(){
				$("#game-block").css('top', position+=2);
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
	
	smilingFace: function() {
		$("#game-smileFace").append("<img src='img/smileFace.png'>");
		$("#game-smileFace").show();
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
	},
	
	return_css_width: function(obj){
		return parseFloat(obj.css("width").replace("px", ""));
	}
}

game.init();