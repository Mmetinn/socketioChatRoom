
<?php
$link=@mysqli_connect("localhost","root","") or die ("Sunucuya Bağlanamadık");
$sec=@mysqli_select_db($link,"socket_io_db") or die ("Veritabanı Seçilemedi");
?>
