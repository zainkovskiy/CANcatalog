<?php
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

if (isset($_REQUEST['IFRAME_TYPE']) && $_REQUEST['IFRAME_TYPE'] == 'SIDE_SLIDER') {

  $showFoot = false;
} else {
  require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_after.php");
  $showFoot = true;
}

$placementOptions = isset($_REQUEST['PLACEMENT_OPTIONS']) ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true) : array();
$ActiveUser = CUser::GetLogin();
$ActiveUserID = CUser::GetID();

$reqNumber = $_REQUEST['reqNumber'];
$source = $_REQUEST['source'];

if (isset($placementOptions['ENTITY_VALUE_ID'])) {
  $dealId = $placementOptions['ENTITY_VALUE_ID'];
} else {
  $dealId = $_REQUEST['dealId'];
}
?>

<!doctype html>
<html lang="ru">

<head>
<link rel="icon" href="https://crm.centralnoe.ru/dealincom/assets/svg/location-pin-svgrepo-com.svg">
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1"> -->
  <?php
  if (!$showFoot) {
    $APPLICATION->ShowHead();
  } else {
    $APPLICATION->ShowHeadScripts();
  }
  
  // $APPLICATION->SetAdditionalCSS("/cardObject/main.css");
  $APPLICATION->SetAdditionalCSS("/dev/catalog/main-v1.0.css");
  ?>
  <script defer="defer" src="bundle-v1.0.js?'.chr(rand(65,90)).chr(rand(65,90)).'='.rand(0,1000000).'"></script>
  <!-- <link href="main.css?s=<?= rand(0, 1000000) ?>" rel="stylesheet"> -->
  <script>
    let reqNumber = '<? echo ($reqNumber); ?>';
    let userId = '<? echo ($ActiveUserID); ?>';;
    let userLogin = '<? echo ($ActiveUser); ?>';;
    let source = '<? echo ($source); ?>';
    let dealId = '<? echo ($dealId); ?>';;
  </script>
</head>

<body>
  <?php
  if ($showFoot) {
    echo ('<SCRIPT>BX.remove(BX.findParent(uiToolbarContainer,{className :"bx-layout-inner-inner-cont"})) </SCRIPT>');
  }
  CJSCore::Init(['ui', 'sidepanel', 'jquery2']);
  echo ('<div id="root"></div>');
  if ($showFoot) {
    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
  }
  $APPLICATION->ShowCSS(false, false);
  ?>
</body>

</html>