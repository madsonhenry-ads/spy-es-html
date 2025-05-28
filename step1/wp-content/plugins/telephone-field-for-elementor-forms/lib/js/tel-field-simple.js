/**
 * Simplified phone field with country code
 * This version solves compatibility problems on servers like Hostinger
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se temos a lista completa de países adicionais
    let countries = [];

    // Flag para verificar se já inicializamos
    window.countriesInitialized = false;
    
    // Adicionar principais países primeiro (ordem de prioridade)
    countries.push({ name: 'United States', code: '+1', flag: '🇺🇸', dialCode: '1' });
    countries.push({ name: 'United Kingdom', code: '+44', flag: '🇬🇧', dialCode: '44' });
    countries.push({ name: 'Canada', code: '+1', flag: '🇨🇦', dialCode: '1' });
    countries.push({ name: 'Australia', code: '+61', flag: '🇦🇺', dialCode: '61' });
    countries.push({ name: 'Brazil', code: '+55', flag: '🇧🇷', dialCode: '55' });
    
    // Definir uma variável global para acessar a lista de países
    window.globalCountriesList = countries;

    // Adicionar todos os 195 países reconhecidos pela ONU
    // Continuando com os países restantes...
    countries.push({ name: 'Afghanistan', code: '+93', flag: '🇦🇫', dialCode: '93' });
    countries.push({ name: 'Albania', code: '+355', flag: '🇦🇱', dialCode: '355' });
    countries.push({ name: 'Algeria', code: '+213', flag: '🇩🇿', dialCode: '213' });
    countries.push({ name: 'Andorra', code: '+376', flag: '🇦🇩', dialCode: '376' });
    countries.push({ name: 'Angola', code: '+244', flag: '🇦🇴', dialCode: '244' });
    countries.push({ name: 'Antigua and Barbuda', code: '+1268', flag: '🇦🇬', dialCode: '1268' });
    countries.push({ name: 'Argentina', code: '+54', flag: '🇦🇷', dialCode: '54' });
    countries.push({ name: 'Armenia', code: '+374', flag: '🇦🇲', dialCode: '374' });
    countries.push({ name: 'Austria', code: '+43', flag: '🇦🇹', dialCode: '43' });
    countries.push({ name: 'Azerbaijan', code: '+994', flag: '🇦🇿', dialCode: '994' });
    countries.push({ name: 'Bahamas', code: '+1242', flag: '🇧🇸', dialCode: '1242' });
    countries.push({ name: 'Bahrain', code: '+973', flag: '🇧🇭', dialCode: '973' });
    countries.push({ name: 'Bangladesh', code: '+880', flag: '🇧🇩', dialCode: '880' });
    countries.push({ name: 'Barbados', code: '+1246', flag: '🇧🇧', dialCode: '1246' });
    countries.push({ name: 'Belarus', code: '+375', flag: '🇧🇾', dialCode: '375' });
    countries.push({ name: 'Belgium', code: '+32', flag: '🇧🇪', dialCode: '32' });
    countries.push({ name: 'Belize', code: '+501', flag: '🇧🇿', dialCode: '501' });
    countries.push({ name: 'Benin', code: '+229', flag: '🇧🇯', dialCode: '229' });
    countries.push({ name: 'Bhutan', code: '+975', flag: '🇧🇹', dialCode: '975' });
    countries.push({ name: 'Bolivia', code: '+591', flag: '🇧🇴', dialCode: '591' });
    countries.push({ name: 'Bosnia and Herzegovina', code: '+387', flag: '🇧🇦', dialCode: '387' });
    countries.push({ name: 'Botswana', code: '+267', flag: '🇧🇼', dialCode: '267' });
    countries.push({ name: 'Brunei', code: '+673', flag: '🇧🇳', dialCode: '673' });
    countries.push({ name: 'Bulgaria', code: '+359', flag: '🇧🇬', dialCode: '359' });
    countries.push({ name: 'Burkina Faso', code: '+226', flag: '🇧🇫', dialCode: '226' });
    countries.push({ name: 'Burundi', code: '+257', flag: '🇧🇮', dialCode: '257' });
    countries.push({ name: 'Cabo Verde', code: '+238', flag: '🇨🇻', dialCode: '238' });
    countries.push({ name: 'Cambodia', code: '+855', flag: '🇰🇭', dialCode: '855' });
    countries.push({ name: 'Cameroon', code: '+237', flag: '🇨🇲', dialCode: '237' });
    countries.push({ name: 'Central African Republic', code: '+236', flag: '🇨🇫', dialCode: '236' });
    countries.push({ name: 'Chad', code: '+235', flag: '🇹🇩', dialCode: '235' });
    countries.push({ name: 'Chile', code: '+56', flag: '🇨🇱', dialCode: '56' });
    countries.push({ name: 'China', code: '+86', flag: '🇨🇳', dialCode: '86' });
    countries.push({ name: 'Colombia', code: '+57', flag: '🇨🇴', dialCode: '57' });
    countries.push({ name: 'Comoros', code: '+269', flag: '🇰🇲', dialCode: '269' });
    countries.push({ name: 'Congo', code: '+242', flag: '🇨🇬', dialCode: '242' });
    countries.push({ name: 'Costa Rica', code: '+506', flag: '🇨🇷', dialCode: '506' });
    countries.push({ name: 'Croatia', code: '+385', flag: '🇭🇷', dialCode: '385' });
    countries.push({ name: 'Cuba', code: '+53', flag: '🇨🇺', dialCode: '53' });
    countries.push({ name: 'Cyprus', code: '+357', flag: '🇨🇾', dialCode: '357' });
    countries.push({ name: 'Czech Republic', code: '+420', flag: '🇨🇿', dialCode: '420' });
    countries.push({ name: 'Denmark', code: '+45', flag: '🇩🇰', dialCode: '45' });
    countries.push({ name: 'Djibouti', code: '+253', flag: '🇩🇯', dialCode: '253' });
    countries.push({ name: 'Dominica', code: '+1767', flag: '🇩🇲', dialCode: '1767' });
    countries.push({ name: 'Dominican Republic', code: '+1809', flag: '🇩🇴', dialCode: '1809' });
    countries.push({ name: 'DR Congo', code: '+243', flag: '🇨🇩', dialCode: '243' });
    countries.push({ name: 'Ecuador', code: '+593', flag: '🇪🇨', dialCode: '593' });
    countries.push({ name: 'Egypt', code: '+20', flag: '🇪🇬', dialCode: '20' });
    countries.push({ name: 'El Salvador', code: '+503', flag: '🇸🇻', dialCode: '503' });
    countries.push({ name: 'Equatorial Guinea', code: '+240', flag: '🇬🇶', dialCode: '240' });
    countries.push({ name: 'Eritrea', code: '+291', flag: '🇪🇷', dialCode: '291' });
    countries.push({ name: 'Estonia', code: '+372', flag: '🇪🇪', dialCode: '372' });
    countries.push({ name: 'Eswatini', code: '+268', flag: '🇸🇿', dialCode: '268' });
    countries.push({ name: 'Ethiopia', code: '+251', flag: '🇪🇹', dialCode: '251' });
    countries.push({ name: 'Fiji', code: '+679', flag: '🇫🇯', dialCode: '679' });
    countries.push({ name: 'Finland', code: '+358', flag: '🇫🇮', dialCode: '358' });
    countries.push({ name: 'France', code: '+33', flag: '🇫🇷', dialCode: '33' });
    countries.push({ name: 'Gabon', code: '+241', flag: '🇬🇦', dialCode: '241' });
    countries.push({ name: 'Gambia', code: '+220', flag: '🇬🇲', dialCode: '220' });
    countries.push({ name: 'Georgia', code: '+995', flag: '🇬🇪', dialCode: '995' });
    countries.push({ name: 'Germany', code: '+49', flag: '🇩🇪', dialCode: '49' });
    countries.push({ name: 'Ghana', code: '+233', flag: '🇬🇭', dialCode: '233' });
    countries.push({ name: 'Greece', code: '+30', flag: '🇬🇷', dialCode: '30' });
    countries.push({ name: 'Grenada', code: '+1473', flag: '🇬🇩', dialCode: '1473' });
    countries.push({ name: 'Guatemala', code: '+502', flag: '🇬🇹', dialCode: '502' });
    countries.push({ name: 'Guinea', code: '+224', flag: '🇬🇳', dialCode: '224' });
    countries.push({ name: 'Guinea-Bissau', code: '+245', flag: '🇬🇼', dialCode: '245' });
    countries.push({ name: 'Guyana', code: '+592', flag: '🇬🇾', dialCode: '592' });
    countries.push({ name: 'Haiti', code: '+509', flag: '🇭🇹', dialCode: '509' });
    countries.push({ name: 'Honduras', code: '+504', flag: '🇭🇳', dialCode: '504' });
    countries.push({ name: 'Hungary', code: '+36', flag: '🇭🇺', dialCode: '36' });
    countries.push({ name: 'Iceland', code: '+354', flag: '🇮🇸', dialCode: '354' });
    countries.push({ name: 'India', code: '+91', flag: '🇮🇳', dialCode: '91' });
    countries.push({ name: 'Indonesia', code: '+62', flag: '🇮🇩', dialCode: '62' });
    countries.push({ name: 'Iran', code: '+98', flag: '🇮🇷', dialCode: '98' });
    countries.push({ name: 'Iraq', code: '+964', flag: '🇮🇶', dialCode: '964' });
    countries.push({ name: 'Ireland', code: '+353', flag: '🇮🇪', dialCode: '353' });
    countries.push({ name: 'Israel', code: '+972', flag: '🇮🇱', dialCode: '972' });
    countries.push({ name: 'Italy', code: '+39', flag: '🇮🇹', dialCode: '39' });
    countries.push({ name: 'Ivory Coast', code: '+225', flag: '🇨🇮', dialCode: '225' });
    countries.push({ name: 'Jamaica', code: '+1876', flag: '🇯🇲', dialCode: '1876' });
    countries.push({ name: 'Japan', code: '+81', flag: '🇯🇵', dialCode: '81' });
    countries.push({ name: 'Jordan', code: '+962', flag: '🇯🇴', dialCode: '962' });
    countries.push({ name: 'Kazakhstan', code: '+7', flag: '🇰🇿', dialCode: '7' });
    countries.push({ name: 'Kenya', code: '+254', flag: '🇰🇪', dialCode: '254' });
    countries.push({ name: 'Kiribati', code: '+686', flag: '🇰🇮', dialCode: '686' });
    countries.push({ name: 'Kuwait', code: '+965', flag: '🇰🇼', dialCode: '965' });
    countries.push({ name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬', dialCode: '996' });
    countries.push({ name: 'Laos', code: '+856', flag: '🇱🇦', dialCode: '856' });
    countries.push({ name: 'Latvia', code: '+371', flag: '🇱🇻', dialCode: '371' });
    countries.push({ name: 'Lebanon', code: '+961', flag: '🇱🇧', dialCode: '961' });
    countries.push({ name: 'Lesotho', code: '+266', flag: '🇱🇸', dialCode: '266' });
    countries.push({ name: 'Liberia', code: '+231', flag: '🇱🇷', dialCode: '231' });
    countries.push({ name: 'Libya', code: '+218', flag: '🇱🇾', dialCode: '218' });
    countries.push({ name: 'Liechtenstein', code: '+423', flag: '🇱🇮', dialCode: '423' });
    countries.push({ name: 'Lithuania', code: '+370', flag: '🇱🇹', dialCode: '370' });
    countries.push({ name: 'Luxembourg', code: '+352', flag: '🇱🇺', dialCode: '352' });
    countries.push({ name: 'Madagascar', code: '+261', flag: '🇲🇬', dialCode: '261' });
    countries.push({ name: 'Malawi', code: '+265', flag: '🇲🇼', dialCode: '265' });
    countries.push({ name: 'Malaysia', code: '+60', flag: '🇲🇾', dialCode: '60' });
    countries.push({ name: 'Maldives', code: '+960', flag: '🇲🇻', dialCode: '960' });
    countries.push({ name: 'Mali', code: '+223', flag: '🇲🇱', dialCode: '223' });
    countries.push({ name: 'Malta', code: '+356', flag: '🇲🇹', dialCode: '356' });
    countries.push({ name: 'Marshall Islands', code: '+692', flag: '🇲🇭', dialCode: '692' });
    countries.push({ name: 'Mauritania', code: '+222', flag: '🇲🇷', dialCode: '222' });
    countries.push({ name: 'Mauritius', code: '+230', flag: '🇲🇺', dialCode: '230' });
    countries.push({ name: 'Mexico', code: '+52', flag: '🇲🇽', dialCode: '52' });
    countries.push({ name: 'Micronesia', code: '+691', flag: '🇫🇲', dialCode: '691' });
    countries.push({ name: 'Moldova', code: '+373', flag: '🇲🇩', dialCode: '373' });
    countries.push({ name: 'Monaco', code: '+377', flag: '🇲🇨', dialCode: '377' });
    countries.push({ name: 'Mongolia', code: '+976', flag: '🇲🇳', dialCode: '976' });
    countries.push({ name: 'Montenegro', code: '+382', flag: '🇲🇪', dialCode: '382' });
    countries.push({ name: 'Morocco', code: '+212', flag: '🇲🇦', dialCode: '212' });
    countries.push({ name: 'Mozambique', code: '+258', flag: '🇲🇿', dialCode: '258' });
    countries.push({ name: 'Myanmar', code: '+95', flag: '🇲🇲', dialCode: '95' });
    countries.push({ name: 'Namibia', code: '+264', flag: '🇳🇦', dialCode: '264' });
    countries.push({ name: 'Nauru', code: '+674', flag: '🇳🇷', dialCode: '674' });
    countries.push({ name: 'Nepal', code: '+977', flag: '🇳🇵', dialCode: '977' });
    countries.push({ name: 'Netherlands', code: '+31', flag: '🇳🇱', dialCode: '31' });
    countries.push({ name: 'New Zealand', code: '+64', flag: '🇳🇿', dialCode: '64' });
    countries.push({ name: 'Nicaragua', code: '+505', flag: '🇳🇮', dialCode: '505' });
    countries.push({ name: 'Niger', code: '+227', flag: '🇳🇪', dialCode: '227' });
    countries.push({ name: 'Nigeria', code: '+234', flag: '🇳🇬', dialCode: '234' });
    countries.push({ name: 'North Korea', code: '+850', flag: '🇰🇵', dialCode: '850' });
    countries.push({ name: 'North Macedonia', code: '+389', flag: '🇲🇰', dialCode: '389' });
    countries.push({ name: 'Norway', code: '+47', flag: '🇳🇴', dialCode: '47' });
    countries.push({ name: 'Oman', code: '+968', flag: '🇴🇲', dialCode: '968' });
    countries.push({ name: 'Pakistan', code: '+92', flag: '🇵🇰', dialCode: '92' });
    countries.push({ name: 'Palau', code: '+680', flag: '🇵🇼', dialCode: '680' });
    countries.push({ name: 'Palestine', code: '+970', flag: '🇵🇸', dialCode: '970' });
    countries.push({ name: 'Panama', code: '+507', flag: '🇵🇦', dialCode: '507' });
    countries.push({ name: 'Papua New Guinea', code: '+675', flag: '🇵🇬', dialCode: '675' });
    countries.push({ name: 'Paraguay', code: '+595', flag: '🇵🇾', dialCode: '595' });
    countries.push({ name: 'Peru', code: '+51', flag: '🇵🇪', dialCode: '51' });
    countries.push({ name: 'Philippines', code: '+63', flag: '🇵🇭', dialCode: '63' });
    countries.push({ name: 'Poland', code: '+48', flag: '🇵🇱', dialCode: '48' });
    countries.push({ name: 'Portugal', code: '+351', flag: '🇵🇹', dialCode: '351' });
    countries.push({ name: 'Qatar', code: '+974', flag: '🇶🇦', dialCode: '974' });
    countries.push({ name: 'Romania', code: '+40', flag: '🇷🇴', dialCode: '40' });
    countries.push({ name: 'Russia', code: '+7', flag: '🇷🇺', dialCode: '7' });
    countries.push({ name: 'Rwanda', code: '+250', flag: '🇷🇼', dialCode: '250' });
    countries.push({ name: 'Saint Kitts and Nevis', code: '+1869', flag: '🇰🇳', dialCode: '1869' });
    countries.push({ name: 'Saint Lucia', code: '+1758', flag: '🇱🇨', dialCode: '1758' });
    countries.push({ name: 'Saint Vincent and the Grenadines', code: '+1784', flag: '🇻🇨', dialCode: '1784' });
    countries.push({ name: 'Samoa', code: '+685', flag: '🇼🇸', dialCode: '685' });
    countries.push({ name: 'San Marino', code: '+378', flag: '🇸🇲', dialCode: '378' });
    countries.push({ name: 'Sao Tome and Principe', code: '+239', flag: '🇸🇹', dialCode: '239' });
    countries.push({ name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', dialCode: '966' });
    countries.push({ name: 'Senegal', code: '+221', flag: '🇸🇳', dialCode: '221' });
    countries.push({ name: 'Serbia', code: '+381', flag: '🇷🇸', dialCode: '381' });
    countries.push({ name: 'Seychelles', code: '+248', flag: '🇸🇨', dialCode: '248' });
    countries.push({ name: 'Sierra Leone', code: '+232', flag: '🇸🇱', dialCode: '232' });
    countries.push({ name: 'Singapore', code: '+65', flag: '🇸🇬', dialCode: '65' });
    countries.push({ name: 'Slovakia', code: '+421', flag: '🇸🇰', dialCode: '421' });
    countries.push({ name: 'Slovenia', code: '+386', flag: '🇸🇮', dialCode: '386' });
    countries.push({ name: 'Solomon Islands', code: '+677', flag: '🇸🇧', dialCode: '677' });
    countries.push({ name: 'Somalia', code: '+252', flag: '🇸🇴', dialCode: '252' });
    countries.push({ name: 'South Africa', code: '+27', flag: '🇿🇦', dialCode: '27' });
    countries.push({ name: 'South Korea', code: '+82', flag: '🇰🇷', dialCode: '82' });
    countries.push({ name: 'South Sudan', code: '+211', flag: '🇸🇸', dialCode: '211' });
    countries.push({ name: 'Spain', code: '+34', flag: '🇪🇸', dialCode: '34' });
    countries.push({ name: 'Sri Lanka', code: '+94', flag: '🇱🇰', dialCode: '94' });
    countries.push({ name: 'Sudan', code: '+249', flag: '🇸🇩', dialCode: '249' });
    countries.push({ name: 'Suriname', code: '+597', flag: '🇸🇷', dialCode: '597' });
    countries.push({ name: 'Sweden', code: '+46', flag: '🇸🇪', dialCode: '46' });
    countries.push({ name: 'Switzerland', code: '+41', flag: '🇨🇭', dialCode: '41' });
    countries.push({ name: 'Syria', code: '+963', flag: '🇸🇾', dialCode: '963' });
    countries.push({ name: 'Tajikistan', code: '+992', flag: '🇹🇯', dialCode: '992' });
    countries.push({ name: 'Tanzania', code: '+255', flag: '🇹🇿', dialCode: '255' });
    countries.push({ name: 'Thailand', code: '+66', flag: '🇹🇭', dialCode: '66' });
    countries.push({ name: 'Timor-Leste', code: '+670', flag: '🇹🇱', dialCode: '670' });
    countries.push({ name: 'Togo', code: '+228', flag: '🇹🇬', dialCode: '228' });
    countries.push({ name: 'Tonga', code: '+676', flag: '🇹🇴', dialCode: '676' });
    countries.push({ name: 'Trinidad and Tobago', code: '+1868', flag: '🇹🇹', dialCode: '1868' });
    countries.push({ name: 'Tunisia', code: '+216', flag: '🇹🇳', dialCode: '216' });
    countries.push({ name: 'Turkey', code: '+90', flag: '🇹🇷', dialCode: '90' });
    countries.push({ name: 'Turkmenistan', code: '+993', flag: '🇹🇲', dialCode: '993' });
    countries.push({ name: 'Tuvalu', code: '+688', flag: '🇹🇻', dialCode: '688' });
    countries.push({ name: 'Uganda', code: '+256', flag: '🇺🇬', dialCode: '256' });
    countries.push({ name: 'Ukraine', code: '+380', flag: '🇺🇦', dialCode: '380' });
    countries.push({ name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', dialCode: '971' });
    countries.push({ name: 'Uruguay', code: '+598', flag: '🇺🇾', dialCode: '598' });
    countries.push({ name: 'Uzbekistan', code: '+998', flag: '🇺🇿', dialCode: '998' });
    countries.push({ name: 'Vanuatu', code: '+678', flag: '🇻🇺', dialCode: '678' });
    countries.push({ name: 'Vatican City', code: '+379', flag: '🇻🇦', dialCode: '379' });
    countries.push({ name: 'Venezuela', code: '+58', flag: '🇻🇪', dialCode: '58' });
    countries.push({ name: 'Vietnam', code: '+84', flag: '🇻🇳', dialCode: '84' });
    countries.push({ name: 'Yemen', code: '+967', flag: '🇾🇪', dialCode: '967' });
    countries.push({ name: 'Zambia', code: '+260', flag: '🇿🇲', dialCode: '260' });
    countries.push({ name: 'Zimbabwe', code: '+263', flag: '🇿🇼', dialCode: '263' });

    // Verificar se allCountryCodes está disponível e é um array
    if (typeof allCountryCodes !== 'undefined' && Array.isArray(allCountryCodes)) {
        console.log("Usando lista completa de países: " + allCountryCodes.length + " países disponíveis");
    } else {
        console.log("Usando lista reduzida de países: " + countries.length + " países");
    }

    // Detectar país usando geolocalização com vários métodos
    function detectUserCountry(callback) {
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
            callback(countryCodeCache);
            return;
        }

        // Função para salvar o código do país no cache
        function saveCountryToCache(code) {
            if (code) {
                sessionStorage.setItem('country_code_cache', code);
                sessionStorage.setItem('country_code_timestamp', new Date().getTime());
            }
        }

        // Método 1: ipinfo.io
        function tryIpInfoAPI() {
            console.log("Tentando ipinfo.io");
            fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(data => {
                    if (data && data.country) {
                        console.log("Geolocalização via ipinfo.io: " + data.country);
                        var countryCode = data.country.toLowerCase();
                        saveCountryToCache(countryCode);
                        callback(countryCode);
                    } else {
                        tryIpApiCom();
                    }
                })
                .catch(() => {
                    tryIpApiCom();
                });
        }
        
        // Método 2: ip-api.com (alternativa para Android)
        function tryIpApiCom() {
            console.log("Tentando ip-api.com");
            fetch('https://ip-api.com/json/')
                .then(response => response.json())
                .then(data => {
                    if (data && data.countryCode) {
                        console.log("Geolocalização via ip-api.com: " + data.countryCode);
                        var countryCode = data.countryCode.toLowerCase();
                        saveCountryToCache(countryCode);
                        callback(countryCode);
                    } else {
                        tryGeoPlugin();
                    }
                })
                .catch(() => {
                    tryGeoPlugin();
                });
        }
        
        // Método 3: geoplugin.net
        function tryGeoPlugin() {
            console.log("Tentando geoplugin.net");
            fetch('https://www.geoplugin.net/json.gp')
                .then(response => response.json())
                .then(data => {
                    if (data && data.geoplugin_countryCode) {
                        console.log("Geolocalização via geoplugin: " + data.geoplugin_countryCode);
                        var countryCode = data.geoplugin_countryCode.toLowerCase();
                        saveCountryToCache(countryCode);
                        callback(countryCode);
                    } else {
                        callback('us'); // Default para US se falhar
                    }
                })
                .catch(() => {
                    callback('us'); // Default para US se falhar
                });
        }

        // Iniciar com o primeiro método
        tryIpInfoAPI();
    }

    // Garantir que não há duplicação de países
    // Cria um conjunto de países únicos baseado no nome
    let uniqueCountries = [];
    let countryNames = new Set();
    
    for (let country of countries) {
        if (!countryNames.has(country.name)) {
            countryNames.add(country.name);
            uniqueCountries.push(country);
        }
    }
    
    console.log(`Filtrado de ${countries.length} para ${uniqueCountries.length} países únicos`);
    countries = uniqueCountries;
    
    // Definir novamente a variável global com os países únicos
    window.globalCountriesList = countries;
    
    // Default country (Estados Unidos até detectarmos o país do usuário)
    let selectedCountry = countries[0];
    
    // Detectar país do usuário
    detectUserCountry(function(countryCode) {
        // Procurar o país correspondente na lista
        const detectedCountry = countries.find(country => {
            // Extrair código ISO do país da bandeira (assumindo que o código está no formato correto)
            const countryFlag = country.flag.codePointAt(0) - 127397;
            const countryFlagCode = String.fromCharCode(countryFlag).toLowerCase();
            const anotherCountryFlag = country.flag.codePointAt(2) - 127397;
            const anotherCountryFlagCode = String.fromCharCode(anotherCountryFlag).toLowerCase();
            return countryCode === (countryFlagCode + anotherCountryFlagCode);
        });
        
        if (detectedCountry) {
            console.log("País detectado: " + detectedCountry.name);
            selectedCountry = detectedCountry;
            
            // Atualizar o seletor de país se ele já estiver criado
            const flagSpan = document.querySelector('.country-flag');
            const codeSpan = document.querySelector('.country-code');
            if (flagSpan && codeSpan) {
                flagSpan.innerHTML = selectedCountry.flag;
                codeSpan.textContent = selectedCountry.code;
            }
        }
    });

    // Function to create a phone field with country selector
    function createSimplePhoneField() {
        // Remove any old instance of IntlTelInput
        const oldContainers = document.querySelectorAll('.iti');
        if (oldContainers.length > 0) {
            oldContainers.forEach(container => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            });
        }
        
        // Find the phone field
        const phoneInputs = document.querySelectorAll('.elementor-field-type-telephone input');
        if (phoneInputs.length === 0) return;
        
        // Get the first phone field
        const input = phoneInputs[0];
        
        // Hide the original field
        input.style.display = 'none';
        
        // Create a container for our new field
        const container = document.createElement('div');
        container.className = 'simple-tel-input-container';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.width = '100%';
        
        // Add the container before the field
        input.parentNode.insertBefore(container, input);
        
        // Create the country code dropdown
        const countrySelect = document.createElement('div');
        countrySelect.className = 'country-select';
        countrySelect.style.position = 'relative';
        countrySelect.style.display = 'flex';
        countrySelect.style.alignItems = 'center';
        countrySelect.style.padding = '8px';
        countrySelect.style.backgroundColor = '#f5f5f5';
        countrySelect.style.borderRadius = '4px 0 0 4px';
        countrySelect.style.cursor = 'pointer';
        countrySelect.style.border = '1px solid #ddd';
        countrySelect.style.borderRight = 'none';
        
        // Add the flag
        const flagSpan = document.createElement('span');
        flagSpan.className = 'country-flag';
        flagSpan.innerHTML = selectedCountry.flag;
        flagSpan.style.marginRight = '5px';
        flagSpan.style.fontSize = '20px';
        
        // Add the country code
        const codeSpan = document.createElement('span');
        codeSpan.className = 'country-code';
        codeSpan.textContent = selectedCountry.code;
        codeSpan.style.fontWeight = 'bold';
        
        // Add arrow to indicate dropdown
        const arrowSpan = document.createElement('span');
        arrowSpan.innerHTML = '&#9662;';
        arrowSpan.style.marginLeft = '5px';
        arrowSpan.style.fontSize = '12px';
        
        countrySelect.appendChild(flagSpan);
        countrySelect.appendChild(codeSpan);
        countrySelect.appendChild(arrowSpan);
        
        // Create the phone number input field
        const phoneField = document.createElement('input');
        phoneField.type = 'tel';
        phoneField.className = 'simple-phone-field';
        phoneField.placeholder = 'Enter phone number';
        phoneField.style.flex = '1';
        phoneField.style.padding = '10px';
        phoneField.style.border = '1px solid #ddd';
        phoneField.style.borderRadius = '0 4px 4px 0';
        phoneField.style.fontSize = '16px';

        // Function to update the original field with the selected country
        function updateOriginalInput() {
            input.value = selectedCountry.code + ' ' + phoneField.value;
            // Add the country code as a data attribute for easy access
            input.setAttribute('data-country-code', selectedCountry.dialCode);
        }
        
        // Add filter to allow only numbers
        phoneField.addEventListener('input', function() {
            // Remove anything that is not a digit
            this.value = this.value.replace(/[^\d]/g, '');
            
            // Update the original field
            updateOriginalInput();
        });
        
        // Create the country dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'country-dropdown';
        dropdown.style.position = 'absolute';
        dropdown.style.top = '100%';
        dropdown.style.left = '0';
        dropdown.style.zIndex = '1000';
        dropdown.style.backgroundColor = 'white';
        dropdown.style.border = '1px solid #ddd';
        dropdown.style.borderRadius = '4px';
        dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        dropdown.style.width = '250px';
        dropdown.style.maxHeight = '300px';
        dropdown.style.overflowY = 'auto';
        dropdown.style.display = 'none';
        
        // Add list of countries
        countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.style.padding = '8px 12px';
            countryItem.style.cursor = 'pointer';
            countryItem.style.display = 'flex';
            countryItem.style.alignItems = 'center';
            
            // Add hover effect
            countryItem.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f0f0f0';
            });
            
            countryItem.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'transparent';
            });
            
            // Add flag
            const itemFlag = document.createElement('span');
            itemFlag.className = 'item-flag';
            itemFlag.innerHTML = country.flag;
            itemFlag.style.marginRight = '8px';
            itemFlag.style.fontSize = '20px';
            
            // Add name and code
            const itemText = document.createElement('span');
            itemText.textContent = country.name + ' ' + country.code;
            
            countryItem.appendChild(itemFlag);
            countryItem.appendChild(itemText);
            
            // When clicking on a country
            countryItem.addEventListener('click', function() {
                selectedCountry = country;
                flagSpan.innerHTML = country.flag;
                codeSpan.textContent = country.code;
                dropdown.style.display = 'none';
                updateOriginalInput();
            });
            
            dropdown.appendChild(countryItem);
        });
        
        // Add dropdown to document
        document.body.appendChild(dropdown);
        
        // Open/close dropdown when clicking on selector
        countrySelect.addEventListener('click', function(e) {
            e.stopPropagation();
            const rect = countrySelect.getBoundingClientRect();
            dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            dropdown.style.left = (rect.left + window.scrollX) + 'px';
            
            if (dropdown.style.display === 'none') {
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdown.style.display = 'none';
        });
        
        // If there's already a value in the original field, extract the number and fill the simplified field
        if (input.value) {
            // Remove country code and spaces
            const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
            phoneField.value = phoneNumber;
        } else {
            // Set default value in original field
            updateOriginalInput();
        }
        
        // Add elements to container
        container.appendChild(countrySelect);
        container.appendChild(phoneField);
        
        // When form is submitted
        const form = input.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                // Ensure the original field value is correct
                updateOriginalInput();
                
                // Modify form submission handler to include country code in request
                if (typeof testarAPI === 'function') {
                    const originalTestarAPI = testarAPI;
                    
                    window.testarAPI = function() {
                        console.log('Sending request with country code: ' + selectedCountry.dialCode);
                        return originalTestarAPI();
                    };
                }
                
                // Check for fetch handlers to include country code
                const originalFetch = window.fetch;
                window.fetch = function(url, options) {
                    if (url === '../api.php' && options && options.body) {
                        try {
                            const body = JSON.parse(options.body);
                            
                            // Check if we're sending a phone number
                            if (body.tel) {
                                // Add country code
                                body.country = selectedCountry.dialCode;
                                
                                // Update options with new body
                                options.body = JSON.stringify(body);
                                console.log('API request modified with country: ' + selectedCountry.dialCode);
                            }
                        } catch (e) {
                            console.error('Error modifying request', e);
                        }
                    }
                    
                    return originalFetch.call(this, url, options);
                };
            });
        }
        
        console.log('Phone field with country selection initialized!');
    }
    
    // Create simplified field after a small delay
    setTimeout(createSimplePhoneField, 500);
});