import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { theme } from '../utils/theme';
import { getBooks, deleteBook } from '../utils/bookService';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const allBooks = await getBooks();
      setBooks(allBooks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBook(bookId);
              loadBooks();
              Alert.alert('Success', 'Book deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete book');
            }
          },
        },
      ]
    );
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Image
        source={{ uri: item.coverImage }}
        style={styles.bookImage}
        resizeMode="cover"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>by {item.author}</Text>
        <Text style={styles.bookIsbn}>ISBN: {item.isbn}</Text>
        <Text style={styles.bookCategory}>Category: {item.category}</Text>
        <Text style={[
          styles.bookStatus,
          item.status === 'available' ? styles.statusAvailable : styles.statusCheckedOut
        ]}>
          {item.status === 'available' ? 'Available' : 'Checked Out'}
        </Text>
      </View>
      <View style={styles.bookActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditBook', { book: item })}
        >
          <Ionicons name="create-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteBook(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Library Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddBook')}
        >
          <Ionicons name="add-circle" size={24} color={theme.colors.white} />
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bookList}
        refreshing={loading}
        onRefresh={loadBooks}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  addButtonText: {
    color: theme.colors.white,
    marginLeft: theme.spacing.xs,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  bookList: {
    padding: theme.spacing.lg,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: theme.borderRadius.sm,
  },
  bookInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  bookTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookAuthor: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookIsbn: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookCategory: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  bookStatus: {
    ...theme.typography.caption,
    fontWeight: 'bold',
  },
  statusAvailable: {
    color: theme.colors.accent,
  },
  statusCheckedOut: {
    color: theme.colors.error,
  },
  bookActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: theme.spacing.sm,
  },
  deleteButton: {
    marginLeft: theme.spacing.sm,
  },
});

export default AdminDashboard; 