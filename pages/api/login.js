import fs from 'fs';
import path from 'path';
import { comparePassword } from '../../utils/hashUtils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    res.status(200).json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
