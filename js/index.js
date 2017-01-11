// 电影海报数据
var datas=[
{img:"1 指环王1.jpg",caption:"指环王1",desc:"指环王1电影描述"},
{img:"2 钢铁侠3.jpg",caption:"钢铁侠3",desc:"钢铁侠3电影描述"},
{img:"3 叶问.jpg",caption:"叶问",desc:"叶问电影描述"},
{img:"4 飞行员.jpg",caption:"飞行员",desc:"飞行员电影描述"},
{img:"5 魔幻城堡.jpg",caption:"魔幻城堡",desc:"魔幻城堡电影描述"},
{img:"6 云图.jpg",caption:"云图",desc:"云图电影描述"},
{img:"7 黑暗降临.jpg",caption:"黑暗降临",desc:"黑暗降临电影描述"},
{img:"8 杀手联盟.jpg",caption:"杀手联盟",desc:"杀手联盟电影描述"},
{img:"9 死亡飞车.jpg",caption:"死亡飞车",desc:"死亡飞车电影描述"},
{img:"10 罗马假日.jpg",caption:"罗马假日",desc:"罗马假日电影描述"},
{img:"11 夺宝奇兵.jpg",caption:"夺宝奇兵",desc:"夺宝奇兵电影描述"},
{img:"12 史前巨兽.jpg",caption:"史前巨兽",desc:"史前巨兽电影描述"},
{img:"13 神话.jpg",caption:"神话",desc:"神话电影描述"},
{img:"14 关云长.jpg",caption:"关云长",desc:"关云长电影描述"},
{img:"15 飞越老人院.jpg",caption:"飞越老人院",desc:"飞越老人院电影描述"},
{img:"16 帝国崛起.jpg",caption:"帝国崛起",desc:"帝国崛起电影描述"},
{img:"17 南京.jpg",caption:"南京",desc:"南京电影描述"},
{img:"18 速度与激情.jpg",caption:"速度与激情",desc:"速度与激情电影描述"},
{img:"19 别有动机.jpg",caption:"别有动机",desc:"别有动机电影描述"},
{img:"20 马达加斯加.jpg",caption:"马达加斯加",desc:"马达加斯加电影描述"},
];

// 屏幕左边的海报范围


window.onload=function(){
	addPhotos();
	rsort();

	
}



// 通用函数，获取元素对象
function g(n){
	if(n.substr(0,1)==".")
	{
		return document.getElementsByClassName(n.substr(1));
	}
	else
	{
		return document.getElementById(n);
	}
}

// 通用函数，获取区间范围里的随机数range[min,max]
function random(range){
	var max=Math.max(range[0],range[1]);
	var min=Math.min(range[0],range[1]);

	var diff=max-min;

	var number=Math.floor(Math.random()*(diff+1)+min);

	return number;
}

function range(){

	// 公共的宽和高
	var stageW=g("stage").clientWidth;
	var stageH=g("stage").clientHeight;
	var halfStageW=stageW/2;
	var halfStageH=stageH/2;

	var photoW=g("photo_0").clientWidth;
	var photoH=g("photo_0").clientHeight;
	var halfPhotoW=photoW/2;
	var halfPhotoH=photoH/2;

	// 屏幕左边区域范围
	// var sectionLeft={x:[-halfPhotoW,halfStageW-halfPhotoW*3],
	// y:[-halfPhotoH,stageH-halfPhotoH]};
	// 屏幕右边区域范围
	// var sectionRight={x:[halfStageW+halfPhotoW,stageW-halfPhotoW],
	// y:[-halfPhotoH,stageH-halfPhotoH]};

	var section={sectionLeft:{x:[-halfPhotoW,halfStageW-halfPhotoW*3],
	y:[-halfPhotoH,stageH-halfPhotoH]},sectionRight:{x:[halfStageW+halfPhotoW,stageW-halfPhotoW],
	y:[-halfPhotoH,stageH-halfPhotoH]}};

	return section;
}

// 海报翻转函数
function reversal(eleObj){
	var eleclass=eleObj.className;
	var flag=/photo-front/.test(eleclass);

	if(flag)
	{
		eleclass=eleclass.replace(/photo-front/,"photo-back");
		//eleObj.className="photo-wrap photo-back";
	}
	else
	{
		eleclass=eleclass.replace(/photo-back/,"photo-front");
		//eleObj.className="photo-wrap photo-front";
	}

	eleObj.className=eleclass;



}


// 海报内容输出
function addPhotos(){
	var photos=[];
	var navs=[];
	var temp=g("stage").innerHTML;
	for(i in datas)
	{
		var _html=temp.replace(/{{index}}/,i).replace(/{{img}}/,datas[i].img).replace(/{{caption}}/,datas[i].caption).replace(/{{desc}}/,datas[i].desc);
		
		photos.push(_html);

		navs.push('<li class="nav" id="nav_'+i+'" onclick="reversal(g(\'photo_'+i+'\'))"></li>');
	}
	
	g("stage").innerHTML=photos.join(" ");

	g("stage").innerHTML+='<ul class="navs">'+navs.join(" ")+'</ul>';
}

// 海报排序
function rsort(){
	var photos=[];
	var _photos=g(".photo");
	// 排序屏幕中间的海报
	for(var i=0;i<_photos.length;i++)
	{
		
		_photos[i].className=_photos[i].className.replace(/\s*photo-center\s*/," ");

		photos.push(_photos[i]);
	}

	var pcenter=random([0,19]);
	var photo_center=g("photo_"+pcenter);
	// 海报居中
	photo_center.className+=" photo-center";
	// 对应居中的导航条变大并且显示图标字体
	g("nav_"+pcenter).className+=" s"

	photo_center=photos.splice(pcenter,1)[0];

	var section=range();

	
	//排序屏幕左边的海报
	var leftNum=Math.ceil(photos.length/2);
	var leftDatas=photos.splice(0,leftNum);
	for(i in leftDatas)
	{
		leftDatas[i].style.left=random(section.sectionLeft.x)+"px";
		leftDatas[i].style.top=random(section.sectionLeft.y)+"px";
		leftDatas[i].style.transform="rotate("+random([-30,30])+"deg)";
	}
	// 排序屏幕右边的海报
	for(i in photos)
	{
		photos[i].style.left=random(section.sectionRight.x)+"px";
		photos[i].style.top=random(section.sectionRight.y)+"px";
		photos[i].style.transform="rotate("+random([-30,30])+"deg)";
	}

}