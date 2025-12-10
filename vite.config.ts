import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ⭐ Nasłuchuj na wszystkich interfejsach
    port: 10623,
    strictPort: true,
    allowedHosts: [
      'localhost',
      'AiVision.local',
      'aivision.local',
      '127.0.0.1'
    ]
  }

})
