/*temporary*/
var GamePiece;

function startGame() {
    GameArea.start();
    GamePiece = new component(30, 30, "red", 10, 120);
}

var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = GameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = GameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}

function updateGameArea() {
    GameArea.clear();
    GamePiece.speedX = 0;
    GamePiece.speedY = 0;    
    if (GameArea.key && GameArea.key == 37) {GamePiece.speedX = -1; }
    if (GameArea.key && GameArea.key == 39) {GamePiece.speedX = 1; }
    if (GameArea.key && GameArea.key == 38) {GamePiece.speedY = -1; }
    if (GameArea.key && GameArea.key == 40) {GamePiece.speedY = 1; }
    GamePiece.newPos();    
    GamePiece.update();
}

