import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { department } = req.query;

  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'public', 'Departments-Mock-Data.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read data' });
        return;
      }

      const lines = data.split('\n');
      const result = [];
      let currentDepartment = '';
      let officeCounter = 1;
      const officeAssignments = {};

      for (let line of lines) {
        if (line.trim() === '') continue;

        if (!line.startsWith('Role:')) {
          currentDepartment = line.replace(':', '').trim();
        }

        if (!department || department === 'All Faculty' || currentDepartment === department) {
          if (line.startsWith('Role:')) {
            const role = line.match(/Role:(.*?) Name:/)[1].trim();
            const name = line.match(/Name:(.*)/)[1].trim();
            
            const floor = Math.floor((officeCounter - 1) / 20) + 1;
            const officeNumber = `D-${floor}${String(officeCounter).padStart(2, '0')}`;
            const currentOccupancy = Math.floor(Math.random() * 2) + 1;
            const capacity = Math.floor(Math.random() * 2) + 2;

            if (!officeAssignments[officeNumber]) {
              officeAssignments[officeNumber] = { currentOccupancy, capacity, floor };
              officeCounter++;
            }

            result.push({ role, name, department: currentDepartment, officeNumber, currentOccupancy, capacity, floor });
          }
        }
      }

      res.status(200).json(result);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
