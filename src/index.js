/* @flow */

'use strict';

import express      from 'express';
import bodyParser   from 'body-parser';
import multer       from 'multer';
import morgan       from 'morgan';
import http         from 'http';
import socketio     from 'socket.io';

const app    = express();
const server = http.Server(app);
const io     = socketio(server);
const upload = multer();

app.use(express.static(__dirname + '/../build'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', socket => {
  console.log('*** USER HAS ENTERED :) ***');
  socket.on('disconnect', () => {
    console.log('*** USER HAS LEFT :( ***');
  });

  socket.on('chat message', msg => {
    console.log('USER SAID: ', msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000);

app.get('/sum/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  res.send({ sum: x * y });
});