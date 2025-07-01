import { pool } from "../config/database.js";
import { getUserAddress, getAddresses } from "../models/userModel.js";

export const updateUserAddress = async (req, res) => {
  const userId = req.params.id;
  const { street_address, city, state } = req.body;

  try {
    const [userResult] = await pool.query(`
      SELECT address_id FROM user WHERE user_id = ?
      `, [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ msg: "User not found"});
    }

    const addressId = userResult[0].address_id;

    await pool.query(`
      UPDATE user set street_address=?,city=?,state=? WHERE address_id=?
      `, [street_address, city, state, addressId]
    );

    res.status(200).json({ msg: "Address updated successfully" });
  } catch(err) {
    console.error(err);

    res.status(500).json({ err: "Failed to update address"});
  }
};

export const getAddressById = async (req, res) => {
  const userId = req.params.id;

  try {
    const address = await getUserAddress(userId);
    res.json(address);
  } catch(err) {
    res.status(500).json({ err: "Could not found address!"});
  }
};

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await getAddresses();
    res.json(addresses);
  } catch(err) {
    res.status(500).json({ err: "Could not fetch addresses!" });
  }
};