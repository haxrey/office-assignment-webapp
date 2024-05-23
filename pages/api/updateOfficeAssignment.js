
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { staffId, officeId, removeOffice } = req.body;

    try {
      if (removeOffice) {
        const staff = await prisma.staff.findUnique({ where: { id: staffId } });
        if (staff.officeId) {
          await prisma.office.update({
            where: { id: staff.officeId },
            data: {
              currentOccupancy: {
                decrement: 1,
              },
            },
          });
        }

        await prisma.staff.update({
          where: { id: staffId },
          data: {
            officeId: null,
          },
        });

        res.status(200).json({ message: 'Office assignment removed successfully' });
      } else {
        const staff = await prisma.staff.findUnique({ where: { id: staffId } });

        if (staff.officeId) {
          await prisma.office.update({
            where: { id: staff.officeId },
            data: {
              currentOccupancy: {
                decrement: 1,
              },
            },
          });
        }

        const office = await prisma.office.update({
          where: { id: officeId },
          data: {
            currentOccupancy: {
              increment: 1,
            },
          },
        });

        await prisma.staff.update({
          where: { id: staffId },
          data: {
            officeId: officeId,
          },
        });

        res.status(200).json({ message: 'Office assignment updated successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update office assignment', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
