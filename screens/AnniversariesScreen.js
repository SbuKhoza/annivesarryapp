import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const AnniversaryScreen = ({ route, navigation }) => {
  const { savedData = [] } = route.params;
  const [entries, setEntries] = useState(savedData);
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
    // Update the entries in HomeScreen as well
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
            const updatedEntries = [...entries];
            updatedEntries.splice(index, 1);
            setEntries(updatedEntries);
            // Update the entries in HomeScreen as well
            navigation.setParams({ savedData: updatedEntries });
            alert("Deleted Successfully!");
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

    if (!result.cancelled) {
      setEditImage(result.uri);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>Happy {item.anniversary} {item.name} {item.surname}</Text>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
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
            <SelectList data={data} setSelected={setEditSelected} />
          </View>

          <View style={styles.editItem}>
            <Text style={styles.editLabel}>Image:</Text>
            <TouchableOpacity onPress={handleImagePicker}>
              {editImage ? (
                <Image source={{ uri: editImage }} style={styles.editImage} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemMessage: {
    fontSize: 14,
    color: '#333',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 4,
  },
  editButton: {
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
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
  },
  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  editLabel: {
    width: 100,
    fontWeight: 'bold',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  editImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  updateButton: {
    backgroundColor: '#28A745',
  },
  cancelButton: {
    backgroundColor: '#6C757D',
  },
});

export default AnniversaryScreen;