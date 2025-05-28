document.addEventListener('DOMContentLoaded', function() {
    // Remover todos os estilos duplicados para evitar problemas na Hostinger
    const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
    const uniqueHrefs = new Set();
    
    // Identificar estilos duplicados relacionados ao intlTelInput
    styleSheets.forEach(sheet => {
        if (sheet.href && sheet.href.includes('intlTelInput')) {
            if (uniqueHrefs.has(sheet.href)) {
                // Se já vimos este URL antes, remova-o
                sheet.parentNode.removeChild(sheet);
            } else {
                // Caso contrário, adicione-o ao nosso conjunto
                uniqueHrefs.add(sheet.href);
            }
        }
    });
    // Remove completamente todas as instâncias de IntlTelInput já existentes
    const existingContainers = document.querySelectorAll('.iti');
    existingContainers.forEach(container => {
        // Remover completamente para prevenir o problema de múltiplas bandeiras
        if (container.parentNode) {
            // Encontrar o input original antes de remover o container
            const input = container.querySelector('input');
            if (input) {
                // Clonar o input para preservar seus atributos
                const clonedInput = input.cloneNode(true);
                // Substituir o container pelo input original
                container.parentNode.replaceChild(clonedInput, container);
            } else {
                container.parentNode.removeChild(container);
            }
        }
    });
    
    // Find all telephone input fields in Elementor forms
    const phoneInputs = document.querySelectorAll('.elementor-field-type-telephone input');
    
    // If there are phone inputs, initialize intlTelInput on each of them
    if (phoneInputs.length > 0) {
        // Use recursos já carregados no <head> em vez de carregar novamente
        setTimeout(function() {
                    // Initialize intlTelInput on each phone input - apenas no primeiro campo de entrada para evitar duplicação
                    const input = phoneInputs[0];
                    
                    if (!input.dataset.itiInitialized) {
                        // Sobrescreve quaisquer atributos data-* no input
                        input.setAttribute('data-defcountry', 'fr');
                        
                        const iti = window.intlTelInput(input, {
                            initialCountry: 'fr', // Default to France
                            preferredCountries: ['fr', 'es', 'de', 'it', 'gb'],
                            utilsScript: './wp-content/plugins/telephone-field-for-elementor-forms/lib/js/utils.js',
                            separateDialCode: true,
                            autoPlaceholder: 'off' // Desativar o placeholder automático que está substituindo o código do país
                        });
                        
                        // Store the intlTelInput instance on the input element
                        input.iti = iti;
                        input.dataset.itiInitialized = "true";
                        
                        // Adicionar evento keypress para prevenir a digitação de caracteres não numéricos
                        input.addEventListener('keypress', function(e) {
                            // Permitir apenas teclas de controle (backspace, delete, etc) e números
                            const key = String.fromCharCode(e.charCode);
                            if (!/^\d$/.test(key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                                return false;
                            }
                        });
                        
                        // Forçar o país inicial para França 
                        iti.setCountry('fr');
                        
                        // Adicionar o código do país inicial (França +33) imediatamente
                        const initialCountryData = iti.getSelectedCountryData();
                        const initialDialCode = initialCountryData.dialCode;
                        
                        // Forçar o código do país no campo, independentemente do valor atual
                        const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
                        input.value = '+' + initialDialCode + ' ' + phoneNumber;
                        
                        // Força novamente após um pequeno atraso para garantir que o código seja exibido
                        setTimeout(function() {
                            const countryData = iti.getSelectedCountryData();
                            const dialCode = countryData.dialCode;
                            if (!input.value.startsWith('+' + dialCode)) {
                                input.value = '+' + dialCode + ' ' + (input.value.replace(/^\+\d+\s*/, ''));
                            }
                        }, 200);
                        
                        // Ao mudar o país, atualizar automaticamente o valor do campo com o código do país
                        input.addEventListener('countrychange', function() {
                            const countryData = iti.getSelectedCountryData();
                            const dialCode = countryData.dialCode;
                            
                            // Adicionar o código do país ao campo de entrada se já não estiver presente
                            if (!input.value.startsWith('+' + dialCode)) {
                                // Limpar qualquer código de país anterior
                                const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
                                input.value = '+' + dialCode + ' ' + phoneNumber;
                            }
                        });
                        
                        // Adicionar eventos de focus e blur para garantir que o código do país permaneça
                        input.addEventListener('focus', function() {
                            // Quando o campo ganha foco, verificar se o código do país ainda está lá
                            const countryData = iti.getSelectedCountryData();
                            const dialCode = countryData.dialCode;
                            
                            if (!input.value.startsWith('+' + dialCode)) {
                                // Se o código do país não estiver presente, readicioná-lo
                                const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
                                input.value = '+' + dialCode + ' ' + phoneNumber;
                            }
                        });
                        
                        input.addEventListener('blur', function() {
                            // Quando o campo perde foco, verificar se o código do país ainda está lá
                            const countryData = iti.getSelectedCountryData();
                            const dialCode = countryData.dialCode;
                            
                            if (!input.value.startsWith('+' + dialCode)) {
                                // Se o código do país não estiver presente, readicioná-lo
                                const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
                                input.value = '+' + dialCode + ' ' + phoneNumber;
                            }
                        });
                        
                        // Também adicionar evento input para garantir que o código do país não seja removido
                        // e para permitir apenas números no campo
                        input.addEventListener('input', function() {
                            const countryData = iti.getSelectedCountryData();
                            const dialCode = countryData.dialCode;
                            
                            // Remover caracteres não numéricos (exceto + e espaço)
                            const dialCodePrefix = '+' + dialCode + ' ';
                            let valueWithoutPrefix = input.value.substring(dialCodePrefix.length);
                            
                            // Remover todos os caracteres que não sejam dígitos
                            valueWithoutPrefix = valueWithoutPrefix.replace(/[^\d]/g, '');
                            
                            // Recompor o valor com o código do país
                            input.value = dialCodePrefix + valueWithoutPrefix;
                            
                            // Garantir que o código do país esteja sempre presente
                            if (!input.value.startsWith('+' + dialCode)) {
                                input.value = dialCodePrefix + valueWithoutPrefix;
                            }
                            
                            // Reposicionar o cursor após o código do país + espaço
                            const cursorPosition = Math.max(('+' + dialCode + ' ').length, input.selectionStart);
                            input.setSelectionRange(cursorPosition, cursorPosition);
                        });
                        
                        // When submitting the form, ensure the full number with country code is used
                        const form = input.closest('form');
                        if (form) {
                            form.addEventListener('submit', function(e) {
                                if (iti.isValidNumber()) {
                                    // Garantir que o número completo com código do país seja usado
                                    input.value = iti.getNumber();
                                }
                            });
                        }
                        
                        console.log('IntlTelInput initialized for phone field');
                    }
                }, 100);
    }
    
    // Helper function to load JavaScript files dynamically
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }
    
    // Helper function to load CSS files dynamically
    function loadStylesheet(url, callback) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = callback;
        document.head.appendChild(link);
    }
});