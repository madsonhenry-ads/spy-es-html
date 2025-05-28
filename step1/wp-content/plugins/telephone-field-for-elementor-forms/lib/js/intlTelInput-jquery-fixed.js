/*
 * International Telephone Input v18.3.3 - VERSÃO CORRIGIDA
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// Versão corrigida para resolver o problema de compatibilidade em hostingers
window.intlTelInputGlobals = window.intlTelInputGlobals || {
    getInstance: function(a) {
        var b = a.getAttribute("data-intl-tel-input-id");
        return window.intlTelInputGlobals.instances[b];
    },
    instances: {},
    documentReady: function() {
        return "complete" === document.readyState;
    }
};

// Função auxiliar para intlTelInput
(function($) {
    // Quando o DOM estiver pronto
    $(document).ready(function() {
        // Função para lidar com os erros que ocorrem ao chamar métodos do intlTelInput
        $.fn.intlTelInput = function(options) {
            var args = arguments;
            var result;
            
            this.each(function() {
                var input = this;
                var iti = window.intlTelInput(input, options);
                
                // Armazenar a instância na coleção global
                var id = input.getAttribute("data-intl-tel-input-id");
                if (!id) {
                    id = "iti-" + Math.random().toString(36).substring(2, 15);
                    input.setAttribute("data-intl-tel-input-id", id);
                }
                
                window.intlTelInputGlobals.instances[id] = iti;
                
                // Adicionando métodos diretamente ao elemento input para compatibilidade
                if (typeof args[0] === "string") {
                    // Se o primeiro argumento for uma string, estamos chamando um método
                    var methodName = args[0];
                    if (iti && typeof iti[methodName] === "function") {
                        result = iti[methodName].apply(iti, Array.prototype.slice.call(args, 1));
                        if (methodName === "destroy") {
                            delete window.intlTelInputGlobals.instances[id];
                        }
                    }
                }
            });
            
            // Se result não for undefined, retorne-o, caso contrário retorne this para encadeamento
            return (typeof result !== 'undefined') ? result : this;
        };
    });
})(jQuery);