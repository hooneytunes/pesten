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
    let kaartKleur = null;
    let kaartWaarde = null;

    if (kleur < 1 || kleur > 4) {
	throw new Error('Kleur niet toegestaan');
    } else {
	kaartKleur = kleur;
    }

    if (waarde < 1 || waarde > 13) {
	throw new Error('Waarde niet toegestaan');
    } else {
	kaartWaarde = waarde;
    }

    this.getKaartKleur = function () {
	return kaartKleur;
    };

    this.getKaartWaarde = function () {
	return kaartWaarde;
    };
}

