var canvas = document.getElementById("myCanvas");
//alert(canvas.width);
var ctx = canvas.getContext("2d");
var x = 100;//canvas.width/2;
var y= 570;//canvas.height-30;
var dx = 2;
var dy= -2;
var slideX=100;
var brickRowCount = 9;
var brickColumnCount = 13;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 3;
var brickOffsetTop = 5;
var brickOffsetLeft = 5;
var score=0;
var life=3;
var total;
var brick_count=49;
var i;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//for ball movement....
var ctx1 = canvas.getContext("2d");
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx1.beginPath();
    ctx1.arc(x, y, 10, 0, Math.PI*2);
    ctx1.fillStyle = "#FF0000";
    ctx1.fill();
    ctx1.closePath();
}


function Sliding_Bar(){
	ctx1.beginPath();
    ctx1.rect(slideX, 570,200,14);
    ctx1.fillStyle = "#FF0000";
    ctx1.fill();
    ctx1.closePath();
}

//var r;

var bricks = [];	
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
function Bricks() {
	for(c=0; c<(brickColumnCount/2); c++) {
        for(r=0; r<=c; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                brick_count++;
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
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
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                brick_count++;
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
			 }
        }
		test--;
    }
}
 // alert(brick_count);  
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    brick_count =brick_count-1;
                    score=score+1;
                }
            }
			document.getElementById('score').value=score;
        }
    }
}

/*
function reDraw()
{
	for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
}*/

function draw() {
   ctx1.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    Sliding_Bar();
    Bricks();
    collisionDetection();
	//reDraw();
           if(x + dx > canvas.width-10 || x + dx < 10) 
           {
             dx = -dx;
           }

           if(y + dy < 10)
            {
              dy = -dy;
            } 
          else if(y + dy > canvas.height-60) //canvas.height - radius of the ball
           {
                    if(x > slideX && x < slideX + 200) //slideX + width of the slide bar
                    {
                    	//alert('on the slide bar');
                              if(y=y-14){
                     dy = -dy;}
                    }
                     else
                      {
                      	life--;
                      	console.log("life :"+life)
                      	document.getElementById('life').value=life;
                        var txt;
                        if(life<1){
                        if (confirm("Start a new game??") == true) {
                         document.location.reload();
                       }
                        else
                        {
                        	window.close();
                        }
                    }
                      
                      }
           }

           if(rightPressed && slideX < canvas.width-200) 
           {
            slideX += 7;
            }
          else if(leftPressed && slideX > 0) {
           slideX -= 7;
            }
			
			if(brick_count==49)
            {
			alert('here..');
         	for(c=0; c<brickColumnCount; c++) {
              bricks[c] = [];
             for(r=0; r<brickRowCount; r++) {
               bricks[c][r] = { x: 0, y: 0, status: 1 };
               }
             }
         	Bricks();
           }

    x += dx;
    y += dy;

}

setInterval(draw, 10);


