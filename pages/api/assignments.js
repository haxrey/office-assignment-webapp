// pages/api/assignments.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('http://localhost:8000/assignments');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
