import { pool } from '../config/database.js';

export async function getUsers(){
  const [row] = await pool.query("SELECT user.*, address.street_address, address.city, address.state FROM user, address WHERE user.address_id = address.address_id");
  return row;
};

export async function getUserById(id){
  // Prepared Statements -- Google it!
  const [rows] = await pool.query(`SELECT user.*, address.street_address, address.city, address.state
    FROM user, address
    WHERE user.address_id = address.address_id and user_id = ?
    `, [id]);
  return rows[0];
};

export async function createAddress({street_address, city, state}) {
  const [result] = await pool.query(`INSERT INTO address (street_address, city, state) VALUES (?, ?, ?)`, [street_address, city, state]);
  return result.insertId;
};

export async function createUser({ username, email, address_id, password, role_type }){
  const [result] = await pool.query(
      `INSERT INTO user
      (username, email, address_id, password, role_type)
      VALUES (?, ? , ?, ? , ?)`, [username, email, address_id, password, role_type]
  );
  return result.insertId;
};

export async function findUserByEmailOrUsername(identifier) {
  const [rows] = await db.query(
    'SELECT * FROM user WHERE email = ? OR username = ? LIMIT 1',
    [identifier, identifier]
  );
  return rows[0];
}

// TODO: updateUser, deleteUser

// export async function getUserAddress(id) {
//   const userId = await getUserById(id);
//   const address_id = userId.address_id;
//   const [result] = await pool.query(`
//     SELECT * FROM address WHERE address_id = ?
//     `, [address_id]);
//   return result[0];
// };

// export async function getAddresses() {
//   const [addresses] = await pool.query(`
//     SELECT * FROM address
//   `);
//   return addresses;
// };

export async function updateUser(id){
  const userId = getUserById(id);
  const [result] = await pool.query(`UPDATE user SET username=?,email=?,password=?,role_type=? WHERE userId=? WHERE user_id = ?`, [username, email, password, role_type, userId]);

  return result;
};



// const users = await getUsers();

// const user = await getUser(1);
// console.log(user);

// const result = await createUser('mshehata', 'mshehata.rm@gmail.com', 1, 'pass@123', 'admin');
// const result = await createUser('test', 'test@gmail.com', 1, 'pass@123', 'pharmacist');
// const result = await createUser('test1', 'test1@gmail.com', 1, 'pass@123', 'customer');
// console.log(result);