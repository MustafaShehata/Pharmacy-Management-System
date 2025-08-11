import express from 'express';
import { getUsers, getUserById, createUser } from '../models/userModel.js';
// import { registerUserWithAddress } from '../controllers/userController.js';

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  res.send(user);
});


export default router;