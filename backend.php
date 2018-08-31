<!DOCTYPE html>
<!--
    Hier is de backend informatie bestaande uit het weergeven van het log-bestand.
-->
<html>
    <head>
	<title>Log gegevens van Pesten</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/skeleton.css">
    </head>
    <body>
	<div class="container">
	    <div class="row">
		<div class="three columns"><h3>Pesten</h3></div>
		<div class="eight columns">&nbsp;</div>
	    </div>
	    <div class="row">
	    <div class="eight columns">
		<?php
		/*
		 * Laat het bestand zien als het bestaat
		 * en anders geef de melding dat er nog geen logbestand is
		 */
		$filename = dirname(__FILE__) . "/log.txt";
		if (file_exists($filename)) {
		    $fileHandle = fopen($filename, "r");
		    $antwoord = fread($fileHandle, filesize($filename));
		} else	{
		    $antwoord="Logbestand bestaat nog niet\n";
		}
		echo $antwoord;
		?>
	    </div>
	    <div class="three columns">&nbsp;</div>
	    </div>
	</div>
    </body>
</html>