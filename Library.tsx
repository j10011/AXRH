import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Note {
  id: string;
  content: string;
}

export default function Library() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const savedNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
      setNotes(savedNotes);
    } catch (error) {
      console.error('Failed to load notes', error);
    }
  };

  const filterNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const savedNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];
      if (searchQuery.trim() === '') {
        setNotes(savedNotes);
      } else {
        const filteredNotes = savedNotes.filter((note: Note) =>
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setNotes(filteredNotes);
      }
    } catch (error) {
      console.error('Failed to filter notes', error);
    }
  };

  const handleNotePress = (note: Note) => {
    router.push(`/screens/NotePad?noteId=${note.id}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={(text: string) => setSearchQuery(text)}
        onSubmitEditing={() => filterNotes()}
      />

      <FlatList
        data={notes}
        keyExtractor={(item: Note) => item.id}
        renderItem={({ item }: { item: Note }) => (
          <TouchableOpacity onPress={() => handleNotePress(item)}>
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  noteContainer: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  noteText: {
    fontSize: 16,
  },
});