import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const staff = await prisma.staff.findMany({
      include: { department: true },
    });
    console.log('Staff fetched successfully:', staff);
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  } finally {
    await prisma.$disconnect();
  }
}
