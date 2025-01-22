import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  
  // Get existing entries from route params or initialize empty array
  const existingEntries = route.params?.savedData || [];

  const data = [
    { option: '1', value: '' },
    { option: '2', value: 'Birthday' },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSave = () => {
    const newEntry = {
      name,
      surname,
      date: date.toISOString(),
      anniversary: selected,
      image,
      message,
    };
    
    // Add new entry to existing entries
    const updatedEntries = [...existingEntries, newEntry];
    
    alert("Saved Successfully!");
    // Navigate to AnniversaryScreen with updated entries
    navigation.navigate('Anniversaries', { savedData: updatedEntries });
    
    // Reset form
    handleAddNew();
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddNew = () => {
    setName("");
    setSurname("");
    setDate(new Date());
    setSelected("");
    setImage(null);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.anniversary}>
        <SelectList data={data} setSelected={setSelected} />
      </View>

      <View style={styles.date}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text>Date: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.names}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Surname"
          value={surname}
          onChangeText={text => setSurname(text)}
        />
      </View>

      <View style={styles.imageUpload}>
        <TouchableOpacity onPress={handleImagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>Upload Image</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.message}>
        <TextInput
          style={styles.messageInput}
          placeholder="Enter Message"
          value={message}
          onChangeText={text => setMessage(text)}
          multiline
        />
      </View>

      <View style={styles.content}>
        <Text>Happy {selected} {name} {surname}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Anniversaries', { savedData: existingEntries })}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNew}
        >
          <Text style={styles.buttonText}>Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  anniversary: {
    marginBottom: 16,
  },
  date: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  names: {
    marginBottom: 16,
  },
  content: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  imageUpload: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  message: {
    marginBottom: 16,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    marginVertical: 4,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;