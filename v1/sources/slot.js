document.addEventListener("DOMContentLoaded", function(event){
	
	SlotBuild(); //строим приложение	
	
	function SlotBuild(){
		var isTboost = document.querySelector('#appBoostSection');		
		if(!isTboost || isTboost == null || isTboost == undefined){			
		}else{
			var sSpinBut = document.querySelector('#sSpinBut');
			sSpinBut.addEventListener('click', spinSlots);
		}
	}
	function spinSlots(){
		console.log("slots spin now");
		//
		transationY:-100px;
	}
});