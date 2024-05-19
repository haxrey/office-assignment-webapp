const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const computerEngineering = await prisma.department.create({
    data: {
      name: 'Computer Engineering',
    },
  });

  const softwareEngineering = await prisma.department.create({
    data: {
      name: 'Software Engineering',
    },
  });

  const industrialEngineering = await prisma.department.create({
    data: {
      name: 'Industrial Engineering',
    },
  });

  const biomedicalEngineering = await prisma.department.create({
    data: {
      name: 'Biomedical Engineering',
    },
  });

  const electricalEngineering = await prisma.department.create({
    data: {
      name: 'Electrical and Electronics Engineering',
    },
  });

  const energySystemsEngineering = await prisma.department.create({
    data: {
      name: 'Energy Systems Engineering',
    },
  });

  const molecularBiology = await prisma.department.create({
    data: {
      name: 'Molecular Biology and Genetics',
    },
  });

  const civilEngineering = await prisma.department.create({
    data: {
      name: 'Civil Engineering',
    },
  });

  const managementEngineering = await prisma.department.create({
    data: {
      name: 'Management Engineering',
    },
  });

  const mechatronicsEngineering = await prisma.department.create({
    data: {
      name: 'Mechatronics Engineering',
    },
  });

  const artificialIntelligence = await prisma.department.create({
    data: {
      name: 'Artificial Intelligence Engineering',
    },
  });

  // Create Staff Members for each department
  await prisma.staff.createMany({
    data: [
      // Computer Engineering
      { firstName: 'Tevfik', lastName: 'AYTEKIN', role: 'Assoc. Prof. (Department Chair)', departmentId: computerEngineering.id },
      { firstName: 'Tarkan', lastName: 'AYDIN', role: 'Assist Prof.', departmentId: computerEngineering.id },
      { firstName: 'Cemal Okan', lastName: 'ŞAKAR', role: 'Assoc. Prof.', departmentId: computerEngineering.id },
      { firstName: 'Ece Gelal', lastName: 'SOYAK', role: 'Assist Prof.', departmentId: computerEngineering.id },
      { firstName: 'Erkut', lastName: 'ARICAN', role: 'Assist Prof.', departmentId: computerEngineering.id },
      { firstName: 'Günet', lastName: 'EROĞLU', role: 'Assist Prof.', departmentId: computerEngineering.id },
      { firstName: 'Ömer Melih', lastName: 'GÜL', role: 'Assist Prof. (Part Time)', departmentId: computerEngineering.id },
      { firstName: 'Selin', lastName: 'NACAKLI', role: 'Assist Prof.', departmentId: computerEngineering.id },
      { firstName: 'Merve AYYÜCE', lastName: 'KIZRAK', role: 'Ph.D', departmentId: computerEngineering.id },
      { firstName: 'Hassan', lastName: 'İMANİ', role: 'Ph.D', departmentId: computerEngineering.id },
      
      // Software Engineering
      { firstName: 'Ayla', lastName: 'GÜLCÜ', role: 'Assoc. Prof. (Department Chair)', departmentId: softwareEngineering.id },
      { firstName: 'Yücel Batu', lastName: 'SALMAN', role: 'Assoc. Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Pınar', lastName: 'BÖLÜK', role: 'Assoc. Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Ahmet Naci', lastName: 'ÜNAL', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Betül ERDOĞDU', lastName: 'ŞAKAR', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Derya', lastName: 'BODUR', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Özge', lastName: 'YÜCEL KASAP', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Tamer', lastName: 'UÇAR', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'İsmail', lastName: 'DURU', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Duygu ÇAKIR', lastName: 'YENİDOĞAN', role: 'Assist Prof.', departmentId: softwareEngineering.id },
      { firstName: 'Merve', lastName: 'ARITÜRK', role: 'Teaching Assist.', departmentId: softwareEngineering.id },
      { firstName: 'Simge', lastName: 'AKAY', role: 'Teaching Assist.', departmentId: softwareEngineering.id },
      { firstName: 'Marwa Issam Abdulkareem', lastName: 'ABDULKAREEM', role: 'Arş. Gör.', departmentId: softwareEngineering.id },

      // Industrial Engineering
      { firstName: 'Tankut', lastName: 'ATAN', role: 'Prof. (Department Chair)', departmentId: industrialEngineering.id },
      { firstName: 'Gül Tekin', lastName: 'TEMUR', role: 'Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Mustafa', lastName: 'ÖZBAYRAK', role: 'Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Ahmet', lastName: 'BEŞKESE', role: 'Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Oğuzhan', lastName: 'ERDİNÇ', role: 'Assoc. Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Adnan', lastName: 'ÇORUM', role: 'Assoc. Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Ayşe', lastName: 'KAVUŞTURUCU', role: 'Assist Prof.', departmentId: industrialEngineering.id },
      { firstName: 'Elif Haktanır', lastName: 'AKTAŞ', role: 'Assist Prof.', departmentId: industrialEngineering.id },

      // Biomedical Engineering
      { firstName: 'Hakan', lastName: 'SOLMAZ', role: 'Assist Prof. (Department Chair)', departmentId: biomedicalEngineering.id },
      { firstName: 'Burcu TUNÇ', lastName: 'ÇAMLIBEL', role: 'Assist Prof.', departmentId: biomedicalEngineering.id },
      { firstName: 'Bora', lastName: 'BÜYÜKSARAÇ', role: 'Assist Prof.', departmentId: biomedicalEngineering.id },
      { firstName: 'Lavdie', lastName: 'RADA', role: 'Assist Prof.', departmentId: biomedicalEngineering.id },
      { firstName: 'Canan', lastName: 'BAĞCI', role: 'Assist Prof.', departmentId: biomedicalEngineering.id },
      { firstName: 'Ali', lastName: 'GÜZEL', role: 'Teaching Assist.', departmentId: biomedicalEngineering.id },
      { firstName: 'Baran', lastName: 'ARAS', role: 'Teaching Assist.', departmentId: biomedicalEngineering.id },
      { firstName: 'Engin', lastName: 'BAYSOY', role: 'Assist Prof.', departmentId: biomedicalEngineering.id },

      // Electrical and Electronics Engineering
      { firstName: 'Şeref', lastName: 'KALEM', role: 'Prof. (Department Chair)', departmentId: electricalEngineering.id },
      { firstName: 'BÜLENT', lastName: 'ULUG', role: 'Prof.', departmentId: electricalEngineering.id },
      { firstName: 'Recep', lastName: 'DİMİTROV', role: 'Prof.', departmentId: electricalEngineering.id },
      { firstName: 'Saeid', lastName: 'KARAMZADEH', role: 'Prof.', departmentId: electricalEngineering.id },
      { firstName: 'Suzan', lastName: 'ÜRETEN', role: 'Assist Prof.', departmentId: electricalEngineering.id },
      { firstName: 'Mehmet Can', lastName: 'ALPHAN', role: 'Teaching Assist.', departmentId: electricalEngineering.id },
      { firstName: 'Muhammed Cemal', lastName: 'DEMİR', role: 'Teaching Assist.', departmentId: electricalEngineering.id },
      { firstName: 'Merve İlay', lastName: 'ÇELİKKAYA', role: 'Teaching Assist.', departmentId: electricalEngineering.id },
      { firstName: 'Mehmet Ziya', lastName: 'EREOĞLU', role: 'Teaching Assist.', departmentId: electricalEngineering.id },
      { firstName: 'Duygu', lastName: 'ÜÇÜNCÜ', role: 'Arş. Gör.', departmentId: electricalEngineering.id },

      // Energy Systems Engineering
      { firstName: 'Gürkan', lastName: 'SOYKAN', role: 'Assist Prof. (Department Chair)', departmentId: energySystemsEngineering.id },
      { firstName: 'Suleyman', lastName: 'Allakhverdiev', role: 'Prof.', departmentId: energySystemsEngineering.id },
      { firstName: 'Nezihe', lastName: 'YILDIRAN', role: 'Assist Prof.', departmentId: energySystemsEngineering.id },
      { firstName: 'Hüseyin Günhan', lastName: 'ÖZCAN', role: 'Assist Prof.', departmentId: energySystemsEngineering.id },
      { firstName: 'Selen', lastName: 'YOLDAŞ', role: 'Teaching Assist.', departmentId: energySystemsEngineering.id },

      // Molecular Biology and Genetics
      { firstName: 'Cemalettin', lastName: 'BEKPEN', role: 'Assist Prof. (Department Chair)', departmentId: molecularBiology.id },
      { firstName: 'Ömer Lütfi', lastName: 'UYANIK', role: 'Assist Prof.', departmentId: molecularBiology.id },
      { firstName: 'Elif', lastName: 'EREN', role: 'Assist Prof.', departmentId: molecularBiology.id },
      { firstName: 'Merve', lastName: 'SEVEN', role: 'Assist Prof.', departmentId: molecularBiology.id },
      { firstName: 'Sezai', lastName: 'TÜRKEL', role: 'Prof. (Part Time)', departmentId: molecularBiology.id },
      { firstName: 'Dilek', lastName: 'ÇEVİK', role: 'Assist Prof.', departmentId: molecularBiology.id },
      { firstName: 'Hamza', lastName: 'Bayhan', role: 'Arş. Gör.', departmentId: molecularBiology.id },
      { firstName: 'Fatma Özge', lastName: 'ASLAN', role: 'Arş. Gör.', departmentId: molecularBiology.id },

      // Civil Engineering
      { firstName: 'Lütfi', lastName: 'ARDA', role: 'Prof. (Department Chair)', departmentId: civilEngineering.id },
      { firstName: 'Dilruba', lastName: 'ÖZMEN', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'İrem', lastName: 'ŞANAL', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'Mesut', lastName: 'NEĞİN', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'Gökhan', lastName: 'GELİŞEN', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'İbrahim Ertuğrul', lastName: 'YALÇIN', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'Kübra', lastName: 'DEĞERLİ', role: 'Teaching Assist.', departmentId: civilEngineering.id },
      { firstName: 'Ahmet Can', lastName: 'MERT', role: 'Assist Prof.', departmentId: civilEngineering.id },
      { firstName: 'Anıl', lastName: 'ÇELİK', role: 'Dr. (Part Time)', departmentId: civilEngineering.id },

      // Management Engineering
      { firstName: 'Sait', lastName: 'GÜL', role: 'Assoc. Prof. (Department Chair)', departmentId: managementEngineering.id },
      { firstName: 'Tunç', lastName: 'BOZBURA', role: 'Prof.', departmentId: managementEngineering.id },
      { firstName: 'Alper', lastName: 'CAMCI', role: 'Assoc. Prof.', departmentId: managementEngineering.id },
      { firstName: 'M. ASLI', lastName: 'AYDIN', role: 'Assoc. Prof.', departmentId: managementEngineering.id },
      { firstName: 'Çağlar', lastName: 'SİVRİ', role: 'Assoc. Prof.', departmentId: managementEngineering.id },
      { firstName: 'Selçuk', lastName: 'TUZCUOĞLU', role: 'Assoc. Prof.', departmentId: managementEngineering.id },
      { firstName: 'Ozan Rıdvan', lastName: 'AKSU', role: 'Teaching Assist.', departmentId: managementEngineering.id },
      { firstName: 'Cihangir', lastName: 'GÜMÜŞTAŞ', role: 'Assist Prof.', departmentId: managementEngineering.id },
      { firstName: 'Mehmet Emin', lastName: 'YILDIZ', role: 'Assist Prof.', departmentId: managementEngineering.id },
      { firstName: 'Nur Asena', lastName: 'Gün', role: 'Arş. Gör.', departmentId: managementEngineering.id },

      // Mechatronics Engineering
      { firstName: 'Yalçın', lastName: 'ÇEKİÇ', role: 'Assoc. Prof. (Department Chair)', departmentId: mechatronicsEngineering.id },
      { firstName: 'Ozan', lastName: 'AKDOĞAN', role: 'Prof.', departmentId: mechatronicsEngineering.id },
      { firstName: 'Lütfi', lastName: 'ARDA', role: 'Prof.', departmentId: mechatronicsEngineering.id },
      { firstName: 'Amir', lastName: 'NAVIDFAR', role: 'Assist Prof.', departmentId: mechatronicsEngineering.id },
      { firstName: 'M. Senem', lastName: 'Seven', role: 'Assist Prof.', departmentId: mechatronicsEngineering.id },
      { firstName: 'Beste', lastName: 'BAHÇECİ', role: 'Dr. Öğr Üyesi', departmentId: mechatronicsEngineering.id },
      { firstName: 'Durul', lastName: 'ULUTAN', role: 'Dr. Öğr. Üyesi', departmentId: mechatronicsEngineering.id },
      { firstName: 'Sevgi', lastName: 'CANPOLAT ATABAY', role: 'Teaching Assist.', departmentId: mechatronicsEngineering.id },

      // Artificial Intelligence Engineering
      { firstName: 'Fatih', lastName: 'KAHRAMAN', role: 'Assist Prof. (Department Chair)', departmentId: artificialIntelligence.id },
      { firstName: 'Mehmet Raşit', lastName: 'Eskicioğlu', role: 'Prof.', departmentId: artificialIntelligence.id },
      { firstName: 'Binnur', lastName: 'KURT', role: 'Assist Prof.', departmentId: artificialIntelligence.id },
      { firstName: 'Tamer', lastName: 'UÇAR', role: 'Assist Prof.', departmentId: artificialIntelligence.id },
      { firstName: 'Merve AYYÜCE', lastName: 'KIZRAK', role: 'Ph.D', departmentId: artificialIntelligence.id },
      { firstName: 'Mustafa Ümit', lastName: 'ÖNER', role: 'Assist Prof.', departmentId: artificialIntelligence.id },
    ],
  });

  // Create Offices
  const offices = [
    { floor: 2, officeNumber: 'D307', capacity: 2 },
    { floor: 2, officeNumber: 'D308', capacity: 2 },
    { floor: 2, officeNumber: 'D309', capacity: 2 },
    { floor: 2, officeNumber: 'D310', capacity: 2 },
    { floor: 2, officeNumber: 'D311', capacity: 2 },
    { floor: 2, officeNumber: 'D312', capacity: 2 },
    { floor: 2, officeNumber: 'D313', capacity: 2 },
    { floor: 2, officeNumber: 'D314', capacity: 2 },
    { floor: 2, officeNumber: 'D315', capacity: 2 },
    { floor: 2, officeNumber: 'D316', capacity: 2 },
    { floor: 2, officeNumber: 'D317', capacity: 2 },
    { floor: 2, officeNumber: 'D318', capacity: 2 },
    { floor: 2, officeNumber: 'D319', capacity: 2 },
    { floor: 2, officeNumber: 'D320', capacity: 2 },
    { floor: 2, officeNumber: 'D321', capacity: 2 },
    { floor: 2, officeNumber: 'D322', capacity: 2 },
    { floor: 2, officeNumber: 'D323', capacity: 2 },
    { floor: 2, officeNumber: 'D324', capacity: 2 },
    { floor: 2, officeNumber: 'D325', capacity: 2 },
    { floor: 2, officeNumber: 'D326', capacity: 2 },
    { floor: 2, officeNumber: 'D330', capacity: 2 },
    { floor: 2, officeNumber: 'D331', capacity: 2 },
    { floor: 2, officeNumber: 'D333', capacity: 2 },
    { floor: 3, officeNumber: 'D407', capacity: 3 },
    { floor: 3, officeNumber: 'D408', capacity: 2 },
    { floor: 3, officeNumber: 'D409', capacity: 3 },
    { floor: 3, officeNumber: 'D410', capacity: 3 },
    { floor: 3, officeNumber: 'D411', capacity: 2 },
    { floor: 3, officeNumber: 'D413', capacity: 2 },
    { floor: 3, officeNumber: 'D414', capacity: 2 },
    { floor: 3, officeNumber: 'D415', capacity: 2 },
    { floor: 3, officeNumber: 'D416', capacity: 2 },
    { floor: 3, officeNumber: 'D417', capacity: 2 },
    { floor: 3, officeNumber: 'D418', capacity: 2 },
    { floor: 3, officeNumber: 'D419', capacity: 1 },
    { floor: 3, officeNumber: 'D420', capacity: 2 },
    { floor: 3, officeNumber: 'D430', capacity: 2 },
    { floor: 3, officeNumber: 'D431', capacity: 2 },
    { floor: 3, officeNumber: 'D432', capacity: 2 },
    { floor: 3, officeNumber: 'D433', capacity: 2 },
    { floor: 3, officeNumber: 'D434', capacity: 2 },
    { floor: 3, officeNumber: 'D436', capacity: 1 },
    { floor: 3, officeNumber: 'D437', capacity: 2 },
    { floor: 3, officeNumber: 'D438', capacity: 2 },
    { floor: 3, officeNumber: 'D440', capacity: 2 },
    { floor: 3, officeNumber: 'D441', capacity: 2 },
    { floor: 4, officeNumber: 'D504', capacity: 1 },
    { floor: 4, officeNumber: 'D505', capacity: 1 },
    { floor: 4, officeNumber: 'D509', capacity: 1 },
    { floor: 4, officeNumber: 'D510', capacity: 1 },
    { floor: 4, officeNumber: 'D511', capacity: 2 },
    { floor: 4, officeNumber: 'D512', capacity: 1 },
    { floor: 4, officeNumber: 'D513', capacity: 1 },
    { floor: 4, officeNumber: 'D515', capacity: 1 },
    { floor: 4, officeNumber: 'D516', capacity: 1 },
    { floor: 4, officeNumber: 'D517', capacity: 1 },
    { floor: 4, officeNumber: 'D519', capacity: 1 },
    { floor: 4, officeNumber: 'D521', capacity: 2 },
    { floor: 4, officeNumber: 'D525', capacity: 1 },
    { floor: 4, officeNumber: 'D526', capacity: 2 },
    { floor: 4, officeNumber: 'D527', capacity: 2 },
    { floor: 4, officeNumber: 'D528', capacity: 2 },
    { floor: 4, officeNumber: 'D529', capacity: 2 },
    { floor: 4, officeNumber: 'D530', capacity: 2 },
    { floor: 4, officeNumber: 'D531', capacity: 2 },
    { floor: 4, officeNumber: 'D532', capacity: 4 },
    { floor: 4, officeNumber: 'D533', capacity: 2 },
    { floor: 4, officeNumber: 'D534', capacity: 2 },
    { floor: 4, officeNumber: 'D535', capacity: 2 },
  ];

  await prisma.office.createMany({
    data: offices.map(office => ({
      ...office,
      location: 'D building',
    })),
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
