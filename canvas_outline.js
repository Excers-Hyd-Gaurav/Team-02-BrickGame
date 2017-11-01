var canvas = document.getElementById("myCanvas");
//alert(canvas.width);
var ctx = canvas.getContext("2d");
var x = 100;//canvas.width/2;
var y= 450;//canvas.height-30;
var dx = 2;
var dy= -2;
var canvas_width=413;
var canvas_height=265;
var slideX=100;
var magic_status=0;
var timer=0;
var brickRowCount = 9;
var brickColumnCount = 13;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 3;
var brickOffsetTop = 5;
var brickOffsetLeft = 5;
var score=0;
var life_cnt=3;
var total;
var brick_count=98;
var rightPressed = false;
var leftPressed = false;
var pause=false;
var slide_bar_length=100;
var ball_radius=10;
var brick = document.getElementById("brick");
var img=document.getElementById("retry");
var color_brck=document.getElementById("color_brck");;
var texture = document.getElementById("texture");
var slide_bar=document.getElementById("slide_bar");
var play_again=document.getElementById("play_again");
var background = new Image();
background.src = "images/canvas_texture.png";
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//for ball movement....
var ctx1 = canvas.getContext("2d");
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;}
    else if(e.keyCode == 37) {
        leftPressed = true;}
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
	    else if(e.keyCode === 32) {
       pause = !pause;
    }
}

function drawBall() {
    ctx1.beginPath();
    ctx1.arc(x, y, 10, 0, Math.PI*2);
    ctx1.fillStyle = "#2F4F4F";
    ctx1.fill();
    ctx1.closePath();
}
function Sliding_Bar(){
	ctx1.drawImage(slide_bar,slideX,450,slide_bar_length,14);}

