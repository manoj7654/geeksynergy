async function handleRegister(event) {
    event.preventDefault(); 

    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const profession = document.getElementById('profession').value;



    try {
        const response = await fetch('https://geeksynergy-backend-y2x6.onrender.com/users/register', { // Replace with your login API endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, phone, password, profession })
                });

           const result = await response.json();
    

        if (response.ok) {
            alert('Registration successful! Redirecting to login page...');
            window.location.href = 'login.html';
        } else {
            alert(`Registration failed: ${result.message || 'Please try again.'}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again later.');
    }
}