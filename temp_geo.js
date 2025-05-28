geoIpLookup: function(success, failure) {
    // Método 1: ipinfo.io (principal)
    $.get("https://ipinfo.io", function() {}, "jsonp")
        .done(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            if (countryCode) {
                console.log("Geolocalização via ipinfo.io: " + countryCode);
                success(countryCode);
            } else {
                // Método 2: ip-api.com (alternativa para Android)
                trySecondGeoMethod();
            }
        })
        .fail(function() {
            // Método 2: ip-api.com (alternativa para Android)
            trySecondGeoMethod();
        });

    // Método alternativo para dispositivos Android
    function trySecondGeoMethod() {
        $.ajax({
            url: 'https://ip-api.com/json/',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data && data.countryCode) {
                    console.log("Geolocalização via ip-api.com: " + data.countryCode);
                    success(data.countryCode.toLowerCase());
                } else {
                    // Método 3: geoplugin (segunda alternativa)
                    tryThirdGeoMethod();
                }
            },
            error: function() {
                // Método 3: geoplugin (segunda alternativa)
                tryThirdGeoMethod();
            }
        });
    }

    // Terceiro método de backup
    function tryThirdGeoMethod() {
        $.ajax({
            url: 'https://www.geoplugin.net/json.gp',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data && data.geoplugin_countryCode) {
                    console.log("Geolocalização via geoplugin: " + data.geoplugin_countryCode);
                    success(data.geoplugin_countryCode.toLowerCase());
                } else {
                    // Falha em todos os métodos - usar padrão (EUA)
                    console.log("Geolocalização falhou, usando padrão: us");
                    success('us');
                }
            },
            error: function() {
                // Falha em todos os métodos - usar padrão (EUA)
                console.log("Geolocalização falhou, usando padrão: us");
                success('us');
            }
        });
    }
},
