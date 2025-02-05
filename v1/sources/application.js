document.addEventListener("DOMContentLoaded", function(event){ 
	// Default Value
	energyNow = 500;// энергия сейчас
	energyMax = 500;// максимум энергии
	coinNow = 0; // коинов сейчас
	coinTick = 1;// коин за 1 клик
	boostRate = 10;// буст на 1 клик
	userName = '';// ник кликающего
	userRank = '';// ранг кликающего
	userParent = '';// ник того кто теб пригласил
	userFriends = [];//кого ты пригласил
	tapMuch = 0;//кол-во щлепков(всего)
	energyTikRec = 3;// восстановления энергии в секунду
	energyBoostTikRec = 2;// множитель восстановления энергии в секунду

	// Parametrs
	Telegram.WebApp.isExpanded = "true";
	assetPath = 'assets/';
	soursePath= 'sources/';	
	stickTap = "zhopa_ll2.png"; //tap sticker
	typeTap = 1; // type tap element: 0-button, 1-sticker
	timeOut = null;
	
	// Objects
	appBody = document.querySelector("body");		
	coinsValue = document.querySelector("#appCoinsVis");//pole kol-vo coins
	tapCounter = document.querySelector("#eCounter");//slot energy counter
	conNow = document.querySelector("#from");//energy now
	conMax = document.querySelector("#to");//energy max
	hpLineNow = document.querySelector("#hpLine");//progress bar
	
	// Events
	
	// Functions
	isPhone(); // проверка запуска с телефона?
	AppBuild(); //строим приложение	
	energyTap(); //вместо этого надо отслеждивать изменение в поле
	function AppBuild(){//построение приложения
		var isTap = document.querySelector('#appTapSection');		
		if(!isTap || isTap == null || isTap == undefined){
			/*alphaMove = document.querySelector("#alphaMove");
			if(!alphaMove){}else{				
				alphaMove.addEventListener('click', alphaAnimation);				
			}*/
		}else{
			appData();
			var appSection = document.querySelector('#appSection');
			var appWidth = Math.floor(window.innerWidth*80/100);	
			var appHeight = Math.floor(Telegram.WebApp.viewportStableHeight-4);	
			appSection.setAttribute("style","width:"+appWidth+"px;height:"+appHeight+"px;");		
			if(typeTap == 0){
				var tapElement = "<button id='appTapButton' class='rButton -MidBlock -colrWhi'><div id='tapImg'></div></button>";
				isTap.insertAdjacentHTML('afterBegin', tapElement);
			}else{
				var tapElement = "<button id='appTapButton' class='rImages -MidBlock'><img id='' class='rImages -MidBlock' src='./"+assetPath+stickTap+"'></button>";
				isTap.insertAdjacentHTML('afterBegin', tapElement);
			}
			tapButton = document.querySelector("#appTapButton");//tap button
			tapButton.addEventListener('click', e => {tapButtonF(e);});		
			
			conNow.addEventListener('change', pipa);
			//if event chnge do --> energyTap();
			//if conFrom < energyMax do --> energyTap();
			function pipa(){
				console.log("pipa func");
			}
		}		
	}	
	function appData(){//просчеты данных при загрузке
		//получаем данные с сервера
		netData = []; //массив датнных пользователя c сервера
		if(netData.length > 0){
			var netRunData = netData; 
			AppBuildData(netRunData);
		}else{
			var netRunData = 0;
			AppBuildData(netRunData)
		}
	}
	function AppBuildData(o){
		builData = o;
		if(builData == 0){
			conNow.innerHTML = energyNow;
			conMax.innerHTML = energyMax;
		}else{
			conNow.innerHTML = builData[1];
			conMax.innerHTML = builData[2];
		}

		var conFrom = document.querySelector("#from");
		var conTNow = Number(conFrom.innerHTML);
		if(energyNow == energyMax){
			hpLineTemp = (Math.floor(window.innerWidth*80/100))-8; //длинна фулл полоски хп
			hpLineNow.setAttribute("style","width:"+hpLineTemp+"px;");
		}else{
			conTLoad = conTNow/energyMax*((Math.floor(window.innerWidth*80/100))-8);
			hpLineNow.setAttribute("style","width:"+conTLoad+"px;");
		}		
	}
	function tapButtonF(e){
		evCursor = e;
		coinsNow = coinsValue.innerHTML; //get value coins now
		addVal = coinTick*boostRate;
		coinsTemp = Number(coinsNow) + addVal;		
		coinsValue.innerHTML = coinsTemp;
		muchTap();
		//beep();
		slap(addVal, evCursor);		
	}
	function beep() {
        var snd = new Audio("./assets/slap.mp3");  
        snd.play();		
    }
	function slap(ek, evCursor) {     
		var imStick = ["smack.png", "slap.png"];
		var imMin = 1;
		var imMax = imStick.length;
		var xMin = 20;
		var xMax = Math.floor(window.innerWidth-153)
		var yMin = 40;
		var yMax = Math.floor(Telegram.WebApp.viewportStableHeight-330);		
		var coordX = getRandomNumber(xMin, xMax);
		var coordY = getRandomNumber(yMin, yMax);
		var rStick = getRandomNumber(imMin, imMax);		
		var pubStick = imStick[rStick-1];

		var sticker = "<div id='stikOuch' style='margin:"+coordY+"px "+coordX+"px;'><img src='./assets/"+pubStick+"' /></div>";
		appBody.insertAdjacentHTML('afterBegin', sticker);		
		setTimeout(stickHide, 100);
		addTemVal = ek;
		cursCordX = evCursor.pageX;
		cursCordY = evCursor.pageY - 50;

		alphaTempM = document.querySelector("#alphaSA");
		if(!alphaTempM){
			alphaVisual(cursCordX, cursCordY, addTemVal);
		}else{
			alphaTempM.remove();
			alphaVisual(cursCordX, cursCordY, addTemVal);
		}		
    }
	function alphaVisual(cursCordX, cursCordY, addTemVal){//
		var alcpha = "<div id='alphaSA' class='dhBlock -pussyText' style='font-size:32px;position:absolute;top:"+cursCordY+"px; left:"+cursCordX+"px;'> + "+addTemVal+"</div>";
		appBody.insertAdjacentHTML('beforeEnd', alcpha);		
		var alAL = document.querySelector("#alphaSA");		
		var rect = alAL.getBoundingClientRect();
		//console.log(rect.top, rect.right, rect.bottom, rect.left);
		var pos = rect.top;
		var dos = pos;				
		var iq = setInterval(function() {
		  animate1();
		  animate2();
		}, 5);
		function animate1(){
			var enFIc = (dos-100);
			if(pos > enFIc){
				pos--;
				alAL.style.top = pos + 'px';
			}else{			  
				clearInterval(iq);
				alAL.remove();
			}
		}		
		function animate2(){
			alAL.style.opacity = "0.5";
		}
	}
	function stickHide(){//hide sticker
		hideStick = document.querySelector("#stikOuch");
		hideStick.remove();
	}	
	function muchTap(){//корректировка и сохранение по таймеру кол-ва очков
		//просчет общего кол-ва тапов(брать из базы, если такую стату сохраняем)
		//почему бы и нет, и назвать кол-во щлепков.
		tapMuch = 0;
		var conFrom = document.querySelector("#from");
		var conTNow = Number(conFrom.innerHTML);
		tempEnergyNow = conTNow - coinTick;		
		conFrom.innerHTML = tempEnergyNow;

		conTChange = conTNow/energyMax*((Math.floor(window.innerWidth*80/100))-8); 
		hpLineNow.setAttribute("style","width:"+conTChange+"px;");			
	}
	function energyTap(){//кол-во энергии тапать, бусты на энергию и постепенное восстановление энергии
		//timeOut
		console.log('here');
		//clearTimeout(timeOut);
		timeOut = setInterval(function(){
			enUiMax = document.querySelector("#to");
			eTempMax = enUiMax.innerHTML;
			enUiNow = document.querySelector("#from");
			eTempNow = enUiNow.innerHTML;	
			console.log(eTempMax+' / '+eTempNow); //499 / 500
			if(Number(eTempNow) < Number(eTempMax)){
				console.log("Enter to loss");				
				eTempNow = Number(eTempNow) + energyTikRec*energyBoostTikRec;				
				if(eTempNow > energyMax){
					eTempNow = energyMax;
					enUiNow.innerHTML = eTempNow;
					conUiChange = eTempNow/eTempMax*((Math.floor(window.innerWidth*80/100))-8);
					hpLineNow.setAttribute("style","width:"+conUiChange+"px;");
				}else{
					console.log("krasotka");
					eTempNow = eTempNow;
					enUiNow.innerHTML = eTempNow;
					conUiChange = eTempNow/eTempMax*((Math.floor(window.innerWidth*80/100))-8);
					hpLineNow.setAttribute("style","width:"+conUiChange+"px;");
				}
				
			}else if(Number(eTempNow) == Number(eTempMax)){
				clearInterval(timeOut); 
				console.log("end cikl");
			}else{
				clearInterval(timeOut); 
				console.log("otsos");
			}
		}, 5000);
	}
	function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;  
	}
	function isPhone(){//проверка запуска с телефона и инициализация телеги
		isPhone;
		userName //
		
		//Telegram.WebApp.initData; - получение строки вида:
		//query_id=xxxx-4QbxxxxxxBuFAEjT&user=%7B%22id%22%3Axxxxxxx%2C%22first_name%22%3A%22Anton%22%2C%22last_name%22%3A%22Titowets%22%2C%22username%22%3A%22xxxx%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1702715987&hash=986xxxx9aa131c473bd830de5e7670cf24df15c0781611043f65babd7b960
		
		//Telegram.WebApp.close() - закрытие шторки
		//Единая точка входа обработки событий - Telegram.WebApp.onEvent
	}

});