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
    /*
     * Zet de private variabelen op een startwaarde
     */ 
    let kaartKleur = null;
    let kaartWaarde = null;
    /*
     * De kleur moet 1, 2, 3, of 4 zijn,
     * anders wordt een foutmelding gegeven
     */

    if (kleur < 1 || kleur > 4) {
	throw new Error('Kleur niet toegestaan');
    } else {
	kaartKleur = kleur;
    }

    /*
     * De waarde varieert van 1 tot en met 13,
     * anders wordt een foutmelding gegeven
     */

    if (waarde < 1 || waarde > 13) {
	throw new Error('Waarde niet toegestaan');
    } else {
	kaartWaarde = waarde;
    }

    /*
     * Hier wordt de kaartkleur teruggegeven als waarde
     */
    this.getKaartKleur = function () {
	return kaartKleur;
    };

    /*
     * Hier wordt de kaartwaarde teruggegeven als waarde
     */
    this.getKaartWaarde = function () {
	return kaartWaarde;
    };
}