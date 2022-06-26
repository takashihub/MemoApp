import React, { useState } from 'react';
import {
    View, TextInput, StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeybordSafeView from '../components/KeybordSafeView';

export default function memoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');

  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then((docRef) => {
        console.log('Created!', docRef.id);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
    navigation.goBack();
  }
  return (
    <KeybordSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        // eslint-disable-next-line react/jsx-no-bind
        onPress={handlePress}
      />
    </KeybordSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
