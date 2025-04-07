import React, { useState, useEffect } from 'react';
import { TextInput, View, Button, KeyboardAvoidingView, Platform, ScrollView, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotePad() {
  const [note, setNote] = useState('');
  const router = useRouter();
  const { noteId } = useLocalSearchParams();

  useEffect(() => {
    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  const loadNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const savedNotes = storedNotes ? JSON.parse(storedNotes) : [];
      const foundNote = savedNotes.find((note: { id: string }) => note.id === noteId);
      if (foundNote) {
        setNote(foundNote.content);
      }
    } catch (error) {
      console.error('Failed to load the note', error);
    }
  };

  const saveNote = async () => {
    if (note.trim() === '') {
      Alert.alert('Note is empty', 'Please enter some text before saving.');
      return;
    }

    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const savedNotes = storedNotes ? JSON.parse(storedNotes) : [];
      const newNote = {
        id: noteId || Date.now().toString(),
        content: note.trim(),
      };

      const noteIndex = savedNotes.findIndex((note: { id: string }) => note.id === newNote.id);
      if (noteIndex > -1) {
        savedNotes[noteIndex] = newNote;
      } else {
        savedNotes.push(newNote);
      }

      await AsyncStorage.setItem('notes', JSON.stringify(savedNotes));
      setNote('');
      router.push('/screens/Library');
    } catch (error) {
      console.error('Failed to save the note', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <View style={styles.topButtonContainer}>
        <Button title="Save Note" onPress={saveNote} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write your notes here..."
          value={note}
          onChangeText={setNote}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    margin: 16,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
});

