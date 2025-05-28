import express from 'express';
import path from 'path';

// Inicializa o Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware para processar JSON
app.use(express.json());

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Define arquivos estáticos para as etapas do plugin
app.use('/step1', express.static(path.join(process.cwd(), 'step1')));
app.use('/step2', express.static(path.join(process.cwd(), 'step2')));
app.use('/step3', express.static(path.join(process.cwd(), 'step3')));

// Rota para servir o arquivo api.php
app.get('/api.php', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'api.php'));
});

// Rota para servir o arquivo SVG de perfil privado
app.get('/private_profile.svg', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'private_profile.svg'));
});

// Rota de teste para verificar se a API está funcionando
app.get('/test-api', (req, res) => {
  res.json({ status: 'API funcionando' });
});

// Rota de proxy para API do WhatsApp
app.get('/whatsapp/photo', async (req, res) => {
  try {
    const tel = req.query.tel as string;
    
    if (!tel) {
      return res.status(400).json({ success: false, error: 'Telefone inválido' });
    }
    
    // Remove qualquer caracter que não seja dígito
    const cleanPhone = tel.replace(/\D/g, '');
    
    // URL específica para a API do WhatsApp
    const apiUrl = `https://primary-production-aac6.up.railway.app/webhook/request_photo?tel=${cleanPhone}`;
    
    console.log('URL da API:', apiUrl);
    
    // Fazendo a requisição para a API com cabeçalhos específicos
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'https://whatspy.chat'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Responde com os dados da API
    return res.json({
      success: true,
      link: result.link || './private_profile.svg',
      is_photo_private: result.is_photo_private || false
    });
    
  } catch (error) {
    console.error('Erro na API do WhatsApp:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Rota inicial para teste
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Plugin de Telefone para Elementor</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1>Plugin de Telefone para Elementor</h1>
      <ul>
        <li><a href="/step1/">Etapa 1</a></li>
        <li><a href="/step2/">Etapa 2</a></li>
        <li><a href="/step3/">Etapa 3</a></li>
        <li><a href="/test-api">Teste da API</a></li>
      </ul>
    </body>
    </html>
  `);
});

// Inicia o servidor
app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
