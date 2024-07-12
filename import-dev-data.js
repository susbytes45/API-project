const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const database = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
// console.log(database);
mongoose
  .connect(database)
  .then((con) => {
    // console.log(con.connections);
    console.log('Db connection sucessfull');
  })
  .catch((err) => console.log(err, 'database not connected'));

const Product = require('./model/productmodel');
console.log(process.argv);
const datatoadd = JSON.parse(fs.readFileSync('./import-data.json', 'utf-8'));
console.log(Product);
console.log(datatoadd);
const importdata = async function () {
  try {
    const data = await Product.create(datatoadd);
    console.log('datat sucessfully loaded');
  } catch (err) {
    console.log(err);
  }
};
const deletedata = async function () {
  try {
    await Product.deleteMany();
    console.log('data sucessfully deleted');
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedata();
}
