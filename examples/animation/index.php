<?php
echo $_POST['id'];
$data = file_get_contents('php://input');
//$data = fopen('raw.jpg', 'r');
$header = substr($data, 0, 10);


file_put_contents("raw.jpg", $data);

$start = 0;
while (($end = strrpos($data, $header, $start)) != false) {
    file_put_contents($start . '.jpg', substr($data, $start, $end));
    $start = $end + 10;
}

echo 'OK';