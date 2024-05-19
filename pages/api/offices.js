import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { officeNumber, capacity, location, floor } = req.body;
    try {
      const newOffice = await prisma.office.create({
        data: { officeNumber, capacity, location, floor },
      });
      res.status(201).json(newOffice);
    } catch (error) {
      console.error('Error creating office:', error);
      res.status(500).json({ error: 'Failed to create office' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
