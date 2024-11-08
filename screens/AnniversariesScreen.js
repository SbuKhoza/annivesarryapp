import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  FlatList, 
  Alert,
  Dimensions 
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const AnniversaryScreen = ({ route, navigation }) => {
  // Initialize entries state with savedData from route params
  const [entries, setEntries] = useState(route.params?.savedData || []);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editDate, setEditDate] = useState(new Date());
  const [editSelected, setEditSelected] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [show, setShow] = useState(false);

  const data = [
    { option: '1', value: '' },
    { option: '2', value: 'Birthday' },
  ];

  const handleEdit = (index) => {
    const entry = entries[index];
    setEditIndex(index);
    setEditName(entry.name);
    setEditSurname(entry.surname);
    setEditDate(new Date(entry.date));
    setEditSelected(entry.anniversary);
    setEditImage(entry.image);
    setEditMessage(entry.message);
  };

  const handleUpdate = () => {
    const updatedEntries = [...entries];
    updatedEntries[editIndex] = {
      name: editName,
      surname: editSurname,
      date: editDate.toISOString(),
      anniversary: editSelected,
      image: editImage,
      message: editMessage,
    };
    setEntries(updatedEntries);
    navigation.setParams({ savedData: updatedEntries });
    setEditIndex(null);
    alert("Updated Successfully!");
  };

  const handleDelete = (index) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedEntries = entries.filter((_, i) => i !== index);
            setEntries(updatedEntries);
            navigation.setParams({ savedData: updatedEntries });
          },
        },
      ],
      { cancelable: false }
    );
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

    if (!result.canceled) { 
      setEditImage(result.assets[0].uri);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>Happy {item.anniversary} {item.name} {item.surname}</Text>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>
        {item.image && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.itemImage}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(index)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      {editIndex !== null && (
        <View style={styles.editContainer}>
          <View style={styles.editContent}>
            <Text style={styles.editTitle}>Edit Entry</Text>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Name:</Text>
              <TextInput
                style={styles.editInput}
                value={editName}
                onChangeText={setEditName}
              />
            </View>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Surname:</Text>
              <TextInput
                style={styles.editInput}
                value={editSurname}
                onChangeText={setEditSurname}
              />
            </View>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Date:</Text>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Text>{editDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={editDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || editDate;
                    setShow(false);
                    setEditDate(currentDate);
                  }}
                />
              )}
            </View>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Anniversary:</Text>
              <SelectList 
                data={data} 
                setSelected={setEditSelected}
                defaultOption={{ key: editSelected, value: editSelected }}
              />
            </View>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Image:</Text>
              <TouchableOpacity onPress={handleImagePicker}>
                {editImage ? (
                  <Image 
                    source={{ uri: editImage }} 
                    style={styles.editImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text>Upload Image</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.editItem}>
              <Text style={styles.editLabel}>Message:</Text>
              <TextInput
                style={styles.editInput}
                value={editMessage}
                onChangeText={setEditMessage}
                multiline
              />
            </View>

            <View style={styles.editActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.updateButton]}
                onPress={handleUpdate}
              >
                <Text style={styles.actionButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setEditIndex(null)}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
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