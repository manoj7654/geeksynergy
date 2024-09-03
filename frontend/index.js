const authToken = localStorage.getItem('authToken');
let users = [];
let currentPage = 1;
let rowsPerPage = 5; 
function checkLoginStatus() {
    if (!authToken) {
        window.location.href = 'login.html'; 
    }
}

async function fetchUserData() {
    try {
        if (!authToken) {
            alert('No token found. Please log in first.');
            window.location.href = 'login.html'; 
            return;
        }

        const response = await fetch('https://geeksynergy-backend-y2x6.onrender.com/users/list', {
            method: 'GET',
            headers: {
                'Authorization': `${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            users = result.users;
            displayTableData();
            setupPagination();
        } else {
            console.error('Failed to fetch user data:', response.statusText);
            alert('Failed to fetch user data. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayTableData() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const row = document.createElement('tr');
        row.dataset.userId = user._id; 
        row.innerHTML = `
            <td data-label="Name"><span>${user.name}</span><input type="text" class="form-control d-none" value="${user.name}" /></td>
            <td data-label="Email"><span>${user.email}</span><input type="text" class="form-control d-none" value="${user.email}" /></td>
            <td data-label="Phone"><span>${user.phone}</span><input type="text" class="form-control d-none" value="${user.phone}" /></td>
            <td data-label="Profession"><span>${user.profession}</span><input type="text" class="form-control d-none" value="${user.profession}" /></td>
            <td data-label="Action">
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-success d-none save-btn">Save</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        const editBtn = row.querySelector('.edit-btn');
        const saveBtn = row.querySelector('.save-btn');
        const deleteBtn = row.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => toggleEditMode(row, true));
        saveBtn.addEventListener('click', () => saveUserData(row));
        deleteBtn.addEventListener('click', () => deleteUser(row));
    });
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(users.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', () => {
            currentPage = i;
            displayTableData();
            setupPagination();
        });
        pagination.appendChild(li);
    }
}

function toggleEditMode(row, isEditing) {
    const spans = row.querySelectorAll('span');
    const inputs = row.querySelectorAll('input');
    const editBtn = row.querySelector('.edit-btn');
    const saveBtn = row.querySelector('.save-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    spans.forEach(span => span.classList.toggle('d-none', isEditing));
    inputs.forEach(input => input.classList.toggle('d-none', !isEditing));
    editBtn.classList.toggle('d-none', isEditing);
    saveBtn.classList.toggle('d-none', !isEditing);
    deleteBtn.classList.toggle('d-none', isEditing);
}

async function saveUserData(row) {
    const id = row.dataset.userId;
    const updatedData = {
        name: row.querySelectorAll('input')[0].value,
        email: row.querySelectorAll('input')[1].value,
        phone: row.querySelectorAll('input')[2].value,
        profession: row.querySelectorAll('input')[3].value
    };

    try {
        const response = await fetch(`https://geeksynergy-backend-y2x6.onrender.com/users/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            toggleEditMode(row, false);
            row.querySelectorAll('span')[0].textContent = updatedData.name;
            row.querySelectorAll('span')[1].textContent = updatedData.email;
            row.querySelectorAll('span')[2].textContent = updatedData.phone;
            row.querySelectorAll('span')[3].textContent = updatedData.profession;
            alert('User data updated successfully!');
        } else {
            console.error('Failed to update user data:', response.statusText);
            alert('Failed to update user data. Please try again.');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

async function deleteUser(row) {
    const id = row.dataset.userId;

    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`https://geeksynergy-backend-y2x6.onrender.com/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            row.remove();
            alert('User deleted successfully!');
            users = users.filter(user => user._id !== id);
            setupPagination();
        } else {
            console.error('Failed to delete user:', response.statusText);
            alert('Failed to delete user. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    fetchUserData();
});
