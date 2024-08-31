async function handleLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://geeksynergy-backend-y2x6.onrender.com/users/login', { // Replace with your login API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token); 
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
}