import express from 'express';
import { memStorage } from './storage';
import { Request, Response } from 'express';

const router = express.Router();

// Rota de saúde para verificar se a API está funcionando
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

// Rota de proxy para API do WhatsApp
router.get('/whatsapp/photo', async (req: Request, res: Response) => {
  try {
    const { tel } = req.query;
    
    if (!tel || typeof tel !== 'string') {
      return res.status(400).json({ success: false, error: 'Teléfono inválido' });
    }
    
    // Remove qualquer caracter que não seja dígito
    const cleanPhone = tel.replace(/\D/g, '');
    
    // URL específica para a API do WhatsApp
    const apiUrl = `https://primary-production-aac6.up.railway.app/webhook/request_photo?tel=${cleanPhone}`;
    
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

// Exemplo de rota de API RESTful
router.get('/api/items', async (req: Request, res: Response) => {
  try {
    const items = await memStorage.getAll('items');
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
});

export default router;
