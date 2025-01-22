import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const CARD_COLORS = [
  { label: 'Classic White', value: '#ffffff' },
  { label: 'Soft Pink', value: '#ffd6e0' },
  { label: 'Mint Green', value: '#d4f0db' },
  { label: 'Sky Blue', value: '#d4e6f1' },
  { label: 'Lavender', value: '#e8e6ff' },
  { label: 'Peach', value: '#ffe5d6' },
];

const CARD_DECORATIONS = [
  { label: 'None', value: 'none' },
  { label: 'Confetti Border', value: 'confetti' },
  { label: 'Hearts Border', value: 'hearts' },
  { label: 'Stars Border', value: 'stars' },
  { label: 'Floral Corner', value: 'floral' },
];

const TEXT_COLORS = [
  { label: 'Classic Black', value: '#000000' },
  { label: 'Navy Blue', value: '#1a237e' },
  { label: 'Deep Purple', value: '#4a148c' },
  { label: 'Forest Green', value: '#1b5e20' },
  { label: 'Burgundy', value: '#880e4f' },
];

const HomeScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [cardColor, setCardColor] = useState(CARD_COLORS[0].value);
  const [decoration, setDecoration] = useState(CARD_DECORATIONS[0].value);
  const [textColor, setTextColor] = useState(TEXT_COLORS[0].value);
  
  const existingEntries = route.params?.savedData || [];

  const data = [
    { option: '1', value: '' },
    { option: '2', value: 'Birthday' },
  ];

  const getDecorationStyle = () => {
    switch (decoration) {
      case 'confetti':
        return { borderWidth: 8, borderStyle: 'dashed', borderColor: '#FFD700' };
      case 'hearts':
        return { borderWidth: 8, borderStyle: 'solid', borderColor: '#FF69B4' };
      case 'stars':
        return { borderWidth: 8, borderStyle: 'dotted', borderColor: '#4CAF50' };
      case 'floral':
        return { borderWidth: 8, borderRadius: 30, borderColor: '#E91E63' };
      default:
        return {};
    }
  };

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
      cardColor,
      decoration,
      textColor,
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
    setCardColor(CARD_COLORS[0].value);
    setDecoration(CARD_DECORATIONS[0].value);
    setTextColor(TEXT_COLORS[0].value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardColor }, getDecorationStyle()]}>
        <View style={styles.customizationSection}>
          <Text style={styles.sectionTitle}>Card Customization</Text>
          
          <Text style={styles.label}>Card Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorPicker}>
            {CARD_COLORS.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.value },
                  cardColor === color.value && styles.selectedColor
                ]}
                onPress={() => setCardColor(color.value)}
              >
                <Text style={styles.colorOptionLabel}>{color.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Card Decoration</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.decorationPicker}>
            {CARD_DECORATIONS.map((dec, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.decorationOption,
                  decoration === dec.value && styles.selectedDecoration
                ]}
                onPress={() => setDecoration(dec.value)}
              >
                <Text style={styles.decorationOptionLabel}>{dec.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Text Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorPicker}>
            {TEXT_COLORS.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.value },
                  textColor === color.value && styles.selectedColor
                ]}
                onPress={() => setTextColor(color.value)}
              >
                <Text style={[styles.colorOptionLabel, { color: '#ffffff' }]}>{color.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.anniversary}>
          <Text style={[styles.label, { color: textColor }]}>Select Anniversary Type</Text>
          <SelectList 
            data={data} 
            setSelected={setSelected}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
          />
        </View>

        <View style={styles.date}>
          <Text style={[styles.label, { color: textColor }]}>Select Date</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShow(true)}
          >
            <Text style={[styles.dateButtonText, { color: textColor }]}>
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
          <Text style={[styles.label, { color: textColor }]}>Personal Information</Text>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Enter Name"
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Enter Surname"
            value={surname}
            onChangeText={text => setSurname(text)}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.imageUpload}>
          <Text style={[styles.label, { color: textColor }]}>Upload Image</Text>
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={handleImagePicker}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={[styles.imagePlaceholderText, { color: textColor }]}>
                  Tap to upload image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.message}>
          <Text style={[styles.label, { color: textColor }]}>Personal Message</Text>
          <TextInput
            style={[styles.messageInput, { color: textColor }]}
            placeholder="Enter your message here..."
            value={message}
            onChangeText={text => setMessage(text)}
            multiline
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.preview}>
          <Text style={[styles.previewText, { color: textColor }]}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  updateButton: {
    backgroundColor: '#28A745',
  },
  cancelButton: {
    backgroundColor: '#6C757D',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  editContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    maxHeight: '90%',
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  editItem: {
    marginBottom: 16,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  editImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default AnniversaryScreen;