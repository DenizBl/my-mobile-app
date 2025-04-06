import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock book database
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Classic',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780446310789',
    category: 'Classic',
    status: 'available',
    coverImage: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    category: 'Dystopian',
    status: 'checked out',
    coverImage: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
  },
];

export const getBooks = async () => {
  try {
    const storedBooks = await AsyncStorage.getItem('books');
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    }
    return books;
  } catch (error) {
    console.error('Error getting books:', error);
    return books;
  }
};

export const addBook = async (bookData) => {
  try {
    const newBook = {
      id: Date.now().toString(),
      ...bookData,
      status: 'available',
    };
    books.push(newBook);
    await AsyncStorage.setItem('books', JSON.stringify(books));
    return newBook;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    const index = books.findIndex(book => book.id === bookId);
    if (index === -1) {
      throw new Error('Book not found');
    }
    books[index] = { ...books[index], ...bookData };
    await AsyncStorage.setItem('books', JSON.stringify(books));
    return books[index];
  } catch (error) {
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    books = books.filter(book => book.id !== bookId);
    await AsyncStorage.setItem('books', JSON.stringify(books));
  } catch (error) {
    throw error;
  }
};

// Initialize books
getBooks(); 