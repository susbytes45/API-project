const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./index');
const mongoose = require('mongoose');
// console.log(process.argv);
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception shuting down ....');
  console.log(err.name, err.message);
  process.exit(1);
});
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
const server = app.listen(port, () => {
  console.log(`listening at port ${port} `);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
