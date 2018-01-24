function translate(text, callback) {
    if (localStorage.log_istranslate == 'true') {
        var apiKey = localStorage.log_apikey;
        var url = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&q=" + text + "&target=ko";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            try {
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
            } catch (error) {
                
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    else callback(text);
}