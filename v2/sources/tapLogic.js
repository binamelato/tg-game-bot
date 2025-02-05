document.addEventListener("DOMContentLoaded", function(event){
	const d = document;
	const page = document.location.href;	
	const tg = window.Telegram.WebApp;	
	firstRun = 0;	
	reply = [
		"Hello sweety. ",
		"Before we continue, tell me how I should address you? ",
		"I'm glad, ",
		"Give me a chanse ",
		"I was very bad today, ",
		"I'll definitely remember this, ",
		"We haven't been introduced to each other yet, but I promise to be an obedient girl. ",
		"Just please be gentle with me. "
	];//<text class='-bred'>"+nameBoss+"</text>
	
	scenario();

	function scenario(){
		dataOpt("get",firstRun);
		scene0();
	}

	function scene0(){
		var nulPanel = document.querySelector("#appSection");
		if(!nulPanel){
			if(firstRun == 0){			
				var preloadBlock = document.querySelector("#viewport");
				preloadBlock.insertAdjacentHTML('beforeEnd', '<div class="-preDialogPanel"><div class="-preDialogForm"><div class="-preTextDialog"><span id="-talkText">'+reply[0]+reply[6]+'</span></div><div class="-preButtonForm"></div></div></div>');			
				var prefuncBlock = preloadBlock.querySelector(".-preButtonForm");
				prefuncBlock.insertAdjacentHTML('beforeEnd', '<input type="button" value="Continue" class="sisiBtn">');
				var arrows = document.querySelectorAll('.sisiBtn');	
				Array.from(arrows, el => el.addEventListener('click', e => {
					var dialogWin = document.querySelector('.-preDialogPanel');				
					dialogWin.remove();
					scene2();
				}));				
			}else{
				//значит это не первый запуск и тогда мы приветствуем игрока
				//получаем имя босса
				var nameBoss = "<text class='-bred'>Mommy</text>"; //пока не сделана сессия ,тестово указываю
				var preloadBlock = document.querySelector("#viewport");
				preloadBlock.insertAdjacentHTML('beforeEnd', '<div class="-preDialogPanel"><div class="-preDialogForm"><div class="-preTextDialog"><span id="-talkText">'+reply[4]+nameBoss+'</span></div><div class="-preButtonForm"></div></div></div>');
				var prefuncBlock = preloadBlock.querySelector(".-preButtonForm");
				prefuncBlock.insertAdjacentHTML('beforeEnd', '<input type="button" value="Start" class="sisiBtn">');
				
				var arrows = document.querySelectorAll('.sisiBtn');	
				Array.from(arrows, el => el.addEventListener('click', e => {
					console.log(e);
					getNameBoss = e.target.value;
					/*
					//переписать
					if(getNameBoss ="Start"){
						window.location.href = 'game.html';
					}*/
				}));
			}
		}
	}
	function scene2(){		
		var preloadBlock = document.querySelector("#viewport");
			preloadBlock.insertAdjacentHTML('beforeEnd', '<div class="-preDialogPanel"><div class="-preDialogForm"><div class="-preTextDialog"><span id="-talkText">'+reply[1]+'</span></div><div class="-preButtonForm"></div></div></div>');
						
			var prefuncBlock = preloadBlock.querySelector(".-preButtonForm");
			prefuncBlock.insertAdjacentHTML('beforeEnd', '<input type="button" value="Daddy" class="sisiBtn"><input type="button" value="Mommy" class="sisiBtn"><input type="button" value="Master" class="sisiBtn"><input type="button" value="Mistress" class="sisiBtn"><input type="button" value="I dont like this" class="sisiBtn">');
			var arrows = document.querySelectorAll('.sisiBtn');	
			Array.from(arrows, el => el.addEventListener('click', e => {				
				getNameBoss = e.target.value;
				var dialogWin = document.querySelector('.-preDialogPanel');
				nameBoss = getNameBoss;
				dialogWin.remove();
				if(getNameBoss == "I dont like this"){
					scene4(getNameBoss);
				}else{
					scene3(getNameBoss);
				}
			}));
	}
	function scene3(e){
		console.log(e);
		var nameBoss = "<text class='-bred'>"+e+"</text>";
		var preloadBlock = document.querySelector("#viewport");
			preloadBlock.insertAdjacentHTML('beforeEnd', '<div class="-preDialogPanel"><div class="-preDialogForm"><div class="-preTextDialog"><span id="-talkText">'+reply[5]+nameBoss+'. '+reply[7]+'</span></div><div class="-preButtonForm"></div></div></div>');
			var prefuncBlock = preloadBlock.querySelector(".-preButtonForm");
			prefuncBlock.insertAdjacentHTML('beforeEnd', '<input type="button" value="I promise ..." class="sisiBtn">');
			var arrows = document.querySelectorAll('.sisiBtn');	
			Array.from(arrows, el => el.addEventListener('click', e => {				
				//getNameBoss = e.target.value;
				//var dialogWin = document.querySelector('.-preDialogPanel');
				//nameBoss = getNameBoss;
				//dialogWin.remove();
				//scene3(getNameBoss);
				window.location.href = 'index.html';
			}));			
	}
	function scene4(e){
		console.log(e);		
		var preloadBlock = document.querySelector("#viewport");
			preloadBlock.insertAdjacentHTML("beforeEnd", "<div class='-preDialogPanel'><div class='-preDialogForm'><div class='-preTextDialog'><span id='-talkText'>Don't you like the choice? Then tell me, what would you like me to call you?</span></div><div class='-preButtonForm'></div></div></div>");
			var prefuncBlock = preloadBlock.querySelector(".-preButtonForm");
			prefuncBlock.insertAdjacentHTML('beforeEnd', '<input type="text" maxlength="10" class="sisiText"><input type="button" value="like that" class="sisiBtn">');
			var arrows = document.querySelectorAll('.sisiBtn');	
			Array.from(arrows, el => el.addEventListener('click', e => {				
				var otherBossName = document.querySelector('.sisiText');				
				var dialogWin = document.querySelector('.-preDialogPanel');
				var nameBoss = otherBossName.value;
				if(nameBoss.length != 0 && nameBoss.length > 2){
					dialogWin.remove();
					scene3(nameBoss);
				}				
			}));			
	}
	function dataOpt(e,l){
		var oFunc = e;
		var oParam = l;
		
		switch(oFunc){
			case "get": //get data
				appParametrs = localStorage.getItem('Options');
				if(appParametrs == '' | appParametrs == null | appParametrs == undefined){
					console.log("массив пустой");
					//firstRun = 0;
				}else{
					var massPar = appParametrs.split(',');
					console.log(massPar);
					firstRun = 1;
				}
				break;
			case "set": //set data	
				console.log("записываем в массив");
				let _tt = add_ev_name+','+add_ev_speriod+','+add_ev_poperiod+','+add_ev_desc+','+add_ev_pic;            
				localStorage.setItem("roadEvents", (_tt)); 
				break;
		}
	}
});
