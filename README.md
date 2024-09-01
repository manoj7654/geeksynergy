## User Management

- User management involves securely handling user data, including registration, authentication, and profile updates. It ensures users can register with encrypted passwords, log in with validated credentials, and manage their profiles. Administrators can view, update, and delete user information, maintaining an organized and efficient system.

`For Backend`

### Folder Structure

            /backend
            │
            ├── /config            
            │   └── db.js           
            │
            ├── /middleware         
            │   └── authenticate.js 
            │
            ├── /models            
            │   └── userModel.js   
            │
            ├── /routes           
            │   └── userRouter.js  
            │
            ├── .env               
            ├── .gitignore         
            ├── index.js           
            ├── package.json        
            └── package-lock.json   


### Installation

1. Clone the repository:


        git clone https://github.com/manoj7654/geeksynergy.git

        cd backend

2. Install dependencies:

            npm install

3. Set up environment variables by creating a .env file:


        MONGODB_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        PORT =your port no 

4. Start the server 

        npm run servr


### Features
1. User Registration: Users can register with their Name, Password, Email, Phone Number, and Profession. Passwords are securely encrypted before storage.

2. User Authentication: Validates user credentials during login and provides access to protected routes.

### User Management:

1. List all registered users in JSON format.

2. Update user information such as Name,Phone Number,email,password and profession.

3. Delete user records from the database.


### Tech Stack

- Node.js

- Express.js

- MongoDB

- Mongoose

- bcrypt.js

- JWT


### API Endpoints

1. User Registration

- Endpoint: /users/register

- Method: POST

- Description: Registers a new user with encrypted password.

- Request Body:

        {
        "name": "Manoj Kumar",
        "password": "Manoj",
        "email": "manoj@gmail.com",
        "phone": "7654504943",
        "profession": "Developer"
        }
- Response:

        201 Created: User registered successfully.
        400 Bad Request: Validation errors.
2. User Login

- Endpoint: /users/login

- Method: POST

- Description: Authenticates a user and returns a JWT token.

- Request Body:

            {
            "email": "manoj@gmail.com",
            "password": "Manoj"
            }
- Response:

        200 OK: Returns JWT token.
        401 Unauthorized: Invalid credentials.
3. List Users

- Endpoint: /users/list

- Method: GET

- Description: Retrieves a list of all registered users.

- Response:

        [
            {
                "name": "Santosh Kumar",
                "email": "santosh@gmail.com",
                "phone": "7021054042",
                "password": "Santosh",  
                "profession": "Engineer"
            },
            {
                "name": "Sanoj kumar",
                "email": "sanoj@gmail.com",
                "phone": "7255878896",
                "password": "Sanoj",  
                "profession": "Doctor"
            },
            ........
        ]

4. Update User

- Endpoint: /users/:id

- Method: PUT

- Description: Updates user data by ID.

- Request Body:

            {
            "name": "Mala devi" // before it was Manoj Kumar,
            "phone": "7654504943"
            }
- Response:

        200 OK: User updated successfully.
        404 Not Found: User not found.
5. Delete User

- Endpoint: /users/:id

- Method: DELETE

- Description: Deletes a user by ID.

- Response:

            200 OK: User deleted successfully.
            404 Not Found: User not found.


`For Front-End`

### Folder Structure

        /frontend
        │
        ├── index.js       
        ├── register.js    
        │── login.js       
        ├── index.html       
        ├── register.html     
        ├── login.html         
      

### Installation

1. Clone the repository:

        git clone https://github.com/manoj7654/geeksynergy.git

        cd frontend
2. Open index.html in your browser to access the registration page.


### Front-End Deployed link
[Live](https://dreamy-nasturtium-417619.netlify.app/)


### Back-End Deployed Link
[Live](https://geeksynergy-backend-y2x6.onrender.com/)