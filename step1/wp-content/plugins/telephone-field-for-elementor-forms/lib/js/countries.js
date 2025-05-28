// Arquivo de países complementar para o componente de telefone

document.addEventListener('DOMContentLoaded', function() {
  console.log("Countries.js carregado - Verificando lista de países");
  
  // Verificar se já temos a lista de países completa definida no tel-field-simple.js
  if (window.globalCountriesList && window.globalCountriesList.length > 190) {
    console.log("Lista completa de países já carregada: " + window.globalCountriesList.length + " países");
  } else {
    console.log("Lista de países ainda não está disponível ou incompleta");
  }
  
  // Verificamos se há priorização de países conforme solicitado
  if (window.globalCountriesList && window.globalCountriesList.length > 0) {
    const prioridadeDesejada = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Brazil'];
    const primeirosNomes = window.globalCountriesList.slice(0, 5).map(c => c.name);
    
    // Verificar se os primeiros 5 países são os prioritários
    const temPrioridade = prioridadeDesejada.every(nome => 
      primeirosNomes.some(atual => atual.includes(nome)));
    
    console.log("Países prioritários configurados corretamente: " + (temPrioridade ? "Sim" : "Não"));
  }
});
