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

    let offices = await prisma.office.findMany();

    // Function to get a random office
    const getRandomOffice = () => offices[Math.floor(Math.random() * offices.length)];

    // Function to update office occupancy
    const updateOfficeOccupancy = (officeNumber) => {
      offices = offices.map(office => {
        if (office.officeNumber === officeNumber) {
          return {
            ...office,
            currentOccupancy: office.currentOccupancy + 1,
          };
        }
        return office;
      });
    };

    const staffWithOffices = staff.map(person => {
      const office = getRandomOffice();
      updateOfficeOccupancy(office.officeNumber);

      return {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        role: person.role,
        department: person.department.name,
        officeNumber: office.officeNumber,
        currentOccupancy: office.currentOccupancy + 1, // Increase by 1 to reflect the current assignment
        capacity: office.capacity,
        floor: office.floor,
      };
    });

    res.status(200).json(staffWithOffices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff assignments', error: error.message });
  }
}
