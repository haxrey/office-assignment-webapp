import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const staff = await prisma.staff.findMany({
      include: {
        department: true,
      },
    });

    const offices = await prisma.office.findMany();

    // Function to assign a random office
    const getRandomOffice = () => offices[Math.floor(Math.random() * offices.length)];

    const staffWithOffices = staff.map(person => {
      const office = getRandomOffice();
      return {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        role: person.role,
        department: person.department.name,
        officeNumber: office.officeNumber,
        currentOccupancy: office.currentOccupancy,
        capacity: office.capacity,
        floor: office.floor,
      };
    });

    res.status(200).json(staffWithOffices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff assignments', error: error.message });
  }
}
