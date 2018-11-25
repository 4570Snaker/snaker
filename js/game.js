var game = {	
	state: true,
		
	block_Touched: null,
	
	block_destroy: false,
	
	passingState: false,
	
	position_check: 0,
	
	smileColor: null,
	
	blockTouchedAns: null,
	
	smileNumber: null,
	
	score_animation: 0,
	
	level: parseInt($("#index-level").text()),
	
	speed: 6,
	
	numberlist: [],
		
	blocks: [
		{"color": "blue"},
		{"color": "grey"},
		{"color": "red"},
		{"color": "green"},
		{"color": "lightblue"},
		{"color": "orange"},
		{"color": "pink"},
		{"color": "purple"},
		{"color": "yellow"},
		{"color": "brown"},
		{"color": "olive"},
		{"color": "lavender"}
	],
	
	init: function(){
		//set 3 second to start game
		if (game.level == 3)
			game.speed = 5;
		else if (game.level == 2)
			game.speed = 6;
		else
			game.speed = 7;
		setTimeout(function(){
			game.ready();
			game.initSmilingFace();
		}, 1000);
		setTimeout(function(){
			game.showNextBlock();
			game.movingBlock();
			game.setupHandler();
			game.runTimer();
		}, 3100);
	},
	
	setupHandler: function() {
		$("#game-smileFace, #game-numberFace").on("touchstart", function(e){
			e.preventDefault();
			$(this).css({"z-index":300});
			$(this).attr("left", $(this).position().left);

			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]; 
			$(this).attr("pageX", touch.pageX);
		});
		
	    $("#game-smileFace, #game-numberFace").on("touchmove", function(e){
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
		
		$("#game-smileFace").on("touchend", function(e) {
			e.preventDefault();
		});
		
		$("#game-back").on("click", function(){
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
	
	isMatching: function() {
		if (game.level == 3)
			var ans = game.smileNumber;
		else
			var ans = game.smileColor;
		if (ans == game.blockTouchedAns)
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
		if (game.level == 3)
			var smileFace = $("#game-numberFace");
		else 
			var smileFace = $("#game-smileFace");
		var blocks = $("#game-block");
		var position = parseInt(blocks.css("top"));
// 		console.log(position+blocks.height(), smileFace.position().top);
		if (position+blocks.height() < smileFace.position().top){
			blocks.css("top", position+=game.speed);
			setTimeout(function() {
				game.movingBlock();
			}, 20);
			game.position_check = position;
		}else{
			if (!game.block_destroy){
				game.block_Touched = game.blockTouched(smileFace.position().left + game.return_css_width(smileFace)/2);
				if (game.level == 3)
					game.blockTouchedAns = parseInt(game.block_Touched.html())%game.smileNumber+game.smileNumber;
				else
					game.blockTouchedAns = game.block_Touched.attr("data-color");
				if (game.isMatching()){
					game.destroyBlock(smileFace);
					game.block_destroy = true;
					game.score_animation = 50;
					game.movingBlock();
				}else{
					game.state = false;
					game.runTimer();
				}
			}else{	
			if (game.score_animation != 0){
				game.addScore();
				game.score_animation--;
			}
			//blocks moving	
			var blocks_des = $("#game-block");
			var position_des = parseInt(blocks_des.css("top"));
			game.isPassing(blocks_des, smileFace);
			if (position_des <= game.return_css_height($("#index-content"))){
				if (!game.isPassable(game.block_Touched, smileFace) && position_des == game.position_check){
					setTimeout(function() {
						game.movingBlock();
					}, 20);
				}else{
					blocks.css("top", position_des+=game.speed);
					setTimeout(function() {
						game.movingBlock();
					}, 20);
				}
			}else{
				$("#game-block").remove();
				game.showNextBlock();
				game.movingBlock();
			}			
			}	
		}
	},
	
	destroyBlock: function(smileFace) {
		game.block_Touched.fadeOut(1000, function() {
			game.block_Touched.css("opacity", 0);
			game.block_Touched.fadeIn(1000);
		});		
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
		if (game.level == 3){
			game.randNumberFace();
			game.randNumberAns();
		}	
		game.shuffle();
		var i = 0;
		while (i < 5){
			if (game.level == 3){
				$("#game-block").append("<div id='block_"+i+"' data-color='"+game.numberlist[i]+"'>"+game.numberlist[i]+"</div>");
			}else{
				$("#game-block").append("<div id='block_"+i+"' data-color='"+game.blocks[i].color+"'>"+game.blocks[i].color+"</div>");
			}
			
			if (game.level == 2){
				$('#block_'+i).css('background', game.blocks[i+5].color);
				$('#block_'+i).css('color', game.blocks[i].color);
				$('#block_'+i).css('text-shadow', "1px 1px 1px "+game.blocks[i].color);
			}else{
				$('#block_'+i).css('background', game.blocks[i].color);
			}
			i++;
		}
		if (game.level!=3)
			game.randSmilingFace(game.randomColor());
		$("#game-block").show();
	},
	
	randSmilingFace: function(randColor) {
		game.smileColor = randColor;
		$("#game-smileFace img").attr("src", "img/smile/smile"+randColor+".png");
	},
	
	randNumberFace: function(){
		var randomNumber = Math.round(Math.random()*8+2);
		game.smileNumber = randomNumber;
		$("#game-numberFace").html(randomNumber);
		$("#game-numberFace").show();
	},
	
	randNumberAns: function() {
		var i = 0;
		game.numberlist = [];
		while (i < 5){
			var num = Math.round(Math.random()*99+1);
			if (i==4 && num%game.smileNumber == 0){
				game.numberlist.push(num);
			}else if (i==4 && num%game.smileNumber != 0)
				i--;
			else{
				if (num%game.smileNumber == 0)
				i--;
				else{
					game.numberlist.push(num);
				}
			}	
			i++;
		}
	},
	
	initSmilingFace: function() {
		if (game.level != 3) {
			$("#game-smileFace").append("<img>");
			$("#game-smileFace").show();
		}	
	},
	
	randomColor: function() {
		return game.blocks[Math.round(Math.random()*4)].color;
	},
	
	shuffle: function() {
		if (game.level == 3)
			var list = game.numberlist;
		else
			var list = game.blocks;
		var currentIndex = list.length, temporaryValue, randomIndex;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;			
			temporaryValue = list[currentIndex];
			list[currentIndex] = list[randomIndex];
			list[randomIndex] = temporaryValue;
		}
	},
	
	ready: function(){
		var readycount = $("#ready-count").html();
// 			$("#index-content").css("background", "black");
		if (readycount>1){
			readycount--;
			$("#ready-count").html(readycount);
			setTimeout(function(){
				game.ready();
			}, 1000);
		}else{
			$("#game-ready").hide();
		}
	},
	
	addScore: function() {
		var currentScore = $("#game-score").html();
		currentScore++;
		$("#game-score").html(currentScore);	
	},
	
	runTimer: function() {
		if (game.state){
			var currentTime = $("#game-time").html();
			currentTime++;
			$("#game-time").html(currentTime);
			setTimeout(function(){
		        game.runTimer();
		    }, 1000);
		}else{
			var currentScore = $("#game-score").html()
			$("#game-message").html("YOUR SCORE: "+currentScore+"<br><form id='game-detail'><input id='name' type='text' name='name' value='Your Name' /></form>");
			$("#game-lose").show().animate({opacity:1}, 1000);
		}
	},
	
	return_css_width: function(obj){
		return obj.width();
	},
	
	return_css_height: function(obj){
		return obj.height();
	},
}

game.init();