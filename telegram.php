<?php

/* https://api.telegram.org/bot2008278250:AAE0PFZ2jvzS_y4l4PE9i9H3ZxqJHDBP5hk/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['popup__name'];
$phone = $_POST['phone'];
$token = "2008278250:AAE0PFZ2jvzS_y4l4PE9i9H3ZxqJHDBP5hk";
$chat_id = "-532951471";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone
  
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  
} else {
  echo "Error";
}
?>