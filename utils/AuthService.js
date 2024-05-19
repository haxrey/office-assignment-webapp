import axios from 'axios';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post('/api/login', { username, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error || 'Login failed');
    }
  }
}

export default AuthService;
