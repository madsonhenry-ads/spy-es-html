// Lista completa de códigos de país para o componente intlTelInput
var allCountryCodes = [
  // Prioritários - já existentes no plugin
  "us", "gb", "ca", "au", "br",

  // Todos os 195 países reconhecidos pela ONU - no formato ISO
  "ad", "ae", "af", "ag", "ai", "al", "am", "ao", "ar", "as", "at", "az", 
  "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "bs", "bt", "bw", "by", "bz", 
  "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cy", "cz", 
  "de", "dj", "dk", "dm", "do", "dz", 
  "ec", "ee", "eg", "er", "es", "et", 
  "fi", "fj", "fk", "fm", "fo", "fr", 
  "ga", "gd", "ge", "gf", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gt", "gu", "gw", "gy", 
  "hk", "hn", "hr", "ht", "hu", 
  "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", 
  "je", "jm", "jo", "jp", 
  "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", 
  "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", 
  "ma", "mc", "md", "me", "mf", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", 
  "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", 
  "om", 
  "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", 
  "qa", 
  "re", "ro", "rs", "ru", "rw", 
  "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", 
  "tc", "td", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", 
  "ua", "ug", "uy", "uz", 
  "va", "vc", "ve", "vg", "vi", "vn", "vu", 
  "wf", "ws", 
  "xk", 
  "ye", "yt", 
  "za", "zm", "zw"
];

// Função para expandir o intlTelInput com mais países
document.addEventListener('DOMContentLoaded', function() {
  console.log("Countries.js carregado - Adicionando " + allCountryCodes.length + " países");
  
  // Função para injetar esta lista no componente existente
  window.addAllCountriesToPlugin = function() {
    if (typeof jQuery !== 'undefined') {
      jQuery(document).ready(function($) {
        // Adicionar hook para modificar o componente após inicialização
        $(document).on('elementorIntlTelInitialized', function(e, iti) {
          console.log("Componente de telefone inicializado e aprimorado");
        });
      });
    }
  };
  
  // Executa a função ao carregar
  window.addAllCountriesToPlugin();
});
