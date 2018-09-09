function addLog(tekst) {
    let AjaxTP = new XMLHttpRequest();
    uTekst = encodeURI("loggen.php?iTekst=" + tekst + "&iTijd=" + Date.now());
    AjaxTP.open("GET", uTekst, false);
    AjaxTP.send();
}

let huidigeStok = null;
let huidigeSpelers = null;
let huidigeKaart = null;
let spelerAanDeBeurt = 0;

function bouwScherm() {
    for (i = 0; i < huidigeSpelers.getAantalSpelers(); i++) {
	document.getElementById("player" + i + "_name").innerHTML = huidigeSpelers.getNaamSpeler(i);
	DOM_spelerVeld = document.getElementById("cards_player" + i);

	while (DOM_spelerVeld.hasChildNodes()) {
	    DOM_spelerVeld.removeChild(DOM_spelerVeld.lastChild);
	}

	for (j = 0; j < huidigeSpelers.getSpelerAantalKaarten(i); j++) {
	    dezeKaart = huidigeSpelers.toonKaartVanSpeler(i, j);

	    let DOM_img = document.createElement("img");
	    DOM_img.className = "kaart";
	    DOM_img.spelerID = i;
	    DOM_img.kaartID = j;
	    DOM_img.ID = "player" + i + "_kaart" + j;
	    DOM_img.src = "images/cards/" + dezeKaart.getKaartAfbeelding() + ".png";
	    DOM_img.addEventListener('click', klikKaart);
	    DOM_spelerVeld.appendChild(DOM_img);
	}
    }

    document.getElementById("huidigeKaart").src = "images/cards/" + huidigeKaart.getKaartAfbeelding() + ".png";
    document.getElementById("log").innerHTML = huidigeSpelers.getNaamSpeler(spelerAanDeBeurt) + " is aan de beurt.";
}

function mijnFunctie(evt) {
    alert(evt.target.ID);
}

function volgendeSpeler() {
    spelerAanDeBeurt++;
    if (spelerAanDeBeurt > huidigeSpelers.getAantalSpelers() - 1) {
	spelerAanDeBeurt = 0;
    }
}

function klikKaart(evt) {
    spelerID = evt.target.spelerID;
    kaartID = evt.target.kaartID;
    /**
     * Eerst kijken we of de kaart waarop geklikt is 
     * wel van de speler is die aan de beurt is
     */
    if (spelerID === spelerAanDeBeurt) {
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
	    /**
	     * Als de huidige speler zijn laatste kaart heeft gespeeld,
	     * heeft hij gewonnen.
	     */
	    if (huidigeSpelers.getSpelerAantalKaarten(spelerID) === 0) {
		let tekst = huidigeSpelers.getNaamSpeler(spelerID) + " heeft gewonnen!";
		addLog(tekst);
		alert(tekst);
		location.reload(true);
	    }
	    volgendeSpeler();
	    bouwScherm(huidigeSpelers);
	}
    }
}

function trekEenKaart() {
    /**
     * Als het aantal overgebleven kaarten nul is, heeft het geen zin om nog
     * kaarten te trekken
     */
    if (huidigeStok.getStokGrootte() !== 0) {
	/**
	 * Trek een kaart en voeg die toe aan de hand van de huidige speler
	 */
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