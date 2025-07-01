import { pool } from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  console.log(req.body);

  // Old Style
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirm = req.body.passwordConfirm;

  // const { username, email, password, passwordConfirm } = req.body;

  const { username, email, street_address, city, state, password, passwordConfirm } = req.body;

  // console.log(username, email, password, passwordConfirm);

  try {

    // 1. Check if all fields are provided
    if (!username || !email || !password || !passwordConfirm || !street_address || !city || !state) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const [results] = await pool.query(
      "SELECT email FROM user WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match!' });
    }

    // if (err) {
    //   console.log("DB error", err);

    //   // Optionally render an error page or send a response
    //   return res.render('register', { message: "Database error!" });
    // }

    //   //   if (hashErr) {
    //   //     console.log("Hashing error", hashErr);
    //   //     return res.render('register', { message: "Error processing password!" });
    //   //   }

    //   //   console.log(hashedPassword);

    // bcrypt.hash(password, 8, (hashErr, hashedPassword) => {
    // if (hashErr) {
    //   console.error("Hashing error:", hashErr);
    //   return res.render('register', { message: "Error processing password!" });
    // }



    // Validate input (simple example)
    // if (!username || !email || !address_id || !password) {
    //   return res.status(400).json({ error: 'All fields are required.' });
    // }

    const [addressResult] = await pool.query(
      'INSERT INTO address (street_address, city, state) VALUES (?, ?, ?)', [street_address, city, state]);

      const address_id = addressResult.insertId;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log({hashPass: hashedPassword});

    const [insertedResult] = await pool.query(
      "INSERT INTO user (username, email, address_id, password, role_type) VALUES (?, ?, ?, ?, 'customer')",
      [username, email, address_id, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully!', userId: insertedResult.insertId });

      // if (insertedUser) {
      //   console.log(results);
      //   return res.render("register", {
      //     message: "User registered",
      //   });
      // }
      // else {

      // };

    // res.send('<h1>Testing</h1>');

    // });
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ error: 'Registration failed.' });
  }
};


export const login = async (req, res) => {
  console.log(req.body);

  // Old Style
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordConfirm = req.body.passwordConfirm;

  // const { username, email, password, passwordConfirm } = req.body;

  const {username, password} = req.body;

  try {

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
      // return res.render('login', { message: "Username and password are required" });
    }

    // Find user by username
    const [users] = await pool.query(
      "SELECT user_id, username, password, role_type FROM user WHERE username = ?",
      [username]
    );

    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials'});
    }

    // Successful login
    res.status(200).json({
      message: "login successful",
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role_type
      }
    });

  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: 'Server error during login' });
  }
};