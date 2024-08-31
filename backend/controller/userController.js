// <-----------------importing bcrypt for hashing password--------------------->
const bcrypt = require("bcrypt");

// <----------------importing jwt for generating token ------------------------->
const jwt = require("jsonwebtoken");

// <-----------------importing model for performing operation -------------------->
const {userModal}=require("../modal/userModal")

// <--------------dotenv for accessing port no from env file--------------->
require("dotenv").config();

const getUserList = async (req, res) => {
    try {
      const users = await userModal.find({}, '-password'); 
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching user list:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// <-------------------register for employee------------------>
const register = async (req, res) => {
    const { name, phone, profession, email, password } = req.body;

    // Input validation - check that all fields are present
    if (!name || !phone || !profession || !email || !password) {
        return res.status(400).json({
            message: 'Name, phone, profession, email, and password are required.',
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hashing password
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Error processing password.' });
            }

            // Create new user
            const user = new userModal({
                name,
                phone,
                profession,
                email,
                password: hashedPassword,
            });

            await user.save();
            res.status(201).json({ message: 'User registration successful.' });
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Error while creating account.' });
    }
};



// <---------------login for employee----------------------->
const login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await userModal.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token=jwt.sign({userId:user.id},process.env.key );
    res.status(200).json({message:"Login successfull", token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, profession, email, password } = req.body;
        const user = await userModal.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
        if (name) user.name = name;
      if (phone) user.phone = phone;
      if (profession) user.profession = profession;
      if (email) user.email = email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the user by ID and delete
      const user = await userModal.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

// <-------------exporting login,register--------------------------->
module.exports = {
    register,
  login,
  deleteUser,
  updateUser,
  getUserList
  
};