function clicked(tekst) {
    let AjaxTP = new XMLHttpRequest();
    AjaxTP.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
	    document.getElementById('output').innerHTML = this.responseText;
	}
    };
    AjaxTP.open("GET", "loggen.php?iTekst=" + tekst, true);
    AjaxTP.send();
}

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

    this.getSpelerNaam = function () {
	return spelerNaam;
    };
}


function Spelers() {
    /**
     * Zet de private variabelen op een startwaarde
     */
    let spelers = [];

    /**
     * Hier wordt het aantal spelers gertourneerd
     */
    this.getAantalSpelers = function () {
	return spelers.length;
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

function init() {
    let stok = new Stok();
    stok.creeerStok();
    stok.schudKaarten();
    spelers = new Spelers();
    spelers.voegSpelerToe("Rob");
    spelers.voegSpelerToe("Jan");
    spelers.voegSpelerToe("Piet-Joris");
    spelers.voegSpelerToe("Corneel");
//    let inhoud = "";
//    for (i = 0; i < stok.getStokGrootte(); i++) {
//	inhoud += stok.getKaart(i).getKaartKleurBijNaam() + "&nbsp;" + stok.getKaart(i).getKaartWaardeBijNaam() + "<br />\n";
//    }
//
//    document.getElementById("speelveld").innerHTML = inhoud;



}