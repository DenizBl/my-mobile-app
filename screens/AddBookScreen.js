import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { saveBook } from '../utils/database';

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSave = async () => {
    if (title && author) {
      await saveBook(title, author);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Book Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Author"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Save Book" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
