import { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const timestamp = new Date().toISOString().replace(/[:]/g, '-');
      const fileName = `save_assignment_${timestamp}.xlsx`;
      const directory = path.join(process.cwd(), 'public', 'assignments');
      

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const filePath = path.join(directory, fileName);

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Saved Assignment");

      XLSX.writeFile(wb, filePath);

      res.status(200).json({ message: `Assignment saved as: ${fileName}` });
    } catch (error) {
      console.error('Failed to save the assignment:', error);
      res.status(500).json({ error: 'Failed to save assignment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
