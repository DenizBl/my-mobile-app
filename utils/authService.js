import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock user database
let users = [];

export const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    // Add to users array
    users.push(newUser);

    // Store in AsyncStorage
    await AsyncStorage.setItem('users', JSON.stringify(users));

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Store current user in AsyncStorage
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  } catch (error) {
    throw error;
  }
};

// Load users from AsyncStorage on app start
export const loadUsers = async () => {
  try {
    const storedUsers = await AsyncStorage.getItem('users');
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
};

// Initialize users
loadUsers(); 