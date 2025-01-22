

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