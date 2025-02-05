<?php
session_start();
define("SITEROOTDIR", $_SERVER['DOCUMENT_ROOT']);
$link = mysqli_connect('localhost','user','M2Vh6jn5aGpKW5UA','zghm');
mysqli_query($link, "SET NAMES utf8");
if (!$link) { 
   printf("Connection is lost. Error:: %s\n", mysqli_connect_error()); 
   exit; 
}

if (isset($_POST['val0'])) 
{
	$val0 = $_POST['val0'];
	if(isset($_POST['val1'])){
		$val1 = $_POST['val1'];
	}
	if($val0 == ''){//получение из бд
		$tp_load = mysqli_query($link, "SELECT 1 FROM ga_tempcart WHERE uid='{$val1}'");
		$t_load = mysqli_num_rows($tp_load);
		if($t_load != 0){
			$tp2_load = mysqli_query($link, "SELECT gmurls FROM ga_tempcart WHERE uid='{$val1}'");
			$t_mass = mysqli_fetch_array($tp2_load);
			$t_spisd = $t_mass['gmurls'];
			if($t_spisd != '' or $t_spisd != 0 or $t_spisd != null){
				$t_spis = $t_spisd;
				echo $t_spis;
			}else{				
				//echo "Data is not yet";
			}
			
		}
	}
	if($val0 == 'add_incart'){//запись в бд
		$gast = 1; //$_SESSION['user_id']  //
		mysqli_query($link, "UPDATE `ga_tempcart` SET `gmurls` = '{$val1}' WHERE `uid`='{$gast}'");
	}
}else{
	header("Location: /");exit;
}

?>