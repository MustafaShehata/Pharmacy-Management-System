import express from 'express';
import { getUsers, getUserById, createUser } from '../models/userModel.js';
import { updateUserAddress, getAddressById, getAllAddresses } from '../controllers/userController.js';

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

router.post("/users", async (req, res) => {
  const { username, email, address_id, password, role_type } = req.body;
  const user = await createUser(username, email, address_id, password, role_type);
  res.status(201).send(user);
});


router.get('/addresses', getAllAddresses);
router.get('/users/:id/address', getAddressById);
router.put('/users/:id/address', updateUserAddress);

export default router;