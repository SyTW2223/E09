import {connect} from 'mongoose';
//import {remoteUrl} from './dbconfig';

console.log(process.env.DATABASE_URL);
connect(process.env.DATABASE_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});

