function addLog(tekst) {
    let AjaxTP = new XMLHttpRequest();
    AjaxTP.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
//TODO: logging op het scherm
	}
    };
    AjaxTP.open("GET", "loggen.php?iTekst=" + tekst, true);
    AjaxTP.send();
}

let huidigeStok = null;
let huidigeSpelers = null;
let huidigeKaart = null;
let spelerAanDeBeurt = 0;

function Kaart(kleur, waarde) {
    /**
     * Zet de private variabelen op een startwaarde
     */
    let kaartKleur = null;
    let kaartWaarde = null;
    let kaartKleurNaam = ["Harten", "Klaveren", "Ruiten", "Schoppen"];
    let kaartWaardeNaam = ["Joker", "Aas", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Boer", "Vrouw", "Heer"];
    /*
     * De kleur moet 0, 1, 2 of 3 zijn,
     * anders wordt een foutmelding gegeven
     */

    if (kleur < 0 || kleur > 3) {
	throw new Error('Kleur niet toegestaan');
    } else {
	kaartKleur = kleur;
    }

    /*
     * De waarde varieert van 0 tot en met 13,
     * anders wordt een foutmelding gegeven
     */

    if (waarde < 0 || waarde > 13) {
	throw new Error('Waarde niet toegestaan');
    } else {
	kaartWaarde = waarde;
    }

    /**
     * Hier wordt de kaartkleur teruggegeven als waarde
     */
    this.getKaartKleur = function () {
	return kaartKleur;
    };
    /**
     * Hier wordt de kaartkleur bij naam teruggegeven
     */
    this.getKaartKleurBijNaam = function () {
	return kaartKleurNaam[kaartKleur];
    };

    /**
     * Hier wordt de kaartwaarde teruggegeven als waarde
     */
    this.getKaartWaarde = function () {
	return kaartWaarde;
    };
    /** 
     * Hier wordt de kaartwaarde bij naam teruggegeven
     */
    this.getKaartWaardeBijNaam = function () {
	return kaartWaardeNaam[kaartWaarde];
    };
}

function Speler(naam) {
    /**
     * Zet de private variabelen op een startwaarde
     */
    let spelerNaam = naam;
    let spelerKaarten = [];

    this.getSpelerNaam = function () {
	return spelerNaam;
    };

    this.getSpelerAantalKaarten = function () {
	return spelerKaarten.length;
    };

    this.geefSpelerEenKaart = function (kaart) {
	spelerKaarten.push(kaart);
    };

    this.toonKaart = function (id) {
	return spelerKaarten[id];
    };

    this.verwijderKaart = function (id) {
	spelerKaarten.splice(id, 1);
    };
}

function Spelers() {
    /**
     * Zet de private variabelen op een startwaarde
     */
    let spelers = [];

    this.geefSpelerEenKaart = function (id, kaart) {
	spelers[id].geefSpelerEenKaart(kaart);
    };

    /**
     * Hier wordt het aantal spelers geretourneerd
     */
    this.getAantalSpelers = function () {
	return spelers.length;
    };

    this.getNaamSpeler = function (id) {
	return spelers[id].getSpelerNaam();
    };

    this.getSpelerAantalKaarten = function (id) {
	return spelers[id].getSpelerAantalKaarten();
    };

    this.toonKaartVanSpeler = function (id, kaartNummer) {
	return spelers[id].toonKaart(kaartNummer);
    };

    this.verwijderKaartVanSpeler = function (spelerID, kaartID) {
	spelers[spelerID].verwijderKaart(kaartID);
    };

    /**
     * Hier kunnen de spelers toegevoegd worden
     * Het aantal spelers is maximaal 4
     * 
     */
    this.voegSpelerToe = function (naam) {
	if (spelers.length > 3) {
	    throw new Error("Niet meer dan vier spelers toegestaan.");
	} else {
	    spelers.push(new Speler(naam));
	}
    };
}

function Stok() {
    /**
     * Zet de private variabelen op een startwaarde
     */
    let stok = [];

    /**
     * Hier wordt een stok kaarten gemaakt met alle kleuren en waarden,
     * zonder jokers.
     */
    this.creeerStok = function () {
	for (kleur = 0; kleur < 4; kleur++) {
	    for (waarde = 1; waarde < 14; waarde++) {
		stok[kleur * 13 + waarde - 1] = new Kaart(kleur, waarde);
	    }
	}
    };

    this.getKaart = function (waarde) {
	return stok[waarde];
    };

    this.getStokGrootte = function () {
	return stok.length;
    };

    this.neemEenKaart = function () {
	kaart = stok.splice(0, 1);
	return kaart[0];
    };

    /**
     * Met deze methode worden de kaarten geschud.
     */
    this.schudKaarten = function () {
	stok.sort(function (a, b) {
	    return 0.5 - Math.random();
	}
	);
    };
}

function bouwScherm(spelers) {
    for (i = 0; i < spelers.getAantalSpelers(); i++) {
	document.getElementById("player" + i + "_name").innerHTML = spelers.getNaamSpeler(i);
	for (j = 0; j < spelers.getSpelerAantalKaarten(i); j++) {
	    dezeKaart = spelers.toonKaartVanSpeler(i, j);
	    document.getElementById("player" + i + "_kaart" + j).innerHTML = dezeKaart.getKaartKleurBijNaam() + "&nbsp;" + dezeKaart.getKaartWaardeBijNaam();
	}
	for (j = spelers.getSpelerAantalKaarten(i); j < 20; j++) {
	    document.getElementById("player" + i + "_kaart" + j).innerHTML = "&nbsp;";
	}
    }
    document.getElementById("huidigeKaart").innerHTML = huidigeKaart.getKaartKleurBijNaam() + "&nbsp;" + huidigeKaart.getKaartWaardeBijNaam();
    document.getElementById("log").innerHTML = spelers.getNaamSpeler(spelerAanDeBeurt) + " is aan de beurt.";
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
		if (huidigeSpelers.getSpelerAantalKaarten(spelerID) === 0) {
		    let tekst = huidigeSpelers.getNaamSpeler(spelerID) + " heeft gewonnen!";
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
	huidigeSpelers.geefSpelerEenKaart(spelerAanDeBeurt, huidigeStok.neemEenKaart());
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
    spelers = new Spelers();
    spelers.voegSpelerToe("Rob");
    spelers.voegSpelerToe("Jan");
    spelers.voegSpelerToe("Piet-Joris");
    spelers.voegSpelerToe("Corneel");
    huidigeSpelers = spelers;
    let logBericht = "Een spel is begonnen met ";
    for (i = 0; i < spelers.getAantalSpelers() - 2; i++) {
	logBericht += spelers.getNaamSpeler(i) + ", ";
    }
    logBericht += spelers.getNaamSpeler(spelers.getAantalSpelers() - 2) + " en ";
    logBericht += spelers.getNaamSpeler(spelers.getAantalSpelers() - 1) + ".";
    /**
     *	In de productieomgeving moet dit commentaar verwijderd worden
     *    addLog(logBericht);
     */

    /**
     * Geef elke speler zeven kaarten
     */
    for (i = 0; i < spelers.getAantalSpelers(); i++) {
	for (j = 0; j < 7; j++) {
	    spelers.geefSpelerEenKaart(i, huidigeStok.neemEenKaart());
	}
    }

    huidigeKaart = huidigeStok.neemEenKaart();
    spelerAanDeBeurt = Math.round(Math.random() * 3);
    bouwScherm(spelers);

}