---
title: php上传七牛云
date: 2016-08-23
---
> 首先下载qiniu_sdk到本地...

```
<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

require_once __DIR__ . '/../../upload/qiniu_sdk/autoload.php';

$filePath = __DIR__ . '/temp';

// 引入鉴权类
use QiniuAuth;

// 引入上传类
use QiniuStorageUploadManager;

function upload()
{
    global $filePath;
    $file = $_FILES['file'];
    $fileName = $file['name'];

    $extension = substr($fileName, strrpos($fileName, '.'));
    $path = $filePath . $extension;

    $flag = move_uploaded_file($file['tmp_name'], $path);

    if (!$file || !$flag) {
        die('接受文件失败');
    }

    $accessKey = '***';
    $secretKey = '***';
    $bucket = 'luzhongkuan';

    $auth = new Auth($accessKey, $secretKey);

    $token = $auth->uploadToken($bucket);

    $uploadMgr = new UploadManager();

    $key = time() . $extension;

    list($ret, $err) = $uploadMgr->putFile($token, $key, $path);
    if ($err) {
        die($err);
    } else {
        return 'http://qiniu.kuan1.top/' . $ret['key'];
    }
}





```
  