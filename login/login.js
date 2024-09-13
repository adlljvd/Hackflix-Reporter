/*const users = [
    { user: 'admin', password: '123' },
    { user: 'user1', password: '234' },
    { user: 'user2', password: '456' }
  ];
  
  const form = document.getElementById('login-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].user === username && users[i].password === password) {
        // Store the logged-in user in sessionStorage
        sessionStorage.setItem('currentUser', username);
        window.location.href = '../admin/index.html';
        return;
      }
    }
  
    alert('Invalid username or password');
  });
  */
  const form = document.getElementById('login-form');

  let users = [];
  
  // Load data from external file
  fetch('../data/user.data')
    .then(response => response.text())
    .then(data => {
      users = data.split('\n').map(row => {
        const [user, password] = row.split(':');
        return { user, password };
      });
      form.addEventListener('submit', checkLogin);
    });
  
  function checkLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].user === username && users[i].password === password) {
        // Store the logged-in user in sessionStorage
        sessionStorage.setItem('currentUser', username);
        window.location.href = '../admin/index.html';
        return;
      }
    }
  
    alert('Invalid username or password');
  }

  function addUser(newUser, newPassword) {
    users.push({ user: newUser, password: newPassword });
  }