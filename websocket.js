import expressWs from 'express-ws';
import { getKategori } from './controller/Kategori.js'; // Mengimpor fungsi getCategory dari file controller

export default (app) => {
  const { app: wsApp } = expressWs(app);

  wsApp.ws('/websocket', (ws, req) => {
    ws.on('open', () => {
      console.log('Koneksi WebSocket dibuka');
    });

    ws.on('message', async (msg) => {
      console.log('Menerima pesan:', msg);

      if (msg === 'getCategory') {
        try {
          const categories = await getKategori();
          ws.send(JSON.stringify(categories));
        } catch (error) {
          console.log('Error:', error);
          ws.send(JSON.stringify({ error: 'Terjadi kesalahan saat mengambil kategori' }));
        }
      }
    });

    ws.on('close', () => {
      console.log('Koneksi WebSocket ditutup');
    });

    ws.send('Halo, klien WebSocket!');
  });
};
