import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getBooks } from '../utils/database';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    const focusListener = navigation.addListener('focus', fetchBooks);
    return focusListener;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.author}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text style={styles.addButtonText}>+ Add Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  bookItem: { marginBottom: 15, padding: 10, backgroundColor: '#e0f7fa', borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 18 },
  addButton: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 10, 
    position: 'absolute', 
    bottom: 20, 
    right: 20 
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
