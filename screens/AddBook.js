import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from '../utils/theme';
import { addBook } from '../utils/bookService';

const AddBook = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter the book title');
      return false;
    }
    if (!author.trim()) {
      Alert.alert('Error', 'Please enter the author name');
      return false;
    }
    if (!isbn.trim()) {
      Alert.alert('Error', 'Please enter the ISBN');
      return false;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Please enter the category');
      return false;
    }
    return true;
  };

  const handleAddBook = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const bookData = {
        title,
        author,
        isbn,
        category,
        coverImage: coverImage || 'https://via.placeholder.com/150x200?text=No+Cover',
      };

      await addBook(bookData);
      Alert.alert(
        'Success',
        'Book added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add book');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add New Book</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="ISBN"
            value={isbn}
            onChangeText={setIsbn}
            keyboardType="numeric"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder="Cover Image URL (optional)"
            value={coverImage}
            onChangeText={setCoverImage}
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleAddBook}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Adding Book...' : 'Add Book'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  form: {
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    ...theme.typography.body,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray,
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  cancelButtonText: {
    color: theme.colors.primary,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
});

export default AddBook; 