import fs from 'fs';
import path from 'path';
import { comparePassword } from './hashUtils';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export const getUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

export const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const authenticateUser = (username, password) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return false;
  }
  return comparePassword(password, user.password);
};
