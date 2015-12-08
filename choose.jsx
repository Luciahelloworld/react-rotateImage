


Choose = React.createClass({
	getInitialState:function(){
		{/*默认的参数*/}
		return {
			setting:{
				"width":1000, //幻灯片的宽度
				"height":270, //幻灯片的高度
				"posterWidth":640,  //幻灯片第一帧的宽度
				"posterHeight":270,  //幻灯片第一帧的高度
				"scale":0.9,
				"speed":500,
				"topValue":"",  //这个为可变参数
				"autoplay":"true",
				"delay":400,
				"verticalAlign":"middle"
			},
			itemStyle:{
				"width":"",
				"height":"",
				"zIndex":"",
				"opacity":"",
				"left":"",
				"top":""
			}
		}
	},
	
	componentWillMount:function(){
		{/*改变state的值必须要在render之前哦*/}
		{/*默认的配置参数*/}
		
		this.setState({
			setting:this.props.setting
		});

	},


	render:function(){
		return(
			<div className="poster-main" ref="posterMain" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
				<div className="poster-btn poster-prev-btn" ref="posterBtnPrev" onClick={this.handleLeft} ></div>
				<ul className="poster-list" ref="posterList" key="lists" >
					<li className="poster-item" ref="posterItem" key="list1" ><a href="#"><img src="sources/1.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list2" ><a href="#"><img src="sources/2.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list3" ><a href="#"><img src="sources/3.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list4" ><a href="#"><img src="sources/4.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list5" ><a href="#"><img src="sources/5.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list6" ><a href="#"><img src="sources/5.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list7" ><a href="#"><img src="sources/5.jpg" width="100%"/></a></li>
					<li className="poster-item" ref="posterItem" key="list8" ><a href="#"><img src="sources/5.jpg" width="100%"/></a></li>
				</ul>
				<div className="poster-btn poster-next-btn"  ref="posterBtnNext" onClick={this.handleRight}></div>
			</div>
		)
	},


	componentDidMount:function(){
		var posterList = this.refs.posterList;
		{/*图片的个数*/}
		var itemCount = posterList.children.length;

		{/*设置posterMain 的宽度，长度*/}
		posterMainStyle = this.refs.posterMain.style;
		posterMainStyle.width = this.state.setting.width.toString()+"px";
		posterMainStyle.height = this.state.setting.height.toString()+"px";

		{/*设置ul posterList的值*/}
		posterList.style.width = this.state.setting.width.toString()+"px";
		posterList.style.height = this.state.setting.height.toString()+"px"

		{/*设置两个按钮的style, ref的值是不一样的 */}
		var gap = (this.state.setting.width - this.state.setting.posterWidth)/2;
		alert(gap)
		this.refs.posterBtnPrev.style.width = gap.toString()+"px";
		this.refs.posterBtnPrev.style.height = (this.state.setting.height);
		this.refs.posterBtnPrev.style.zIndex = Math.ceil(itemCount/2);
		this.refs.posterBtnNext.style.width = gap.toString()+"px";
		this.refs.posterBtnNext.style.height = (this.state.setting.height);
		this.refs.posterBtnNext.style.zIndex = Math.ceil(itemCount/2);
		{/*设置第一张图片的style值*/}
		posterList.children[0].style.left = gap+"px";
		posterList.children[0].style.zIndex = Math.floor(itemCount/2);
		posterList.children[0].style.width = this.state.setting.posterWidth.toString()+"px";
		posterList.children[0].style.height = this.state.setting.posterHeight.toString()+"px";
		{/*计算层级关系*/}
		var rightLevel = Math.floor(itemCount/2);
		var leftLevel = Math.floor(itemCount/2);
		var leftOrder = Math.floor(itemCount/2);
		{/*左侧逆序输出设置层级*/}
		var leftzIndex = 0
		{/*计算两边每个层级的缝隙*/}
		rightGap = gap/rightLevel;
		leftGap = gap/leftLevel;
		{/*两边每一帧的透明度的大小*/}
		var rightOpacityNumber = 1;
		// var leftOpacityNumber = 1;
		
		{/*设置右面的帧*/}
		var rightOffsetWidth = this.state.setting.posterWidth+gap;

		for(number in posterList.children){
			
			if(!isNaN(number)){
				if(number > 0 && number <= Math.floor(itemCount/2)){
					var scale = this.state.setting.scale;
					var rightSpace = rightGap;
					var count = 1;
					while(count < number){
						scale*=scale;
						rightSpace += rightGap;
						count++;
					}
					alert(rightSpace)
					rightWidth = this.state.setting.posterWidth * scale;
					rightHeight = this.state.setting.posterHeight * scale;

					{/*设置右面帧top值*/}
					{this.setTopValue(rightHeight)}

					var style = posterList.children[number].style;
					style.zIndex = --rightLevel;
					style.height = rightHeight.toString()+"px";
					style.width = rightWidth.toString()+"px";
	
					style.opacity = 1/(rightOpacityNumber++);
					style.left = (rightSpace+rightOffsetWidth-rightWidth).toString()+"px";
					style.top = this.state.setting.topValue;
				}else if(number > 0){
					var transformNumber = leftOrder--;
					var scale = this.state.setting.scale;
					var leftSpace = leftGap;
					var count = 1;
					while(count < transformNumber){
						scale *= scale;
						leftSpace += leftGap;
						count++;
					}
					var leftWidth = this.state.setting.posterWidth*scale;
					var leftHeight = this.state.setting.posterHeight*scale;
					{/*设置左面帧的top值*/}
					{this.setTopValue(leftHeight)}
					var style = posterList.children[number].style;
					style.zIndex = leftzIndex++;
					style.height = leftHeight.toString()+"px";
					style.width = leftWidth.toString()+"px";
					style.opacity = number/(itemCount);
					style.left = (gap-leftSpace).toString()+"px";
					style.top = this.state.setting.topValue;
				}
			}
		}

		{/*设置是否自动播放*/}
		if(this.state.setting.autoplay === "true"){
			ID = setInterval(this.handleRight,this.state.setting.delay);
		}
		
	},



	setTopValue:function(heightValue){
		{/*判断top值的大小*/}
		var verticalAlign = this.state.setting.verticalAlign;
		var verticalTop = "";
		if(verticalAlign === "top"){
			verticalTop = 0+"px";
		}else if(verticalAlign === "middle"){
			verticalTop = (this.state.setting.height-heightValue)/2+"px";
		}else if(verticalAlign === "bottom"){
			verticalTop = (this.state.setting.height-heightValue)+"px";
		}else{
			verticalTop = (this.state.setting.height-heightValue)/2+"px";
		}
		this.state.setting.topValue = verticalTop;
	},

	handleRight:function(){
		var i = 0;
		var itemsLength = this.refs.posterList.children.length;
		var bufferArray = [];
		while(i < (itemsLength-1)){
			var item1Style = this.refs.posterList.children[i].style;
			/*这里有一个特别注意的是，变量指向的地址，直接用:
				var tempStyle = this.refs.posterList.children[i].style;
				tempStyle和item1Style指向的地址是一样的
			*/
			// var tempStyle = new Object();
			// tempStyle.zIndex = item1Style.zIndex;
			// tempStyle.width = item1Style.width;
			// tempStyle.height = item1Style.height;
			// tempStyle.opacity = item1Style.opacity;
			// tempStyle.left = item1Style.left;
			// tempStyle.top  = item1Style.top; 

			var item2Style = this.refs.posterList.children[i+1].style;
			{this.moveItem(item1Style,item2Style)}

			i++;

		}
	},

	handleLeft:function(){
		var i = 1;
		var itemsLength = this.refs.posterList.children.length;
		var bufferArray = [];
		while(--itemsLength > 0){
			var item1Style = this.refs.posterList.children[itemsLength].style;
			var item2Style = this.refs.posterList.children[itemsLength-1].style;

			{this.moveItem(item1Style,item2Style)};

		}
	},

	moveItem:function(item1,item2){
		this.state.itemStyle.zIndex = item1.zIndex;
		this.state.itemStyle.width = item1.width;
		this.state.itemStyle.height = item1.height;
		this.state.itemStyle.opacity = item1.opacity;
		this.state.itemStyle.left = item1.left;
		this.state.itemStyle.top  = item1.top;

		item1.zIndex = item2.zIndex;
		item1.width = item2.width;
		item1.height = item2.height;
		item1.opacity = item2.opacity;
		item1.left = item2.left;
		item1.top = item2.top;

		item2.zIndex = this.state.itemStyle.zIndex;
		item2.width = this.state.itemStyle.width;
		item2.height = this.state.itemStyle.height;
		item2.opacity = this.state.itemStyle.opacity;
		item2.left = this.state.itemStyle.left;
		item2.top = this.state.itemStyle.top;
	},

	mouseEnter:function(){
		if(this.state.setting.autoplay === "true"){
			clearInterval(ID);
		}
	},

	mouseLeave:function(){
		if(this.state.setting.autoplay === "true"){
			ID = setInterval(this.handleRight,this.state.setting.delay)
		}
	}

})



























