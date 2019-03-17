---
title: iScroll下拉刷新上拉加载（简洁易懂版本）
date: 2016-07-14
---
```
<!DOCTYPE html>
<html>

	<head>
		<meta charset='UTF-8'>
		<title></title>
		<style type='text/css'>
			* {
				margin: 0;
				padding: 0;
			}
			
			#container {
				height: 500px;
				overflow: hidden;
				position: relative;
				width: 600px;
				border: 1x solid #ccc;
				margin: 10px auto;
			}
			
			li {
				height: 100px;
				background: #fafafa;
				border-bottom: 1px solid #ccc;
			}
		</style>
	</head>

	<body>
		<div id='container'>
			<ul>
				<li id='pullDown' style='display:none'>下拉刷新</li>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
				<li>10</li>
				<li id='pullUp' style='display:none'>上拉加载</li>
			</ul>
		</div>
	</body>
	<script src='js/iscroll-probe-min.js' type='text/javascript' charset='utf-8'></script>
	<script type='text/javascript'>
		var _down = document.getElementById('pullDown');
		var _up = document.getElementById('pullUp');
		var _con = document.getElementById('container');

		var iScroll = new IScroll('#container', {
			mouseWheel: true,
			scrollbars: true,
			probeType: 3
		})

		iScroll.on('scroll', function() {
			if(this.y >= 50) {
				_down.style.display = 'block';
				return;
			} else if(this.y < 50 && this.y >= 0) {
				_down.style.display = 'none';
				return;
			}


			if(this.maxScrollY - this.y > 50) {
				//alert('上拉刷新');
				_up.style.display = 'block';
				return;
			} else if(this.maxScrollY - this.y > 0 && this.maxScrollY - this.y <50 ){
				_up.style.display = 'none'
				return;
			}
		})
		
		_con.onmouseup = function(){
			if(iScroll.y > 50 || iScroll.maxScrollY - iScroll.y >　50){
				setTimeout(function(){
					iScroll.refresh();
				},300)
			}
		}
	</script>

</html>
```
  