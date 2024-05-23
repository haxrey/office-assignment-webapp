// pages/api/getAvailableOffices.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const availableOffices = await prisma.office.findMany({
        where: {
          currentOccupancy: {
            lt: prisma.office.capacity,
          },
        },
        select: {
          id: true,
          officeNumber: true,
          floor: true,
        },
      });

      res.status(200).json(availableOffices);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch available offices', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
