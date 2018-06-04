function translate(text, doTranslate, callback) {
    if (doTranslate == true) {
        var googleApiKey = localStorage["googleApiKey"];
        if (googleApiKey != undefined) {
            if (googleApiKey.length > 0) {
                text = encodeURIComponent(text);
                var url = "https://translation.googleapis.com/language/translate/v2?key=" + googleApiKey + "&q=" + text + "&target=ko";
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    try {
                        if (xmlHttp.readyState == 4) {

                            if (xmlHttp.status == 200) {
                                var r = JSON.parse(xmlHttp.responseText);
                                if (r.data.translations != undefined && r.data.translations.length > 0) {
                                    callback(r.data.translations[0].translatedText.replace("<", "&lt;").replace(">", "&gt;"));
                                }
                                else throw undefined;
                            }
                            else {
                                var r = JSON.parse(xmlHttp.responseText);
                                console.log("status : " + xmlHttp.status + "    " + r.error.message);
                                throw undefined;
                            }
                        }
                    } catch (error) {
                        callback(text);
                    }
                }
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
                return xmlHttp.responseText;
            }
        }
    } 
    callback(text);
}