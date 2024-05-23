
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

export default function handler(req, res) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);
    const excelFiles = files.filter(file => file.startsWith('save_assignment_') && file.endsWith('.xlsx'));

    if (excelFiles.length === 0) {
      res.status(404).json({ message: 'No assignment files found' });
      return;
    }

    const latestFile = excelFiles.reduce((a, b) => (a > b ? a : b));
    const filePath = path.join(publicDir, latestFile);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to read assignment files:', error);
    res.status(500).json({ message: 'Failed to read assignment files' });
  }
}
