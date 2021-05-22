<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'api/phpmailer/src/Exception.php';
require 'api/phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom ('danieldanyluch@gmail.com', 'Сайт Best-shtory-yalta')
// Кому отправить
$mail->addAddress('danielyalta@yandex.ru');
// Тема письма
$mail->Subject = 'Из контактной формы на сайте'

// Тело Письма
$body = '<h1>Сообщение от клиента BEST! </h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name']. '</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Номер телефона:</strong> '.$_POST['phone']. '</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email']. '</p>';
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message']. '</p>';
}

// Прикрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
    // путь загрузки файла
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    // грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body .='<p><strong>Прикрепленное фото:</strong>';
        $mail->addAttachment($fileAttach);
    }
}

$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>


