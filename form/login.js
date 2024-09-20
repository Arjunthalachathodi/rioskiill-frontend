document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('http://127.0.0.1:8889/auth/admin/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Login failed: Invalid credentials');
      }

      const data = await response.json();
      alert(data.message); // Display success message

      // Optionally, redirect to another page or update the UI
      // window.location.href = '/dashboard'; // Example redirect

  } catch (error) {
      alert(error.message); // Display error message
  }
});
