document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const apiEndpoint = '(http://127.0.0.1:8000/auth/admin/login)'; 
    const httpMethod = 'POST'; // Verify supported method
  
    const payload = {
      email,
      password
    };
  
    const headers = {
      'Content-Type': 'application/json',
      // Add additional headers if required
    };
  
    try {
      const response = await fetch(apiEndpoint, {
        method: httpMethod,
        headers,
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Login successful', data);
  
          // Store token (if any)
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }
  
          // Redirect
          window.location.replace('index.html');
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
        }
      } else {
        const errorMessage = await response.text();
        console.error('Login failed:', response.status, response.statusText, errorMessage);
        alert('Login failed. Please check credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  
  