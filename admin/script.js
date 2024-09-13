  // Define the current user from session storage
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    document.getElementById('username-display').innerHTML = `${currentUser}!`;
  } else {
    document.getElementById('username-display').innerHTML = 'You are not logged in.';
  }
  
  let dataArray = [];
  let editingRowIndex = null; // To track the row being edited

  // Load data from localStorage if it exists, otherwise fetch from external file
  function loadData() {
    const storedData = localStorage.getItem('dataArray');
    if (storedData) {
      // Load data from localStorage if it exists
      dataArray = JSON.parse(storedData);
      updateTable();
    } else {
      // Fetch data from external file if not in localStorage
      fetch('../data/news.data')
        .then(response => response.text())
        .then(data => {
          dataArray = data.split('\n').map(row => row.split(';'));
          updateTable();
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }

  // Save data to localStorage
  function saveDataToStorage() {
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
  }

  // Define a function to update the table
  function updateTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = ''; // Clear the table body

    dataArray.forEach((row, index) => {
      const tableRow = document.createElement('tr');

      row.forEach(column => {
        const tableCell = document.createElement('td');
        tableCell.textContent = column;
        tableRow.appendChild(tableCell);
      });

      // Create Edit button
      const actionCell = document.createElement('td');

      // Edit Button
      const editButton = document.createElement('button');
      editButton.className = 'btn btn-primary';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditModal(index));
      actionCell.appendChild(editButton);

      // Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => confirmDelete(index));
      actionCell.appendChild(deleteButton);

      tableRow.appendChild(actionCell);
      tableBody.appendChild(tableRow);
    });

    saveDataToStorage();
  }

  // Modal functionality
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModal');
  const closeBtn = document.querySelector('.close');

  openModalBtn.addEventListener('click', openAddModal);
  closeBtn.addEventListener('click', closeModal);

  // Open modal for adding a new record
  function openAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Record';
    document.getElementById('id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('content').value = '';
    editingRowIndex = null; // Reset editing index
    modal.style.display = 'block';
  }

  // Open modal for editing a record
  function openEditModal(rowIndex) {
    document.getElementById('modal-title').textContent = 'Edit Record';
    document.getElementById('id').value = dataArray[rowIndex][0];
    document.getElementById('title').value = dataArray[rowIndex][1];
    document.getElementById('author').value = dataArray[rowIndex][2];
    document.getElementById('content').value = dataArray[rowIndex][3];
    editingRowIndex = rowIndex; // Set the row being edited
    modal.style.display = 'block';
  }

  // Close the modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Close the modal if the user clicks outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Handle form submission for adding or editing
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', function() {
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    if (editingRowIndex !== null) {
      // Edit existing record
      dataArray[editingRowIndex] = [id, title, author, content];
    } else {
      // Add new record
      dataArray.push([id, title, author, content]);
    }

    // Update the table and close the modal
    updateTable();
    closeModal();
  });

  // Confirm delete action
  function confirmDelete(rowIndex) {
    const isConfirmed = confirm("Are you sure you want to delete this record?");
    if (isConfirmed) {
      deleteRow(rowIndex);
    }
  }

  // Delete a row from the table
  function deleteRow(rowIndex) {
    dataArray.splice(rowIndex, 1); // Remove the record from dataArray
    updateTable(); // Update the table
  }

  // Call the function to load data (either from localStorage or external file)
  loadData();