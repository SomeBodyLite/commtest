<?
header('Content-Type: application/json');
$json = file_get_contents("comms.txt");
$objs = json_decode($json,true);
if($_GET['all'] == 1) {
	$arr = [];
	foreach($objs as $obj) {
		if($obj["posted"] == "1")$arr[] = $obj;
	}
	$arr = json_encode($arr);
	die($arr);
}

if($_GET['all'] == 2) {
	die($json);
}

//shuffle($objs);

if($_GET['new'] == 1) {
	foreach($objs as $key => $obj) {
		if($obj["posted"] == "0") {
		$arr = $obj;
		$objs[$key]["posted"] = "1";
		break;
		}
	}

	$objs = json_encode($objs);
	file_put_contents("comms.txt", $objs);
	die(json_encode($arr));
}

?>