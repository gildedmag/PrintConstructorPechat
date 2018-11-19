<?php
$json = '{"model":"kid_body","fills":[16777215],"sides":[{"objects":[{"filters":[],"left":154.6,"opacity":1,"scaleX":1.01,"scaleY":1.07,"src":"https://xn--80aj0aafqej6a4c.xn--80asehdb/image/customer/guest/8b9b5d2eb8e29e88561b8d36f4bf430b/6a3a63e43aa193f9612e3721c0496390.jpg","top":381,"type":"image"},{"fill":"rgba(26,203,16,1)","fontFamily":"Helvetica","fontSize":25,"fontWeight":"normal","height":28.25,"left":155.64,"lineHeight":1.16,"opacity":1,"scaleX":1,"scaleY":1,"text":"Это анимация детка","textAlign":"left","top":19.86,"type":"i-text","width":236.58},{"fill":"rgba(134,252,227,1)","fontFamily":"Helvetica","fontSize":25,"fontWeight":"normal","height":28.25,"left":155.92,"lineHeight":1.16,"opacity":1,"scaleX":1,"scaleY":1,"text":"Це анімація дитинко ","textAlign":"left","top":54.77,"type":"i-text","width":243.62},{"fill":"rgba(177,215,12,1)","fontFamily":"Helvetica","fontSize":25,"fontWeight":"normal","height":28.25,"left":152.37,"lineHeight":1.16,"opacity":1,"scaleX":1,"scaleY":1,"text":"It`s animation, baby","textAlign":"left","top":99.13,"type":"i-text","width":218.16},{"filters":[],"height":1280,"left":147.54,"opacity":1,"scaleX":0.31,"scaleY":0.31,"src":"https://xn--80aj0aafqej6a4c.xn--80asehdb/image/customer/authorized/365d17770080c807a0e47ae9118d8641/1231718682219b2b7fba6c188064bc12.jpg","top":323.41,"type":"image","width":960}],"width":300,"height":450,"roundCorners":null},{"objects":[],"width":300,"height":450,"roundCorners":null}]}';

$json = json_encode($json);
$renderer_path = './render';
$preview_output = './output/preview.jpg';
$animation_output = './output/animation.txt';

function liveExecuteCommand($cmd){

    while (@ ob_end_flush()) ; // end all output buffers if any

    $proc = popen("$cmd 2>&1 ; echo Exit status : $?", 'r');

    $live_output = "";
    $complete_output = "";

    while (!feof($proc)) {
        $live_output = fread($proc, 4096);
        $complete_output = $complete_output . $live_output;
        echo "$live_output";
        @ flush();
    }

    pclose($proc);

    // get exit status
    preg_match('/[0-9]+$/', $complete_output, $matches);

    // return exit status and intended output
    return array(
        'exit_status' => intval($matches[0]),
        'output' => str_replace("Exit status : " . $matches[0], '', $complete_output)
    );
}

$command = $renderer_path . ' -p 800x400 ' . $preview_output . ' -a 256x256 ' . $animation_output . ' ' . $json;


echo '<pre>';
$output = liveExecuteCommand($command);
echo $output;
echo '</pre>';

$src = file_get_contents('./output/animation.txt');

?>
<html>
    <body>
        <img src="../render/output/preview.jpg">
        <script src="../icon/icon.js"></script>
        <script>
            let icon = new Icon('<?php echo $src; ?>');
            document.body.appendChild(icon.getElement());

            icon = new Icon('<?php echo $src; ?>');
            icon.autoplay = true;
            document.body.appendChild(icon.getElement());

            icon = new Icon('<?php echo $src; ?>');
            icon.autoplay = true;
            icon.interval = 300;
            document.body.appendChild(icon.getElement());
        </script>
    </body>
</html>
