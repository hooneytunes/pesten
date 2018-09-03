<!DOCTYPE html>
<!--
    Dit is de homepage voor het spel Pesten
-->
<?php

function createTable($ID) {
    $spelerID = $ID;
    for ($regels = 0; $regels < 4; $regels++) {
	echo "\n\t\t\t\t<tr>\n";
	for ($cellen = 0; $cellen < 5; $cellen++) {
	    $kaartID = $regels * 5 + $cellen;
	    echo "\t\t\t\t\t<td id=\"player" . $spelerID . '_kaart' . $kaartID . '" onClick="klikKaart('.$spelerID.','.$kaartID.')">&nbsp;</td>' . "\n";
	}
	echo "\t\t\t\t</tr>\n";
    }
}
?>
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
		<h3>Pesten</h3>
	    </div>
	    <div class="row">
		<div class="one-half column">
		    <table>
			<caption id="player0_name">Rob</caption>
			<?php
			createTable(0);
			?>
		    </table>
		</div>
		<div class="one-half column">
		    <table>
			<caption id="player1_name">Rob</caption>
			<?php
			createTable(1);
			?>
		    </table>
		</div>
	    </div>
	    <div class="row">
		<div class="one-half column" id="huidigeKaart">
		    Kaart
		</div>
		<div class="one-half column">
		    <button class="button-primary" onclick="trekEenKaart()">Trek een kaart</button>
		</div>
	    </div>
	    <div class="row">
		<div class="one-half column">
		    <table>
			<caption id="player2_name">Rob</caption>
			<?php
			createTable(2);
			?>
		    </table>
		</div>
		<div class="one-half column">
		    <table>
			<caption id="player3_name">Rob</caption>
			<?php
			createTable(3);
			?>
		    </table>
		</div>
	    </div>
	    <div class="row">
		<div id="log">
		    
		</div>
	    </div>
	    
	</div>

	<script src="js/pesten.js"></script> 
    </body>
</html>
