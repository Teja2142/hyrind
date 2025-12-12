import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
=======
export default defineConfig({
  plugins: [react()],
  base: '/',   // IMPORTANT FIX
>>>>>>> 7ef1d77d4afc265b27b9e9f4fb00885373ee2114
})
