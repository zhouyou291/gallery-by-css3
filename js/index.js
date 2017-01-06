window.onload=function(){
	

}

function reversal(eleObj){
	var eleclass=eleObj.className;
	var flag=/photo-front/.test(eleclass);

	if(flag)
	{
		//eleclass=eleclass.replace(/photo-front/,"photo-back");
		eleObj.className="photo-wrap photo-back";
	}
	else
	{
		//eleclass=eleclass.replace(/photo-back/,"photo-front");
		eleObj.className="photo-wrap photo-front";
	}

	//eleObj.className=eleclass;



}