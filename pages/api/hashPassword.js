import { hashPassword } from '../../utils/hashUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    try {
      const hashedPassword = await hashPassword(password);
      console.log('Hashed Password:', hashedPassword); // For testing purposes
      res.status(200).json({ hashedPassword });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
