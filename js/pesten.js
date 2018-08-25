function clicked(tekst) {
    var AjaxTP = new XMLHttpRequest();
    AjaxTP.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
	    document.getElementById('output').innerHTML = this.responseText;
	}
    };
    AjaxTP.open("GET", "loggen.php?iTekst=" + tekst, true);
    AjaxTP.send();
}