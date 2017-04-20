window.onload = function(){
	//创建canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var canvasW = window.innerWidth;
	var canvasH = window.innerHeight;
	canvas.width = canvasW;
	canvas.height = canvasH;
	document.body.appendChild(canvas);
	
	//循环产生小球
	var bubbles = [];
	var timer;
	
	var flag = true;
	btn.onclick = function(){
		isStart();
	}
	isStart();
	function isStart(){
		if(flag){
			init();
			bubbles = [];
			btn.textContent = "停止播放";
		}else{
			clearInterval(timer);
			ctx.clearRect(0,0,canvasW,canvasH)
			btn.textContent = "开始播放";
		}
		flag = !flag;
	}
	
	function init(){
		timer = setInterval(function(){
			loop();
			console.log(bubbles.length)
		},30)
	}
	
	function loop(){
		var bubble = new Bubble(canvasW*0.2,canvasH*0.8,getRandomColor());
		bubbles.push(bubble);
		
		ctx.clearRect(0,0,canvasW,canvasH);
		
		for(var i = 0;i < bubbles.length;i++){
			bubbles[i].draw();
			bubbles[i].move();
		}
	}
	
	//创建单个小球的对象
	function Bubble(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
		this.speedX = Math.random() * 8 -1;//水平方向上速度
		this.speedY = -15;//垂直方向上速度
		this.a = 0.2;//垂直方向上加速度
		this.draw = function(){//画出小球
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x,this.y,10,0,2*Math.PI,true);
			ctx.fill();
		}
		this.move = function(){//小球移动
			this.speedY += this.a;
			this.x += this.speedX;
			this.y += this.speedY;
			if(this.y > canvasH - 40){//判断清除内存
				bubbles.shift();
			}
		};
	}

	//随机颜色
	function getRandomColor(){
		return "rgba(" + parseInt(Math.random() * 255) + ","+parseInt(Math.random() * 255) + ","+parseInt(Math.random() * 255) + "," + "0.4)"
	}
}
