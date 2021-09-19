<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('0leg.19-94@mail.ru', 'Oleg');
$mail->addAddress('ramzanmal04@mail.ru');
$mail->Subject = 'Hello, world'; 

$body = '<h1>Salam</h1>';

if (trim(!empty($_POST['popup__name']))){
    $body.= '<p> Name:' .$_POST['popup__name'].'</p>'
};
if (trim(!empty($_POST['phone']))){
    $body.= '<p> Telephone:' .$_POST['phone'].'</p>'
};

$mail->Body = $body; 

if (!$mail->send()){
    $message = 'Ошибка';
}else{
    $message = 'Данные отправлены, специалист скоро перезвонит';
}
$response = ['message'=> $message];

header('Content-type:application/json');
echo json_encode($response);


?>


