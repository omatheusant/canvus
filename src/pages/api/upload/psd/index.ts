import 'ag-psd/initialize-canvas'

import { NextApiRequest, NextApiResponse } from 'next';
import { readPsd, Layer } from 'ag-psd';
import {fabric} from 'fabric'

export const config = {
  api: {
    responseLimit: '10mb',
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const fileBuffer: Buffer = req.body;
      console.log('Received PSD file:', fileBuffer);

      // Use a função readPsd para processar o arquivo PSD
      const psd = readPsd(fileBuffer);

      // Função para converter camadas em imagens
      const convertLayersToImages = (layers: Layer[]): fabric.Image[] => {
        return layers.map((layer, i) => {
          const image = new fabric.Image(layer.canvas as any, {
            name: layer.name || `layer-${i}`,
            left: 0,
            top: 0,
            selectable: true,
          });
          return image;
        });
      };

      // Converter camadas para imagens
      const images = convertLayersToImages(psd.children || []);

      // Exemplo: Enviar imagens como resposta
      res.status(200).json({ success: true, images });
    } else {
      // Método HTTP não permitido
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error processing PSD:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
