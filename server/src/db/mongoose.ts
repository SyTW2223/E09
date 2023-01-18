import {connect} from 'mongoose';
import {remoteUrl} from './dbconfig';

console.log(remoteUrl);
connect(remoteUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});

