var gameJS = {
  
  // questions
  items: [
    {"name":"apple"},
    {"name":"banana"},
    {"name":"blueberries"},
    {"name":"cherries"},
    {"name":"grapes"},
    {"name":"orange"},
    {"name":"peach"},
    {"name":"pear"},
    {"name":"raspberry"},
    {"name":"strawberry"},
    {"name":"tomato"},
    {"name":"watermelon"}
  ],
  

  // initialization
  init: function(){
    gameJS.setupHandler();
    gameJS.showNextQuestion();
    setTimeout(function(){
      gameJS.runTimer();
    }, 1000);
  },
  
  
  // handle events
  setupHandler: function(){
    
    // back button
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
    
    // begin touching an item
    $(".game-answer").on("touchstart", function(e){
      e.preventDefault(); // this is important! remember to add this to "consume" the event

      $(this).css({"z-index":600}); // set the z-index to 600
      
      $(this).attr("top", $(this).position().top); // store the current top position
      $(this).attr("left", $(this).position().left); // store the current left position
      
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]; // touch information
      $(this).attr("pageX", touch.pageX); // store "pageX" position
      $(this).attr("pageY", touch.pageY); // store "pageY" position
    });
    
    // dragging an item
    $(".game-answer").on("touchmove", function(e){
      e.preventDefault(); // this is important! remember to add this to "consume" the event
      
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]; // touch information
      var offSetPageX = touch.pageX - parseFloat($(this).attr("pageX"));
      var offSetPageY = touch.pageY - parseFloat($(this).attr("pageY"));
      
      var left = parseFloat($(this).attr("left")) + offSetPageX;
      var top = parseFloat($(this).attr("top")) + offSetPageY;
      
      $(this).css({"top":top+"px", "left":left+"px"});
      
      if(gameJS.isItemTouchedQuestionLabel($(this))){
        $("#game-question").css({"background":"#00FFFF"}); // change to aqua color
      }
      else{
        $("#game-question").css({"background":"#0072bc"}); // back to normal color
      }
    });

    // finish touching an item
    $(".game-answer").on("touchend", function(e){
      e.preventDefault(); // this is important! remember to add this to "consume" the event
      
      if(gameJS.isItemTouchedQuestionLabel($(this))){
        if($(this).attr("answer") == $("#game-question").html()){
          gameJS.addScore();
          $("#game-correct").show();
        }
        else{
          $("#game-incorrect").show();
        }

        setTimeout(function(){
          gameJS.showNextQuestion();
          $("#game-correct").hide();
          $("#game-incorrect").hide();
        }, 2000);
      }

      // reset everything to default
      var left = $(this).attr("left");
      var top = $(this).attr("top");
      $(this).css({"z-index":550, "top":top+"px", "left":left+"px"}); 
      $("#game-question").css({"background":"#0072bc"});
    });
  },
  
  // check if the item touched the question label
  isItemTouchedQuestionLabel: function(item){
    // get the item center 
    var top = item.position().top;
    var left = item.position().left;
    var width = item.width();
    var height = item.height();
    var centerX = left + width/2;
    var centerY = top + height/2;
    
    // get the question label coordinates
    var questionLabelTop = $("#game-question").position().top;
    var questionLabelLeft = $("#game-question").position().left;
    var questionLabelRight = $("#game-question").width() + questionLabelLeft;
    var questionLabelBottom = $("#game-question").height() + questionLabelTop;
    
    // check the item center touched the question label
    if(centerY > questionLabelTop && centerY < questionLabelBottom && centerX > questionLabelLeft && centerX < questionLabelRight){
      return true;
    }
    else{
      return false;
    }
  },
    
  // show next question
  showNextQuestion: function(){
    
    // generate a random number between 0 to 11 => set the answer 1
    var num1 = Math.floor(Math.random() * 12);
    $("#game-answer-one").attr("src", "img/items/"+gameJS.items[num1].name+".png");
    $("#game-answer-one").attr("answer", gameJS.items[num1].name);
    
    // generate a random number between 0 to 11 => set the answer 2
    var num2 = Math.floor(Math.random() * 12);
    while(num1 == num2){ // make sure num1 and num2 different 
      num2 = Math.floor(Math.random() * 12);
    }
    $("#game-answer-two").attr("src", "img/items/"+gameJS.items[num2].name+".png");
    $("#game-answer-two").attr("answer", gameJS.items[num2].name);
    
    // generate a random number between 0 to 1 => set the question
    var num3 = Math.floor(Math.random() * 2);
    if(num3 == 0){
      $("#game-question").html(gameJS.items[num1].name);
    }
    else{
      $("#game-question").html(gameJS.items[num2].name);
    }
  },
  
  
  // add the score
  addScore: function(){
    var currentScore = $("#game-score").html();
    currentScore++;
    $("#game-score").html(currentScore);
  },
  

  // the timer
  runTimer: function(){
    var currentTime = $("#game-time").html();
    if(currentTime >= 1){
      currentTime--;
      $("#game-time").html(currentTime);
      setTimeout(function(){
        gameJS.runTimer();
      }, 1000);
    }
    else{
      var currentScore = $("#game-score").html();
      $("#game-message").html("YOUR SCORE: "+currentScore);
      $("#game-timesup").show().animate({opacity:1}, 1000);
    }
  }
  
};

gameJS.init();
