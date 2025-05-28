( function( $ ) {
        "use strict";
        jQuery(document).ready(function($) {
                setTimeout(function(){ 
                        $(".elementor").not(".elementor-location-popup").each(function(e){
                    $( "input.elementor-field-telephone", $(this) ).each(function( index ) {
                        elementor_field_telephone($(this));
                    });
                }) 
                 }, 200);
        jQuery( document ).on( 'elementor/popup/show', () => {
             $( "input.elementor-field-telephone" ).each(function( index ) {
                    elementor_field_telephone($(this));
            });
        } );
                $("input").on("done_load_repeater",function(e){
                        $( "input.elementor-field-telephone" ).each(function( index ) {
                                        elementor_field_telephone($(this));
                        });
                })
                function elementor_field_telephone(field){
                        var onlyCountries_data = field.data("onlyct");
                        var exclude = field.data("excludecountries");
                        var preferredCountries_data = field.data("pre");
                        var geoIpLookup_data = field.data("auto");
                        var countrySearch = field.data("telephone_search");
                        var initialCountry_data = field.data("defcountry");
                        var input = "form_fields["+field.data("name")+"]";
                        //field.attr('name',"form_fields[]");
                        if(countrySearch == "yes"){
                                countrySearch = true;
                        }else{
                                countrySearch = false;
                        }
                        var data = [];
                        if (onlyCountries_data == "") { 
                                // Se não houver países especificados, use todos os países disponíveis
                                if (typeof allCountryCodes !== 'undefined') {
                                    console.log("Usando lista completa de países: " + allCountryCodes.length + " países");
                                    onlyCountries_data = allCountryCodes;
                                } else {
                                    console.log("Lista completa de países não encontrada, usando padrão");
                                    onlyCountries_data = [];
                                }
                        }else{
                                onlyCountries_data = onlyCountries_data.split('|');
                        }
                        if (exclude == "") { 
                                exclude = [];
                        }else{
                                exclude = exclude.split('|');
                        }
                        if (preferredCountries_data == "") { 
                                preferredCountries_data = [ "us", "gb", "ca", "au", "br" ];
                        }else{
                                preferredCountries_data = preferredCountries_data.split('|');
                        }
                        if (initialCountry_data == "") { 
                                initialCountry_data = "auto";
                        }
                        if( field.data("auto") == "yes" ){
                                var iti = field.intlTelInput({
                                        nationalMode: true,
                                        countrySearch: countrySearch,
                                        onlyCountries: onlyCountries_data,
                                        excludeCountries: exclude,
                                        initialCountry: initialCountry_data,
                                        preferredCountries: preferredCountries_data,
                                        utilsScript: elementor_tel.utilsScript,
                                        separateDialCode: true,
                                        hiddenInput: () => ({ phone: input}),
                                        geoIpLookup: function(success, failure) {
                                            // Verificar se já temos um país em cache
                                            var countryCodeCache = sessionStorage.getItem('country_code_cache');
                                            var cacheTimestamp = sessionStorage.getItem('country_code_timestamp');
                                            var cacheValid = false;
                                            
                                            // Verificar se o cache ainda é válido (menos de 24 horas)
                                            if (countryCodeCache && cacheTimestamp) {
                                                var now = new Date().getTime();
                                                var cacheTime = parseInt(cacheTimestamp);
                                                var cacheDuration = 24 * 60 * 60 * 1000; // 24 horas em ms
                                                
                                                if (now - cacheTime < cacheDuration) {
                                                    cacheValid = true;
                                                }
                                            }
                                            
                                            // Se tivermos um cache válido, usar imediatamente
                                            if (cacheValid && countryCodeCache) {
                                                console.log("Usando país em cache: " + countryCodeCache);
                                                success(countryCodeCache);
                                                return;
                                            }

                                            // Função para salvar o código do país no cache
                                            function saveCountryToCache(code) {
                                                if (code) {
                                                    sessionStorage.setItem('country_code_cache', code);
                                                    sessionStorage.setItem('country_code_timestamp', new Date().getTime());
                                                }
                                            }

                                            // Método 1: ipinfo.io (principal)
                                            function tryIpInfoAPI() {
                                                console.log("Tentando ipinfo.io");
                                                $.get("https://ipinfo.io", function() {}, "jsonp")
                                                .done(function(resp) {
                                                    var countryCode = (resp && resp.country) ? resp.country : "";
                                                    if (countryCode) {
                                                        console.log("Geolocalização via ipinfo.io: " + countryCode);
                                                        saveCountryToCache(countryCode);
                                                        success(countryCode);
                                                    } else {
                                                        tryIpApiCom();
                                                    }
                                                })
                                                .fail(function() {
                                                    tryIpApiCom();
                                                });
                                            }
                                            
                                            // Método 2: ip-api.com (alternativa para Android)
                                            function tryIpApiCom() {
                                                console.log("Tentando ip-api.com");
                                                $.ajax({
                                                    url: 'https://ip-api.com/json/',
                                                    type: 'GET',
                                                    dataType: 'json',
                                                    success: function(data) {
                                                        if (data && data.countryCode) {
                                                            console.log("Geolocalização via ip-api.com: " + data.countryCode);
                                                            var code = data.countryCode.toLowerCase();
                                                            saveCountryToCache(code);
                                                            success(code);
                                                        } else {
                                                            tryGeoPlugin();
                                                        }
                                                    },
                                                    error: function() {
                                                        tryGeoPlugin();
                                                    }
                                                });
                                            }
                                            
                                            // Método 3: geoplugin.net (terceira alternativa)
                                            function tryGeoPlugin() {
                                                console.log("Tentando geoplugin.net");
                                                $.ajax({
                                                    url: 'https://www.geoplugin.net/json.gp',
                                                    type: 'GET',
                                                    dataType: 'json',
                                                    success: function(data) {
                                                        if (data && data.geoplugin_countryCode) {
                                                            console.log("Geolocalização via geoplugin: " + data.geoplugin_countryCode);
                                                            var code = data.geoplugin_countryCode.toLowerCase();
                                                            saveCountryToCache(code);
                                                            success(code);
                                                        } else {
                                                            // Falha em todos os métodos - usar padrão (EUA)
                                                            console.log("Geolocalização falhou, usando padrão: us");
                                                            saveCountryToCache('us');
                                                            success('us');
                                                        }
                                                    },
                                                    error: function() {
                                                        // Falha em todos os métodos - usar padrão (EUA)
                                                        console.log("Geolocalização falhou, usando padrão: us");
                                                        saveCountryToCache('us');
                                                        success('us');
                                                    }
                                                });
                                            }

                                            // Iniciar com o primeiro método
                                            tryIpInfoAPI();
                                         },
                                });     
                        }else{
                                var iti = field.intlTelInput({
                                        countrySearch: countrySearch,
                                        onlyCountries: onlyCountries_data,
                                        excludeCountries: exclude,
                                        initialCountry: initialCountry_data,
                                        preferredCountries: preferredCountries_data,
                                        utilsScript: elementor_tel.utilsScript,
                                        separateDialCode: true,
                                        hiddenInput: () => ({ phone: input})
                                });
                        }
                }
                // phon us
                $("body").on('keypress','.elementor-field-telephone-us', function(e) {
                          var key = e.charCode || e.keyCode || 0;
                          var phone = $(this);
                          if (phone.val().length === 0) {
                            phone.val(phone.val() + '(');
                          }
                          // Auto-format- do not expose the mask as the user begins to type
                          if (key !== 8 && key !== 9) {
                            if (phone.val().length === 4) {
                              phone.val(phone.val() + ')');
                            }
                            if (phone.val().length === 5) {
                              phone.val(phone.val() + ' ');
                            }
                            if (phone.val().length === 9) {
                              phone.val(phone.val() + '-');
                            }
                            if (phone.val().length >= 14) {
                              phone.val(phone.val().slice(0, 13));
                            }
                          }

                          // Allow numeric (and tab, backspace, delete) keys only
                          return (key == 8 ||
                            key == 9 ||
                            key == 46 ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                        })

                        .on('focus', function() {
                         var phone = $(this);

                          if (phone.val().length === 0) {
                            phone.val('(');
                          } else {
                            var val = phone.val();
                            phone.val('').val(val); // Ensure cursor remains at the end
                          }
                        })

                        .on('blur', function() {
                          var $phone = $(this);

                          if ($phone.val() === '(') {
                            $phone.val('');
                          }
                });

        $("body").on("change",".elementor-field-telephone",function(){
                var content = $.trim($(this).val());
                var check_field = $(this).closest('.elementor-field-type-telephone').find('.phone_check');
                var number = $(this).intlTelInput("getNumber");
                $(this).next().attr("value",number);
                $(this).next().val(number);
                if( $(this).data("validation") == "yes" && content.length > 0 ) {
                        var number = $(this).intlTelInput("getNumber");
                        if ($(this).intlTelInput("isValidNumber")) { 
                                check_field.attr("value","yes");
                                check_field.val("yes");
                                $(this).addClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid');     
                        }else{
                                check_field.attr("value","no");
                                check_field.val("no");
                                $(this).addClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid-blue');
                        }
                }
        })
        $( ".elementor-field-telephone" ).keyup(function( event ) {
                var check_field = $(this).closest('.elementor-field-type-telephone').find('.phone_check');
                var content = $.trim($(this).val());
                if( $(this).data("validation") == "yes"  ) {
                        if ($(this).intlTelInput("isValidNumber")) { 
                                check_field.attr("value","yes");
                                check_field.val("yes");
                                $(this).addClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid');     
                        }else{
                                check_field.attr("value","no");
                                check_field.val("no");
                                $(this).addClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid-blue');
                        }
                }
        }).keydown(function( event ) {
          
        });
        $("body").on("focus",".elementor-field-telephone",function(){
                $(this).removeClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red');
        })
                document.addEventListener("countrychange", function() {
                  $("input.elementor-field-telephone").change();
                });
        })
} )( jQuery );