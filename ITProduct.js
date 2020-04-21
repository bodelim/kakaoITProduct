function Itsearch(room){
			pdsearch= java.net.URLEncoder.encode(msg, "EUC-KR");
//키워드 인코딩
url= Jsoup.connect("https://review.cetizen.com/review.php?q=phone&just_one=&just_one_name=&just_one_pcat=&keyword_p="+pdsearch+"&p_data=3&p_split=&recnum=10").get();
//파싱할 주소
productdate=url.select("div[id^=product_list]").toString().replace(/<[^>]+>/g,"").split("출시일")[1].split("(")[0].replace(/ /g,"").replace(/\n/g,"").replace(/&nbsp/g,"").replace(/;/g,"").replace(/:/g,"");
//출시일
productname= Jsoup.connect("https://review.cetizen.com/review.php?q=phone&just_one=&just_one_name=&just_one_pcat=&keyword_p="+pdsearch+"&p_data=3&p_split=&recnum=10").get().select("div[id^=product_list]").toString().replace(/<[^>]+>/g,"");
productname= productname.split("리뷰")[0].replace(/ /g,"").replace(/\n/g,"");
//제품이름
productprice= url.toString().split("출고가 : ")[1].split(")")[0];
//출고가
productimg=url.select("img[src^=https://image.cetizen.com/CDN/review]").toString().split("\"")[1].split("\"")[0];
//제품사진

json = {"link_ver":"4.0","template_id":22455,"template_args":{title:"",des:"출시일: "+productdate+"\n출고가격: "+productprice,pfimg:"http://bodle.dothome.co.kr/%ED%9E%9B.jpg",image:productimg,profile:productname}}
return Kakao.send(room, json, "custom")
}

			if(msg.indexOf("/it ")==0){
				try{
				msg=msg.replace("/it ","");
				Itsearch(room)
				}catch(e){
					replier.reply("요청하신 제품이 존재하지 않거나 오류가 발생하였습니다.")
					}
				}
