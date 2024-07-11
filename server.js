const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./index');
const mongoose = require('mongoose');
console.log(process.argv);
const database = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
// console.log(database);
mongoose
  .connect(database)
  .then((con) => {
    // console.log(con.connections);
    console.log('Db connection sucessfull');
  })
  .catch((err) => console.log(err, 'database not connected'));

// console.log(process.env);
// console.log(app.get('env'));
const port = process.env.PORT * 1 || 8001;
app.listen(port, () => {
  console.log(`listening at port ${port} `);
});
