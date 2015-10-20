window.onload=function(){
	var container=document.getElementsByClassName('container')[0],
	    list=document.getElementById('list'),
		button=document.getElementById('button').getElementsByTagName('span'),
		leftArrow=document.getElementById('left'),
		rightArrow=document.getElementById('right');
		index=0,
	    len=button.length,
	    time=300,
	    interval=30,
	    animated=false,
	    timer=null;

	leftArrow.onclick=function(){
		if(!animated)
			animate(-600);
		index++;
		if(index>4)
			index=0;
		showbutton();
	}
	rightArrow.onclick=function(){
		if(!animated)
			animate(600);
		index--;
		if(index<0)
			index=4;
		showbutton();
	}

	for(var i=0;i<len;i++){
		button[i].onclick=function(){
			var nowIndex=this.getAttribute('index');
			var dif=nowIndex-index;
			if(!animated)
				animate(-dif*600);
			index=nowIndex;
			showbutton();
		}
	}

	container.onmouseover=stop;
	container.onmouseout=autoplay;
	autoplay(); //如果没有这句，需手动触发一次
	
	function animate(offset){
	    var left=parseInt(list.style.left)+offset;
	    	speed=offset/(time/interval);
		function go(){
			 if ( parseInt(list.style.left) < left || parseInt(list.style.left) > left) {
                        animated=true;
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, 30);
             }
             else{
             	if(left<-2400)
					left=0;
				else if (left>0) 
					left=-2400;
				animated=false;
				list.style.left=left+'px';
             }
		}
		go();
	}
	
	function showbutton(){
		for(var i=0;i<len;i++){
			if(button[i].className=='on'){
				button[i].className='';
				break;
			}
		}
		button[index].className='on';
	}
	
	function autoplay(){
		timer=setInterval(leftArrow.onclick,3000);
	}

	function stop(){
		clearInterval(timer);
	}
}