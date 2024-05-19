
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const exceljs = require('exceljs');

// I edited this so it fetches data correctly from the Prisma DB! :) -Nour
async function getOfficeAssignments() {
    return await prisma.officeAssignment.findMany({
        select: {
            id: true,
            user: {
                select: {
                    username: true
                }
            },
            office: {
                select: {
                    officeNumber: true
                }
            },
            assignedDate: true
        }
    });
}

// Here we generate an Excel file with the office assignments data
async function generateOfficeAssignmentsExcel() {
    const data = await getOfficeAssignments();

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Office Assignments');

    // Litearlly just headers :)
    worksheet.addRow(['ID', 'User', 'Office', 'Assigned Date']);

    // this one adds the data to the worksheet!
    data.forEach(({ id, user, office, assignedDate }) => {
        worksheet.addRow([id, user.username, office.officeNumber, assignedDate.toISOString()]);
    });

    // Saves the workbook to a file :>
    await workbook.xlsx.writeFile('office_assignments.xlsx');
    console.log('Excel file has been created and saved as "office_assignments.xlsx"');
}

module.exports = {
    getOfficeAssignments,
    generateOfficeAssignmentsExcel
};

//we can also optionally run the Excel generation function directly when the module is called from command line
if (require.main === module) {
    generateOfficeAssignmentsExcel().catch(err => {
        console.error("Failed to generate Office Assignments Excel:", err);
    });
}
