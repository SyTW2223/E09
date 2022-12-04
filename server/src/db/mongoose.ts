import {connect} from 'mongoose';
//require 'dbconfig'
import {remoteUrl} from './dbconfig';
//// <reference path="dbconfig.ts"/>

//const mongodb_url = 'mongodb://172.16.119.20:27017/juicer';//process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/music-api';
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
