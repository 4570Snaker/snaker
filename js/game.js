var game = {		
	block_Touched: null,
	
	block_destroy: false,
	
	passingState: false,
	
	position_check: 0,
		
	block: [
		{"color": "black"},
		{"color": "blue"},
		{"color": "grey"},
		{"color": "red"},
		{"color": "green"}
	],
	
	init: function(){
		//set 3 second to start game
		game.smilingFace();

		setTimeout(function(){
			game.ready();
		}, 1000);
/*
		$("#game-ready").hide();
		$("#game-gen-block div").show().animate({opacity: 1}, 1000);
*/
		
		setTimeout(function(){
			game.showNextBlock();
			game.movingBlock();
			game.setupHandler();
			game.runTimer();
		}, 3000);
	
	},
	
	setupHandler: function() {
		$("#game-smileFace").on("touchstart", function(e){
			e.preventDefault();
			$(this).css({"z-index":300});
			$(this).attr("left", $(this).position().left);

			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]; 
			$(this).attr("pageX", touch.pageX);
		});
		
	    $("#game-smileFace").on("touchmove", function(e){
		    e.preventDefault();
		    
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var offSetPageX = touch.pageX - parseFloat($(this).attr("pageX"));
			var left = parseFloat($(this).attr("left")) + offSetPageX;
			var width = game.return_css_width($(this));
			
			if (game.passingState){
				var b_left = game.block_Touched.position().left;
				var b_width = game.block_Touched.width();
				if (left >= game.block_Touched.position().left && left+width <= b_left+b_width)
					$(this).css({"left":left+"px"});
			}else{
				if (left >= 0 && left+width <= game.return_css_width($("#index-content")))
					$(this).css({"left":left+"px"});
			}	
		});
		
	},
	
	isSmileTouchBlock: function(smileFace) {
		var top = smileFace.position().top;
	    var block_bottom = $("#game-block").position().top+$("#game-block").height();
// 	    console.log(top, block_bottom);
	    if (top >= block_bottom){
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
	
	isPassing: function(blocks, smileFace) {
		var top = blocks.position().top;
		var height = blocks.height();
		if (top+height >= smileFace.position().top){
			if (top > smileFace.position().top + smileFace.height())
				game.passingState = false;
			else
				game.passingState = true;
		}
		else
			game.passingState = false;
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
		var smileFace = $("#game-smileFace");
		var blocks = $("#game-block");
		var position = parseInt(blocks.css("top"));
// 		console.log(position+blocks.height(), smileFace.position().top);
		if (position+blocks.height() < smileFace.position().top){
// 			blocks.css("top", position+=(smileFace.position().top-blocks.height())/10);
			blocks.css("top", position+=5);
			setTimeout(function() {
				game.movingBlock();
			}, 20);
			game.position_check = position;
		}else{
			game.destroyBlock(smileFace);
			blocks.attr('id', 'game-block');
			var blocks_des = $("#game-block");
			var position_des = parseInt(blocks_des.css("top"));
			game.isPassing(blocks_des, smileFace);
			if (position_des <= game.return_css_height($("#index-content"))){
// 				console.log(position_des);
				if (!game.isPassable(game.block_Touched, smileFace) && position_des == game.position_check){
					setTimeout(function() {
						game.movingBlock();
					}, 20);
				}else{
					blocks.css("top", position_des+=5);
					setTimeout(function() {
						game.movingBlock();
					}, 20);
				}
			}else{
				game.showNextBlock();
				game.movingBlock();
			}
		}
	},
	
	destroyBlock: function(smileFace) {
		if (!game.block_destroy){
			game.block_Touched = game.blockTouched(smileFace.position().left + game.return_css_width(smileFace)/2);
			game.block_Touched.fadeOut(1000, function() {
				game.block_Touched.fadeIn();
				game.block_Touched.css("background", "white");
			});
			
			game.block_destroy = true;

		}
	},
	
	moveNonDestroyBlock: function() {
		var blocks = $("#game-block");
		var position = blocks.position().top;
		if (position <= $("#index-content").height()){
			blocks.animate({top: position+=50, avoidTransforms:true}, 200, "linear");
			setTimeout(function() {
				game.moveNonDestroyBlock();
			}, 200);
		}else{
			blocks.remove();
			game.showNextBlock();
			game.movingBlock();	
		}
	},
	
	showNextBlock: function() {
		$("#game-gen-block").prepend("<div id='game-block'></div>");
		$("#game-block").css("top", 0);
		game.block_destroy = false;
		game.shuffleColor();
		var i = 0;
		while (i < 5){
			$("#game-block").append("<div id='block_"+i+"'>"+game.block[i].color+"</div>");
			$('#block_'+i).css('background', game.block[i].color);
			i++;
		}
		$("#game-block").show();
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
	
	runTimer: function() {
		var currentTime = $("#game-time").html();
		currentTime++;
		$("#game-time").html(currentTime);
		setTimeout(function(){
	        game.runTimer();
	    }, 1000);
	},
	
	return_css_width: function(obj){
		return obj.width();
	},
	
	return_css_height: function(obj){
		return obj.height();
	},
}

game.init();