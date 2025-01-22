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
    const updatedEntries = [...existingEntries, newEntry];
    alert("Saved Successfully!");
    navigation.navigate('Anniversaries', { savedData: updatedEntries });
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
      <View style={styles.card}>
        <View style={styles.anniversary}>
          <Text style={styles.label}>Select Anniversary Type</Text>
          <SelectList 
            data={data} 
            setSelected={setSelected}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
          />
        </View>

        <View style={styles.date}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShow(true)}
          >
            <Text style={styles.dateButtonText}>
              {date.toLocaleDateString()}
            </Text>
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
          <Text style={styles.label}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Surname"
            value={surname}
            onChangeText={text => setSurname(text)}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.imageUpload}>
          <Text style={styles.label}>Upload Image</Text>
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={handleImagePicker}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  Tap to upload image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.message}>
          <Text style={styles.label}>Personal Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Enter your message here..."
            value={message}
            onChangeText={text => setMessage(text)}
            multiline
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.preview}>
          <Text style={styles.previewText}>
            Happy {selected} {name} {surname}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate('Anniversaries', { savedData: existingEntries })}
          >
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddNew}
          >
            <Text style={styles.buttonText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  anniversary: {
    marginBottom: 20,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  date: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16,
  },
  names: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  imageUpload: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageButton: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  message: {
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  preview: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    minWidth: '30%',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  addButton: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;