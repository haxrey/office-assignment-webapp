
import axios from 'axios';

export default async function handler(req, res) {
  try {
    console.log('Sending request to FastAPI server...');
    const response = await axios.get('http://localhost:8000/optimizer');
    console.log('Response from FastAPI:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching optimization data:', error);
    res.status(500).json({ error: 'Error fetching optimization data' });
  }
}
