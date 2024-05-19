const fs = require('fs');
const path = require('path');
const { hashPassword } = require('../utils/hashUtils');

const users = [
  { username: 'testuser', password: 'password123' },
  { username: 'john_doe', password: 'securepassword' },
  // Add more users as needed
];

const generateUsers = async () => {
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      username: user.username,
      password: await hashPassword(user.password),
    }))
  );

  const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
  fs.writeFileSync(usersFilePath, JSON.stringify(hashedUsers, null, 2));

  console.log('Users generated and saved to users.json');
};

generateUsers();
