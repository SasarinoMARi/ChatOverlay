function translate(text, callback) {
    if (localStorage.log_istranslate == 'true') {
        var apiKey = 'fuck cloud';
        var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&q=" + text + "&target=ko";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                var r = JSON.parse(xmlHttp.responseText);
                if (r.data.translations != undefined && r.data.translations.length > 0) {
                    callback(r.data.translations[0].translatedText);
                }
            }
            else {
                var r = JSON.parse(xmlHttp.responseText);
                console.log("status : " + xmlHttp.status + "    " + r.error.message);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    else callback(text);
}