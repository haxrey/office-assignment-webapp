import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const offices = await prisma.office.findMany({
                include: {
                    Department: true
                }
            });
            res.status(200).json(offices);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {

        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}