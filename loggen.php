<?php

/**
 * Met dit programma vangen wij de loggegevens op en plaatsen die in het
 * logbestand.
 */
$antwoord = "Niets";
$tekst = filter_input(INPUT_GET, "iTekst", FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if ($tekst !== "") {
    $antwoord = date("H:i:s") .  "&nbsp;"  . $tekst."</br>\n";
    $fileHandle = fopen(dirname(__FILE__)."/log.txt", "a+");
    fwrite($fileHandle, $antwoord);
}

echo $antwoord;
