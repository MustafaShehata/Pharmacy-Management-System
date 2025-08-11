import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../config/database.js";
import { createUser, createAddress } from '../models/userModel.js';

// export const register = async (req, res) => {
//   console.log(req.body);

//   // Old Style
//   // const username = req.body.username;
//   // const email = req.body.email;
//   // const password = req.body.password;
//   // const passwordConfirm = req.body.passwordConfirm;

//   // const { username, email, password, passwordConfirm } = req.body;

//   const { username, email, street_address, city, state, password, passwordConfirm } = req.body;

//   // console.log(username, email, password, passwordConfirm);

//   try {

//     // 1. Check if all fields are provided
//     if (!username || !email || !password || !passwordConfirm || !street_address || !city || !state) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     const [results] = await pool.query(
//       "SELECT email FROM user WHERE email = ?",
//       [email]
//     );

//     if (results.length > 0) {
//       return res.status(409).json({ error: 'Email is already registered.' });
//     }

//     if (password !== passwordConfirm) {
//       return res.status(400).json({ error: 'Passwords do not match!' });
//     }

//     // if (err) {
//     //   console.log("DB error", err);

      // Optionally render an error page or send a response
    //   return res.render('register', { message: "Database error!" });
    // }

//     //   //   if (hashErr) {
//     //   //     console.log("Hashing error", hashErr);
//     //   //     return res.render('register', { message: "Error processing password!" });
//     //   //   }

//     //   //   console.log(hashedPassword);

//     // bcrypt.hash(password, 8, (hashErr, hashedPassword) => {
//     // if (hashErr) {
//     //   console.error("Hashing error:", hashErr);
//     //   return res.render('register', { message: "Error processing password!" });
//     // }



//     // Validate input (simple example)
//     // if (!username || !email || !address_id || !password) {
//     //   return res.status(400).json({ error: 'All fields are required.' });
//     // }

//     const [addressResult] = await pool.query(
//       'INSERT INTO address (street_address, city, state) VALUES (?, ?, ?)', [street_address, city, state]);

//     const address_id = addressResult.insertId;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     console.log({hashPass: hashedPassword});

//     const [insertedResult] = await pool.query(
//       "INSERT INTO user (username, email, address_id, password, role_type) VALUES (?, ?, ?, ?, 'customer')",
//       [username, email, address_id, hashedPassword]);

//     res.status(201).json({ message: 'User registered successfully!', userId: insertedResult.insertId });

//       // if (insertedUser) {
//       //   console.log(results);
//       //   return res.render("register", {
//       //     message: "User registered",
//       //   });
//       // }
//       // else {

//       // };

//     // res.send('<h1>Testing</h1>');

//     // });
//   } catch (err) {
//     console.error("error", err);
//     res.status(500).json({ error: 'Registration failed.' });
//   }
// };


// export const login = async (req, res) => {
//   console.log(req.body);

//   // Old Style
//   // const username = req.body.username;
//   // const email = req.body.email;
//   // const password = req.body.password;
//   // const passwordConfirm = req.body.passwordConfirm;

//   // const { username, email, password, passwordConfirm } = req.body;

//   const {username, password} = req.body;

//   try {

//     // Validate input
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required' });
//       // return res.render('login', { message: "Username and password are required" });
//     }

//     // Find user by username
//     const [users] = await pool.query(
//       "SELECT user_id, username, password, role_type FROM user WHERE username = ?",
//       [username]
//     );

//     // Check if user exists
//     if (users.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = users[0];

//     // Verify password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if(!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials'});
//     }

//     // Successful login
//     res.status(200).json({
//       message: "login successful",
//       user: {
//         id: user.user_id,
//         username: user.username,
//         role: user.role_type
//       }
//     });

//   } catch (err) {
//     console.error("Login error", err);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// };


export const registerUser = async (req, res) => {
  try {
    const { username, email, address, password, confirmPassword } = req.body;
    const { street_address, city, state } = address;

    // // Validate fields
    if (
      !username ||
      !email ||
      !street_address ||
      !city ||
      !state ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ error: "All Fields are required" });
    }

    const [emails] = await pool.query(
      "SELECT email FROM user WHERE email = ?",
      [email]
    );

    if (emails.length > 0) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    const [usernames] = await pool.query(
      "SELECT username FROM user WHERE username = ?",
      [username]
    );

    if (usernames.length > 0) {
      return res.status(409).json({ error: "Username is already registered." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);

    // Insert address and get address_id
    const address_id = await createAddress({ street_address, city, state });

    const role_type = "customer";

    // Insert user with the linked address_id
    const user_id = await createUser({
      username,
      email,
      address_id,
      password: hashedPassword,
      role_type,
    });

    // TODO: Edit Generate JWT
    const token = jwt.sign({ user_id, role: role_type }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });

    res.status(201).json({
      message: "Registration Successful",
      token,
      user: {
        user: user_id,
        username,
        email,
        role: role_type,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email or username

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Email/Username and password are required' });
    }

    // Find user by email or username
    // const [rows] = await pool.query(
    //  `SELECT user.user_id, user.username, user.email, user.password, user.role_type, user.address_id, address.*, user.created_at, user.updated_at FROM user, address WHERE user.address_id = address.address_id && (email = ? OR username = ?)`,
    //   [identifier, identifier]
    // );

    const [rows] = await pool.query(
      `SELECT * FROM user WHERE email = ? OR username = ?`, [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }

    // Remove password and address_id from user object before sending
    delete user.password;
    delete user.address_id;

    const userToken = { user_id: user.user_id, role: user.role_type };

    // Create JWT token => Need to review these Concepts of JWT Token
    const accessToken = generateAccessToken(userToken);
    const refreshToken = jwt.sign(userToken, process.env.REFRESH_TOKEN_SECRET);

    res.json({
      message: "LOGIN SUCCESSFUL",
      accessToken,
      refreshToken,
      user
    });

  } catch(err) {
    console.log('Login error', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const authenticatedUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ err: "Invalid Token" });
  }
};

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}