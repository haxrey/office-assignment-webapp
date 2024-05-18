import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:8000/optimize');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
}
