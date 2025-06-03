// Script para importar datos de un archivo Excel (.xlsx) a la API usando solicitudes HTTP
// Ejecutar dentro del contenedor backend o con Node.js local
const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');

const API_URL = process.env.API_URL || 'http://node-backend:8000'; // Cambia si usas otro host/puerto
const EXCEL_FILE = path.join(__dirname, 'ejemplo_importacion.xlsx');

async function importarSheet(sheetName, endpoint) {
  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    console.error(`No se encontró la hoja: ${sheetName}`);
    return;
  }
  const data = XLSX.utils.sheet_to_json(sheet);
  for (const row of data) {
    try {
      await axios.post(`${API_URL}${endpoint}`, row);
      console.log(`Importado en ${endpoint}:`, row);
    } catch (e) {
      console.error(`Error importando en ${endpoint}:`, row, e.response?.data || e.message);
    }
  }
}

(async () => {
  await importarSheet('signature', '/signature/create');
  await importarSheet('Program', '/program/create');
  console.log('Importación finalizada.');
})();
