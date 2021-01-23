let express = require('express');
const app = express();
const sequelize = require('./db');

let log = require('./controllers/logcontroller')
let user = require('./controllers/usercontroller')

sequelize.sync();

app.use(express.json());

app.use('/log', log);
app.use('/user', user);
//app.use('/about', log);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})