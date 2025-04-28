import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get all users
const getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Helper function to save users
const saveUsers = async (users) => {
  try {
    await AsyncStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Failed to save user data');
  }
};

export const registerUser = async (userData) => {
  try {
    const users = await getUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Create new user object
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In a real app, you should hash the password
      userType: userData.userType,
    };

    // Add new user to users array
    users.push(newUser);
    await saveUsers(users);

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);

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

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to logout');
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