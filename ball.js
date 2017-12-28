var stage = new createjs.Stage("canvas");
createjs.Ticker.on("tick", tick);
createjs.Ticker.framerate = 60;

var c0, c1, c2, c3;

function init(){
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    c0 = new Circle(50, 100);
    c1 = new Circle(200, 500);
    c2 = new Circle(10, 300);
    c3 = new Circle(40, 700);
    c3.set_y(200);
    c3.set_x(800);
}

function Circle(size, position){
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, size);
    this.circle.x = this.circle.y = position;
    
    this.wall = false;
    this.ground = false;
    
    this.set_x = function (value){
        this.circle.x = value;
        update();
    }
    this.set_y = function (value){
        this.circle.y = value;
        update();
    }
    
    this.set_color = function (value){
        this.graphics.beginFill(value);
    }
    
    this.move = function(x, y){
        motion(this.circle, x, y);
    }
    
    add_object(this.circle);
}

function add_object(object){
    stage.addChild(object);
    update();
}

function motion(object, x, y){
    if(x < 0){object.wall = true; x = x*-1;}
    if(y < 0){object.ground = true; y = y*-1;}
    
    if(object.x >= stage.canvas.width){
        object.wall = true;
    }
    else if(object.x <= 0){
        object.wall = false;
    }
    
    if(object.y >= stage.canvas.height){
        object.ground = true;
    }
    else if(object.y <= 0){
        object.ground = false;
    }
        
    if(object.wall){
        object.x -= x;
    }
    else{
        object.x += x;
    }
    if(object.ground){
        object.y -= y;
    }
    else{
        object.y += y;
    }
}

function update(){
    stage.update();
}

function tick(){
    c0.move(4, 5);
    c1.move(3, 2);
    c2.move(2, 10);
    c3.move(8, 4);
    update();
}