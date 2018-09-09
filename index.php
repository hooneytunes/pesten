<!DOCTYPE html>
<!--
    Dit is de homepage voor het spel Pesten
-->
<html>
    <head>
	<title>Pesten</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/skeleton.css">
    </head>
    <body onload="init();">
	<div class="container">
	    <div class="row">
		<div class="one-half column">
		    <h3>Pesten</h3>
		</div>
		<div class="one-half column">
		    <h3><a href="backend.php" target="_blank">Bekijk het log</a></h3>
		</div>
	    </div>
	    <div class="row">
		<div class="one-half column">
		    <div id="player0_name"></div>
		    <div id="cards_player0"></div>
		</div>
		<div class="one-half column">
		    <div id="player1_name"></div>
		    <div id="cards_player1"></div>
		</div>
	    </div>
	    <div class="row">
		<div class="one-half column">
		    <img src="images/cards/back.png" class="kaart" id="huidigeKaart">
		</div>
		<div class="one-half column">
		    <button class="button-primary" onclick="trekEenKaart()">Trek een kaart</button>
		</div>
	    </div>
	    <div class="row">
		<div class="one-half column">
		    <div id="player2_name"></div>
		    <div id="cards_player2"></div>
		</div>
		<div class="one-half column">
		    <div id="player3_name"></div>
		    <div id="cards_player3"></div>
		</div>
	    </div>
	    <div class="row">
		<div id="log"></div>
	    </div>

	</div>
	<script src="js/org/cards/cards.js"></script>
	<script src="js/pesten.js"></script> 
    </body>
</html>
