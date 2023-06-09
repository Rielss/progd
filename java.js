/*temporary*/
var myGamePiece;
var myBackground;

function startGame() {
    myGamePiece = new component(30, 30, "maleCharac/maleFront.gif", 200, 200, "image");
    myBackground = new component(656, 270, "others/pathwalk.png", 0, 0, "image")
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if ( type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.6;
    this.gravitySpeed = 0;
    this.jumpForce = -15;
    this.x = x;
    this.y = y;  
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
         ctx.fillStyle = color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.jump = function() {
        this.gravitySpeed = this.jumpForce;
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
} 
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key === 37) { // Left arrow key
        myGamePiece.speedX = -1;
    }
    if (myGameArea.key && myGameArea.key === 39) { // Right arrow key
        myGamePiece.speedX = 1;
    }
    if (myGameArea.key && myGameArea.key === 32) { // Spacebar for jump
        myGamePiece.jump();
    }
    myGamePiece.update();
}