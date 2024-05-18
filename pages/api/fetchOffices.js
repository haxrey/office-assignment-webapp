import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const offices = await prisma.office.findMany();
    res.status(200).json(offices);
  } catch (error) {
    console.error('Error fetching offices:', error);
    res.status(500).json({ error: 'Failed to fetch offices' });
  } finally {
    await prisma.$disconnect();
  }
}
