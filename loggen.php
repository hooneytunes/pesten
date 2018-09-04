<?php

/**
 * Met dit programma vangen wij de loggegevens op en plaatsen die in het
 * logbestand.
 */
$antwoord = "Niets";
$tekst = filter_input(INPUT_GET, "iTekst", FILTER_SANITIZE_MAGIC_QUOTES);
$tijd = filter_input(INPUT_GET, "iTijd", FILTER_SANITIZE_MAGIC_QUOTES);
$antwoord = $tijd."@".$tekst . "</br>\n";
$fileHandle = fopen(dirname(__FILE__) . "/log.txt", "a+");
fwrite($fileHandle, $antwoord);


echo $antwoord;
