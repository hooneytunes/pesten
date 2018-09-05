function addLog(tekst) {
    let AjaxTP = new XMLHttpRequest();
    uTekst = encodeURI("loggen.php?iTekst=" + tekst + "&iTijd=" + Date.now());
    AjaxTP.open("GET", uTekst, true);
    AjaxTP.send();
}

let huidigeStok = null;
let huidigeSpelers = null;
let huidigeKaart = null;
let spelerAanDeBeurt = 0;



function bouwScherm() {
    for (i = 0; i < huidigeSpelers.getAantalSpelers(); i++) {
	document.getElementById("player" + i + "_name").innerHTML = huidigeSpelers.getNaamSpeler(i);
	for (j = 0; j < huidigeSpelers.getSpelerAantalKaarten(i); j++) {
	    dezeKaart = huidigeSpelers.toonKaartVanSpeler(i, j);
	    document.getElementById("player" + i + "_kaart" + j).innerHTML = dezeKaart.getKaartBijVolleNaam();
	}
	for (j = huidigeSpelers.getSpelerAantalKaarten(i); j < 20; j++) {
	    document.getElementById("player" + i + "_kaart" + j).innerHTML = "&nbsp;";
	}
    }
    document.getElementById("huidigeKaart").innerHTML = huidigeKaart.getKaartBijVolleNaam();
    document.getElementById("log").innerHTML = huidigeSpelers.getNaamSpeler(spelerAanDeBeurt) + " is aan de beurt.";
}

function volgendeSpeler() {
    spelerAanDeBeurt++;
    if (spelerAanDeBeurt > huidigeSpelers.getAantalSpelers() - 1) {
	spelerAanDeBeurt = 0;
    }
}

function klikKaart(spelerID, kaartID) {
    /**
     * Eerst kijken we of de kaart waarop geklikt is 
     * wel van de speler is die aan de beurt is
     */

    if (spelerID === spelerAanDeBeurt) {
	try {
	    gekozenKaart = huidigeSpelers.toonKaartVanSpeler(spelerID, kaartID);
	    /**
	     * Als dat het geval is wordt bekeken of de gekozen kaart past bij de huidige kaart
	     * Zo niet, dan blijft de beurt bij de speler
	     */
	    if (gekozenKaart.getKaartKleur() === huidigeKaart.getKaartKleur() || gekozenKaart.getKaartWaarde() === huidigeKaart.getKaartWaarde()) {
		huidigeSpelers.verwijderKaartVanSpeler(spelerID, kaartID);
		huidigeKaart = gekozenKaart;
		logBericht = huidigeSpelers.getNaamSpeler(spelerAanDeBeurt) + ' speelt ' + gekozenKaart.getKaartBijVolleNaam();
		addLog(logBericht);

		if (huidigeSpelers.getSpelerAantalKaarten(spelerID) === 0) {
		    let tekst = huidigeSpelers.getNaamSpeler(spelerID) + " heeft gewonnen!";
		    addLog(tekst);
		    alert(tekst);
		    location.reload(true);
		}
		volgendeSpeler();
		bouwScherm(huidigeSpelers);
	    }
	} catch (e) {
	    /**
	     * Bad practice, maar we doen verder niets de melding dat de speler op een leeg vakje heeft geklikt.
	     * 
	     */
	}
    }
}

function trekEenKaart() {
    if (huidigeStok.getStokGrootte() !== 0) {
	getrokkenKaart = huidigeStok.neemEenKaart();
	huidigeSpelers.geefSpelerEenKaart(spelerAanDeBeurt, getrokkenKaart);
	logBericht = huidigeSpelers.getNaamSpeler(spelerAanDeBeurt) + ' trekt ' + getrokkenKaart.getKaartBijVolleNaam();
	addLog(logBericht);
	volgendeSpeler();
	bouwScherm(huidigeSpelers);
    } else {
	let tekst = "Alle kaarten zijn op.\n Niemand heeft gewonnen!";
	alert(tekst);
	location.reload(true);
    }

}

function init() {
    /**
     * Maak een stok kaarten en schud de kaarten
     */
    huidigeStok = new Stok();
    huidigeStok.creeerStok();
    huidigeStok.schudKaarten();

    /**
     * Creeer de spelers van dit spel
     */
    huidigeSpelers = new Spelers();
    huidigeSpelers.voegSpelerToe("Rob");
    huidigeSpelers.voegSpelerToe("Jan");
    huidigeSpelers.voegSpelerToe("Piet-Joris");
    huidigeSpelers.voegSpelerToe("Corneel");

    let logBericht = "Een spel is begonnen met ";
    for (i = 0; i < huidigeSpelers.getAantalSpelers() - 2; i++) {
	logBericht += huidigeSpelers.getNaamSpeler(i) + ", ";
    }
    logBericht += huidigeSpelers.getNaamSpeler(huidigeSpelers.getAantalSpelers() - 2) + " en ";
    logBericht += huidigeSpelers.getNaamSpeler(huidigeSpelers.getAantalSpelers() - 1) + ".";
    addLog(logBericht);

    /**
     * Geef elke speler zeven kaarten
     */
    for (i = 0; i < huidigeSpelers.getAantalSpelers(); i++) {
	for (j = 0; j < 7; j++) {
	    let nieuweKaart = huidigeStok.neemEenKaart();
	    huidigeSpelers.geefSpelerEenKaart(i, nieuweKaart);
	    logBericht = huidigeSpelers.getNaamSpeler(i) + " krijgt " + nieuweKaart.getKaartBijVolleNaam();
	    addLog(logBericht);
	}
    }

    huidigeKaart = huidigeStok.neemEenKaart();
    spelerAanDeBeurt = Math.round(Math.random() * 3);
    logBericht = huidigeSpelers.getNaamSpeler(spelerAanDeBeurt) + ' mag beginnen';
    addLog(logBericht);
    bouwScherm();

}