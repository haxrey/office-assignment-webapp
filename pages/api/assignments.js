// pages/api/assignments.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const assignments = await prisma.office.findMany({
      include: {
        department: true,
        _count: {
          select: { staff: true }
        }
      }
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await prisma.$disconnect();
  }
}
