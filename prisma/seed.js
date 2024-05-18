const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const departmentsData = [
    { name: 'Computer Engineering' },
    { name: 'Software Engineering' },
    { name: 'Industrial Engineering' },
    { name: 'Biomedical Engineering' },
    { name: 'Electrical and Electronics Engineering' },
    { name: 'Energy Systems Engineering' },
    { name: 'Molecular Biology and Genetics' },
    { name: 'Civil Engineering' },
    { name: 'Management Engineering' },
    { name: 'Mechatronics Engineering' },
    { name: 'Artificial Intelligence Engineering' },
  ];

  const departments = {};
  for (const departmentData of departmentsData) {
    const department = await prisma.department.create({
      data: departmentData,
    });
    departments[department.name] = department;
  }

  const officesData = [
    { officeNumber: 'D112', capacity: 2, currentOccupancy: 0, departmentId: departments['Computer Engineering'].id, location: 'D-Block', floor: 1 },
    { officeNumber: 'D113', capacity: 3, currentOccupancy: 0, departmentId: departments['Computer Engineering'].id, location: 'D-Block', floor: 1 },
    { officeNumber: 'D114', capacity: 2, currentOccupancy: 0, departmentId: departments['Computer Engineering'].id, location: 'D-Block', floor: 1 },
    { officeNumber: 'D115', capacity: 2, currentOccupancy: 0, departmentId: departments['Computer Engineering'].id, location: 'D-Block', floor: 1 },
    { officeNumber: 'D116', capacity: 2, currentOccupancy: 0, departmentId: departments['Computer Engineering'].id, location: 'D-Block', floor: 1 },
    { officeNumber: 'D212', capacity: 2, currentOccupancy: 0, departmentId: departments['Software Engineering'].id, location: 'D-Block', floor: 2 },
    { officeNumber: 'D213', capacity: 3, currentOccupancy: 0, departmentId: departments['Software Engineering'].id, location: 'D-Block', floor: 2 },
    { officeNumber: 'D214', capacity: 2, currentOccupancy: 0, departmentId: departments['Software Engineering'].id, location: 'D-Block', floor: 2 },
    { officeNumber: 'D215', capacity: 2, currentOccupancy: 0, departmentId: departments['Software Engineering'].id, location: 'D-Block', floor: 2 },
    { officeNumber: 'D216', capacity: 2, currentOccupancy: 0, departmentId: departments['Software Engineering'].id, location: 'D-Block', floor: 2 },
    { officeNumber: 'D312', capacity: 2, currentOccupancy: 0, departmentId: departments['Industrial Engineering'].id, location: 'D-Block', floor: 3 },
    { officeNumber: 'D313', capacity: 3, currentOccupancy: 0, departmentId: departments['Industrial Engineering'].id, location: 'D-Block', floor: 3 },
    { officeNumber: 'D314', capacity: 2, currentOccupancy: 0, departmentId: departments['Industrial Engineering'].id, location: 'D-Block', floor: 3 },
    { officeNumber: 'D315', capacity: 2, currentOccupancy: 0, departmentId: departments['Industrial Engineering'].id, location: 'D-Block', floor: 3 },
    { officeNumber: 'D316', capacity: 2, currentOccupancy: 0, departmentId: departments['Industrial Engineering'].id, location: 'D-Block', floor: 3 },
    { officeNumber: 'D412', capacity: 2, currentOccupancy: 0, departmentId: departments['Biomedical Engineering'].id, location: 'D-Block', floor: 4 },
    { officeNumber: 'D413', capacity: 3, currentOccupancy: 0, departmentId: departments['Biomedical Engineering'].id, location: 'D-Block', floor: 4 },
    { officeNumber: 'D414', capacity: 2, currentOccupancy: 0, departmentId: departments['Biomedical Engineering'].id, location: 'D-Block', floor: 4 },
    { officeNumber: 'D415', capacity: 2, currentOccupancy: 0, departmentId: departments['Biomedical Engineering'].id, location: 'D-Block', floor: 4 },
    { officeNumber: 'D416', capacity: 2, currentOccupancy: 0, departmentId: departments['Biomedical Engineering'].id, location: 'D-Block', floor: 4 },
  ];

  for (const officeData of officesData) {
    await prisma.office.create({
      data: officeData,
    });
  }

  const staffData = [
    { firstName: 'Cemal Okan', lastName: 'ÇAKAR', role: 'Assoc. Prof.', department: 'Computer Engineering' },
    { firstName: 'Ece Gelal', lastName: 'SOYAK', role: 'Assist Prof.', department: 'Computer Engineering' },
    { firstName: 'Erkut', lastName: 'ARICAN', role: 'Assist Prof.', department: 'Computer Engineering' },
    { firstName: 'Günet', lastName: 'EROĞLU', role: 'Assist Prof.', department: 'Computer Engineering' },
    { firstName: 'Ömer Melih', lastName: 'GÜL', role: 'Assist Prof.', department: 'Computer Engineering' },
    { firstName: 'Ayla', lastName: 'GÜLCÜ', role: 'Department Chair', department: 'Software Engineering' },
    { firstName: 'Yücel Batu', lastName: 'SALMAN', role: 'Assoc. Prof.', department: 'Software Engineering' },
    { firstName: 'Ahmet Naci', lastName: 'İNA', role: 'Assist Prof.', department: 'Software Engineering' },
    { firstName: 'Betül Erdoğdu', lastName: 'ŞAKAR', role: 'Assist Prof.', department: 'Software Engineering' },
    { firstName: 'Derya', lastName: 'BODUR', role: 'Assist Prof.', department: 'Software Engineering' },
    { firstName: 'Gül Tekin', lastName: 'TEMUR', role: 'Prof.', department: 'Industrial Engineering' },
    { firstName: 'Ahmet', lastName: 'BEKESE', role: 'Prof.', department: 'Industrial Engineering' },
    { firstName: 'Oğuzhan', lastName: 'ERDİNÇ', role: 'Assoc. Prof.', department: 'Industrial Engineering' },
    { firstName: 'Adnan', lastName: 'ÇORUM', role: 'Assoc. Prof.', department: 'Industrial Engineering' },
    { firstName: 'Ayşe', lastName: 'KAVUŞTURUCU', role: 'Assist Prof.', department: 'Industrial Engineering' },
    { firstName: 'Hakan', lastName: 'SOLMAZ', role: 'Department Chair', department: 'Biomedical Engineering' },
    { firstName: 'Burcu Tunç', lastName: 'ÇAMLIBEL', role: 'Assist Prof.', department: 'Biomedical Engineering' },
    { firstName: 'Bora', lastName: 'BÜYÜKSARAÇ', role: 'Assist Prof.', department: 'Biomedical Engineering' },
    { firstName: 'Lavdie', lastName: 'RADA', role: 'Assist Prof.', department: 'Biomedical Engineering' },
    { firstName: 'Canan', lastName: 'BAĞCI', role: 'Assist Prof.', department: 'Biomedical Engineering' },
    { firstName: 'Şeref', lastName: 'KALEM', role: 'Department Chair', department: 'Electrical and Electronics Engineering' },
    { firstName: 'Bülent', lastName: 'ULUG', role: 'Prof.', department: 'Electrical and Electronics Engineering' },
    { firstName: 'Recep', lastName: 'DİMİTROV', role: 'Prof.', department: 'Electrical and Electronics Engineering' },
    { firstName: 'Saeid', lastName: 'KARAMZADEH', role: 'Prof.', department: 'Electrical and Electronics Engineering' },
    { firstName: 'Suzan', lastName: 'ÜRETEN', role: 'Assist Prof.', department: 'Electrical and Electronics Engineering' },
    { firstName: 'Gürkan', lastName: 'SOYKAN', role: 'Department Chair', department: 'Energy Systems Engineering' },
    { firstName: 'Suleyman', lastName: 'Allakhverdiev', role: 'Prof.', department: 'Energy Systems Engineering' },
    { firstName: 'Nezihe', lastName: 'YILDIRAN', role: 'Assist Prof.', department: 'Energy Systems Engineering' },
    { firstName: 'Hüseyin Günhan', lastName: 'ÖZCAN', role: 'Assist Prof.', department: 'Energy Systems Engineering' },
    { firstName: 'Selen', lastName: 'YOLDAŞ', role: 'Teaching Assist.', department: 'Energy Systems Engineering' },
  ];

  for (const staff of staffData) {
    const department = departments[staff.department];
    await prisma.staff.create({
      data: {
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role,
        departmentId: department.id,
      },
    });
  }

  const allStaff = await prisma.staff.findMany();
  const allOffices = await prisma.office.findMany();

  for (const staff of allStaff) {
    const randomOffice = allOffices[Math.floor(Math.random() * allOffices.length)];
    await prisma.office.update({
      where: { id: randomOffice.id },
      data: {
        currentOccupancy: {
          increment: 1,
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
