if (typeof zhgame !== "undefined") {
	const d = document;
	const page = document.location.href;	
	const tg = window.Telegram.WebApp;
	const appHeight = Math.floor(tg.viewportStableHeight-4);
	const appWidth = Math.floor(window.innerWidth);
	const podvalUrl = ['game.html','quests.html','market.html','social.html','settings.html'];       
	const podvalPic = ['1.png','4.png','3.png','5.png','2.png'];
    const podvalText = ['Game','Quests','Market','Social','Settings'];
	
	//Информация о профиле
	userName = '';// ник кликающего
	userRank = '';// ранг кликающего
	userParent = '';// ник того кто тебя пригласил
	userFriends = [];//кого ты пригласил
	tapMuch = 0;//кол-во щлепков(всего)
	energyTikRec = 1;// восстановления энергии в секунду
	energyBoostTikRec = 10;// множитель восстановления энергии в секунду
	
	//Параметры приложения
	appTitle = 'Zhopa Coin App';//Титул приложения
	assetPath = './assets/';//Папка ресурсов
	stickTap = 'gear.png'; //Стикер для клика
	slapSound = 'slap.mp3';//звук клика по стикеру	
	
	//Определение полей
	appBody = document.querySelector("body");// Тело	
	coinsValue = document.querySelector("#appCoinsVis");//поле кол-ва кликов
	tapCounter = document.querySelector("#eCounter");//Счетчик энергии
	conNow = document.querySelector("#from");//поле энергии сейчас
	conMax = document.querySelector("#to");//поле максимум энергии
	hpLineNow = document.querySelector("#hpLine");//прогресс бар

	//isPlatform();
	
	/*function isPlatform(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			tg.expand();
			isLoaded();				
		}else{
			blockApp = document.querySelector("#appSection");
			blockApp.innerHTML = '<div><img src="./assets/302.png"></div><div style="font-size:16px;">Desktop is boring Play on your mobile</div>';
		}
	}*//*
	tg.expand();
	isLoaded();
	function isLoaded(){
			tg.ready();	*/	
			buildApp();
			
			//energyTap();
	/*}*/
	function buildApp(){
		var appTitle = document.querySelector('title');
		appTitle.innerHTML = appTitle;
		
		console.log(appWidth+" / "+appHeight);
		appblockH = Math.floor(appHeight*20/100);		
		appblockF = Math.floor((appHeight*20/100)+20);
		appblockM = appHeight - (appblockH + appblockF);
		
		var appHead = d.querySelector('#sectorHead');if(appHead) appHead.setAttribute("style","height:"+appblockH+"px;");
		var appFoot = d.querySelector('#sectorFoot');if(appHead) appFoot.setAttribute("style","height:"+appblockF+"px;");
		var appMidd = d.querySelector('#sectorMidd');if(appHead) appMidd.setAttribute("style","height:"+appblockM+"px;");
		hBlockH = Math.floor(appblockH*25/100);		
		hBlockF = Math.floor(appblockH*25/100);
		hBlockM = appblockH - (hBlockH + hBlockF);
		
		var hSectorHead = d.querySelector('#appHeadVis');
		var hSectorMidd = d.querySelector('#appMiddVis');
		var hSectorFoot = d.querySelector('#appFootVis');	
		if(hSectorHead) hSectorHead.setAttribute("style","height:"+hBlockH+"px;width:100%;");
		if(hSectorMidd) hSectorMidd.setAttribute("style","height:"+hBlockM+"px;width:100%;");
		if(hSectorFoot) hSectorFoot.setAttribute("style","height:"+hBlockF+"px;width:100%;");
		
		var podvalBlock = d.querySelector('#butPodval');
		
		pagePars = page.split("/").pop();
		NpagePars = pagePars.substring(0, pagePars.length - 5);
		
	
        for(u = 0, ut = podvalUrl.length; u < ut; u++){            
        var pUrl = podvalUrl[u];
        var pImg = podvalPic[u];
        var pTxt = podvalText[u];
            if(pUrl == ''){
                var pImg = 'lock.png';
                if(podvalBlock) podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pImg+'" class="m_butt"></div></a><div class="-pussyText">'+pTxt+'</div></div>');
            }else if(pUrl == pagePars){
				if(podvalBlock) podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt -activ"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pImg+'" class="m_butt"></div></a><div class="-pussyText">'+pTxt+'</div></div>');
			}else{				
                if(podvalBlock) podvalBlock.insertAdjacentHTML('beforeEnd', '<div class="-butt"><a href="./'+pUrl+'"><div class="-buttIco rButton"><img src="./assets/icons/'+pImg+'" class="m_butt"></div></a><div class="-pussyText">'+pTxt+'</div></div>');			
            }						
        }
		
		switch(NpagePars){
			case podvalText[0].toLowerCase(): //game
				tapBuild();
				break;
			case podvalText[1].toLowerCase(): //quests				
				appMidd.insertAdjacentHTML('afterBegin', '<div class="menuTabs"><div class="podTabs"><div class="mTabs -active"><div>Days</div></div><div class="mTabs"><div>Global</div></div></div></div>');
				//<div class="mTabs"><div>Friends</div></div>
				break;
			case podvalText[2].toLowerCase(): //market
				appMidd.insertAdjacentHTML('beforeEnd', '');
				break;
			case podvalText[3].toLowerCase(): //Social				
				appMidd.insertAdjacentHTML('beforeEnd', '');
				break;
			case podvalText[4].toLowerCase(): //profile
				appMidd.insertAdjacentHTML('beforeEnd', '');
				break;
			default:
				if(appMidd) appMidd.insertAdjacentHTML('beforeEnd', pagePars);
				break;			
		}
		massTabs = document.querySelectorAll(".mTabs");
		myArray = [...massTabs];
		Array.from(massTabs, el => el.addEventListener('click', e => {tabsClick(e);}));
		function tabsClick(e){		
			tabsNow = e.target;
			tabsCont = tabsNow.classList.contains('mTabs');
			if(tabsCont == true){
				tTrue = tabsNow.classList.contains('-active');
				if(tTrue == true){}else{
					tabActive = document.querySelector(".-active");
					if(tabActive){
						tabActive.classList.remove('-active');
						tabsNow.classList.add('-active');
						panelTab = document.querySelectorAll(".panelT");
						var tempPerch = myArray.indexOf(tabsNow);					
						tempTab = panelTab[tempPerch];					
						panelActive = document.querySelector(".-visible");
						panelActive.classList.remove('-visible');
						var statusTab = tempTab.classList.contains('-visible');
						if(statusTab == false){
							tempTab.classList.toggle('-visible');						
						}
					}									
				}
			}else{
				getParentTabs = tabsNow.parentElement;
				tabsCont = getParentTabs.classList.contains('-active');
				if(tabsCont == true){}else{
					tabActive = document.querySelector(".-active");
					if(tabActive){
						tabActive.classList.remove('-active');
						getParentTabs.classList.add('-active');	
						panelTab = document.querySelectorAll(".panelT");										
						var tempPerch = myArray.indexOf(getParentTabs);					
						tempTab = panelTab[tempPerch];					
						panelActive = document.querySelector(".-visible");
						panelActive.classList.remove('-visible');
						var statusTab = tempTab.classList.contains('-visible');
						if(statusTab == false){
							tempTab.classList.toggle('-visible');						
						}
					}					
				}
			}
		}		
		function tapBuild(){
			var isTap = document.querySelector('#sectorMidd');		
			if(!isTap || isTap == null || isTap == undefined){			
			}else{
				isTap.insertAdjacentHTML('afterBegin', '<div id="appTapSection" class="appBlock -MidBlock" ></div>');
				tapSection = document.querySelector('#appTapSection');
				var tapElement = "<button id='appTapButton' class='rImages -MidBlock'><img id='' class='rImages -MidBlock' src='"+assetPath+stickTap+"'></button>";
				tapSection.insertAdjacentHTML('afterBegin', tapElement);				
				temtalert = document.querySelector("#testalert");
				if(temtalert){
					temtalert.addEventListener("click", e => {appEvents("slidePopup", this, "");});
					temtalert.addEventListener("touchstart", e => {appEvents("openPopup", this, "");});
				}
			}
		}
		function appEvents(eventType, eventInitial, eventData){ //события, инициатор, дата 
			if(!eventType) eventType = '';
			if(eventData === undefined) eventData = '';
			eventElement = eventInitial;
			if(eventType == 'openPopup'){
				//добавляемо окно которое будет выезжать снизу
				/*function showPopup() {*/
					Telegram.WebApp.showPopup({
						title: 'Title',
						message: 'Some message',
						buttons: [
							{id: 'link', type: 'default', text: 'Open ton.org'},
							{type: 'cancel'},
						]
					}, function(btn) {
						if (btn === 'link') {
							Telegram.WebApp.openLink('https://ton.org/');
						}
					});
				/*};*/
			}
			if(eventType == 'slidePopup'){
				alert("slide popup view");
			}
		}
	}

}