var bricks = [];	
var magic_bricks = [];
for(c=0; c<(brickColumnCount/2); c++) {
    bricks[c] = [];
    magic_bricks[c] = [] ;
    for(r=0; r<=c; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
         magic_bricks[c][r] = { x: 0, y: 0, status: 0 };
		 
    }
}
var test1=6;
for(c=6; c<=12; c++) {
		bricks[c] = [];
     magic_bricks[c] = [] ;
		for(r=test1; r>=0; r--) {
		 bricks[c][r] = { x: 0, y: 0, status: 1 };
      magic_bricks[c][r] = { x: 0, y: 0, status: 0 };
		}
		test1--;
}
function Bricks() {
	 /* for(r=0; r<brickRowCount; r++) {
	for(c=r; c<brickColumnCount-r; c++) {
       
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
				ctx.drawImage(brick,0,0,60,20,brickX, brickY,60,20);
            }
        } 
    }*/
	for(c=0; c<(brickColumnCount/2); c++) {
        for(r=0; r<=c; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
				ctx.drawImage(brick,0,0,60,20,brickX, brickY,60,20);
            }
        }
    }
	var test=6;
	for(c=6; c<=12; c++) {
        for(r=test; r>=0; r--) {
			 if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                 ctx.drawImage(brick,0,0,60,20,brickX, brickY,60,20);
			 }
        }
		test--;
    }
}
function collisionDetection() {
	  for(c=0; c<brickColumnCount/2; c++) {
	 for(r=0; r<=c; r++) {
            var b = bricks[c][r];
            var mb = magic_bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
					brick_count--;
                    score=score+1;
                }
            }

             if(mb.status==1){
               if(x > mb.x && x < mb.x+brickWidth && y > mb.y && y < mb.y+brickHeight){
                       dy = -dy;
                    mb.status = 0;
					brick_count--;
                        if(bricks[c-1][r].status!=null && bricks[c-1][r].status==1){
                        bricks[c-1][r].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                        if(bricks[c+1][r].status!=null && bricks[c+1][r].status==1){
                        bricks[c+1][r].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                        if(bricks[c][r-1].status!=null && bricks[c][r-1].status==1){
                        bricks[c][r-1].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                        if(bricks[c][r+1].status!=null && bricks[c][r+1].status==1){
                        bricks[c][r+1].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                         magic_status=0;
                }
            }
			document.getElementById('score').innerHTML=score;
        }
    }
	var test2=6;
	  for(c=6; c<=12; c++) {
        for(r=test2; r>=0; r--) {
            var b = bricks[c][r];
            var mb = magic_bricks[c][r];
            if(b.status == 1 ) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
					brick_count--;
                    score=score+1;
                }
            }
             if(mb.status==1){
               if(x > mb.x && x < mb.x+brickWidth && y > mb.y && y < mb.y+brickHeight){
                       dy = -dy;
                    mb.status = 0;
					brick_count--;
                        if(bricks[c-1][r].status!=null && bricks[c-1][r].status==1){
                        bricks[c-1][r].status=0;
						brick_count--;
                        score=score+1;          
                         } else{score=score+1; }
                        if(bricks[c+1][r].status!=null && bricks[c+1][r].status==1){
                        bricks[c+1][r].status=0;
						brick_count--;
                        score=score+1;}else{score=score+1; }
                        if(bricks[c][r-1].status!=null && bricks[c][r-1].status==1){
                        bricks[c][r-1].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                        if(bricks[c][r+1].status!=null && bricks[c][r+1].status==1){
                        bricks[c][r+1].status=0;
						brick_count--;
                        score=score+1;          
                         }else{score=score+1; }
                         magic_status=0;
						 
                }
            }
			document.getElementById('score').innerHTML=score;
        }
		test2--;
    }
}
function magic_Brick(){
  var magic_col=[];
  var magic_row=[0,1,2,3,4,5,6];
   if((score>=35 && score%35==0 && magic_status==0 ) || (timer>=60 && timer%60==0 &&  magic_status==0))
   {
		function getRndmFromSet(set){
			var rndm = Math.floor(Math.random() * set.length);
			return set[rndm];
	   }
	   var m_row=getRndmFromSet(magic_row);
	   for(var g=m_row;g<12-m_row;g++){
		magic_col.push(g);
	   }
	   var m_col=getRndmFromSet(magic_col);
	   magic_bricks[m_col][m_row].status=1;
	   if(bricks[m_col][m_row].status==0){
		brick_count++;}		
	   magic_status=1;
	   slide_bar_length=slide_bar_length+10;
   }
   
   /* for(r=0; r<brickRowCount; r++) {
   for(c=r; c<brickColumnCount-r; c++) {
       
            if(magic_bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                magic_bricks[c][r].x = brickX;
                magic_bricks[c][r].y = brickY;
				ctx1.drawImage(color_brck,brickX, brickY, brickWidth, brickHeight);
                }
        }
    }*/
 for(c=0; c<(brickColumnCount/2); c++) {
        for(r=0; r<=c; r++) {
            if(magic_bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                magic_bricks[c][r].x = brickX;
                magic_bricks[c][r].y = brickY;
				ctx1.drawImage(color_brck,brickX, brickY, brickWidth, brickHeight);
                }
        }
    }
    var test=6;
    for(c=6; c<=12; c++) {
        for(r=test; r>=0; r--) {
             if(magic_bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                magic_bricks[c][r].x = brickX;
                magic_bricks[c][r].y = brickY;
                ctx1.drawImage(color_brck,brickX, brickY, brickWidth, brickHeight);
             }
        }
        test--;
    }	
}
function draw() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.drawImage(background,0,0);    
    drawBall();
    Sliding_Bar();
    Bricks();
    collisionDetection();
	magic_Brick();
           if(x + dx > canvas.width-ball_radius || x + dx < ball_radius) {
             dx = -dx;
           }
           if(y + dy < ball_radius){
              dy = -dy;
            } 
          else if(y + dy > canvas.height-80){ //canvas.height - radius of the ball
                    if(x > slideX && x < slideX + slide_bar_length){ //slideX + width of the slide bar{
                     dy = -dy;					
                    }
                     else{
						life_cnt=life_cnt-1;
                 		document.getElementById('life').innerHTML=life_cnt;	
						 x = 105;
						 y= 450;
						 slideX=100; 
                      }				  
					  if(life_cnt==0){
						  var high_score=localStorage.getItem('high_score')
						  if(score>=high_score){
							  localStorage.setItem('high_score',score);
							  }
					       img.hidden=false;
							 clearInterval(to_draw);
							 
                        }
						document.getElementById('highest_score').innerHTML=localStorage.getItem('high_score');
		   }
           if(rightPressed && slideX < canvas.width-slide_bar_length){
            slideX += 7;}
          else if(leftPressed && slideX > 0) {
           slideX -= 7;}
			if(brick_count%49==0 && brick_count!=0){
				for(c=0; c<brickColumnCount; c++) {
					 bricks[c] = [];
					 for(r=0; r<brickRowCount; r++) {
					   bricks[c][r] = { x: 0, y: 0, status: 1 };
					 }
				}
				
				Bricks();
           }
		   else if(brick_count==0)
		   {
			 ctx1.beginPath();
			ctx1.font = "40px Comic Sans MS";
			ctx1.fillText("You Won!!", canvas_width-70, canvas_height);
			ctx1.closePath();  
			play_again.hidden=false;
			 var high_score=localStorage.getItem('high_score')
						  if(score>=high_score){
							  localStorage.setItem('high_score',score);
							  }
			  document.getElementById('highest_score').innerHTML=localStorage.getItem('high_score');
			  clearInterval(to_draw);
		   }
		  
		  console.log(brick_count); 
    x += dx;
    y += dy;

}

function gameAudio(){
	var x = document.getElementById('myAudio');
	x.play();
	//alert("music");
	
}
//gameAudio();
setInterval(function(){
  if(!pause)
  {gameAudio()}}, 230000);

setInterval(function(){
  if(!pause)
  {Mytimer()}}, 1000); 
function Mytimer()
{
  timer = timer+1;
} 

var to_draw=setInterval(function(){
	if(!pause)
	{draw()}}, 10);

function reload1(){
 location.reload();}
 
gameAudio();


