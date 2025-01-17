const express = require('express')
const bodyparse = require('body-parser')
const app = express()

const port = process.env.PORT || 4000

app.use(bodyparse.json());


const { users } = require('./state')
let counter = users.length+1;

/* BEGIN - create routes here */
app.get('/users',(req,res) =>{
  res.json(users);
});

app.get('/users/1',(req,res) =>{
  res.json(users[0])
});

app.post('/users',(req,res) =>{
  let newUser = {
    "_id": 6,
        "name": "Charlie",
        "occupation": "Bartender",
        "avatar": "https://www.filmmurray.com/200/200"
  }
  users.push(newUser)
  res.json(users)
});

app.put('/users/1', (req,res) => {
users[0].occupation = 'Kung Fu Figther'
res.json(users)
})

app.delete('/users/1', (req,res) => {
users.splice(0,1)
res.send('deleted')
})

app.get('/users/:userId',(req,res) =>{
  //req.params.id
  const id = parseInt(req.params.userId);
  res.json(users[id - 1])
});
//define body in postman
app.put('/users/:userId', (req,res) => {
  const id = parseInt(req.params.userId);
  users[id - 1] = req.body
  res.json(users)
});

app.post('/users/', (req,res) => {
  users.push(req.body)
  users[users.length-1]._id = counter
  counter++
  res.json(users)
 });

//Using path variables
app.get('/users/:userId',(req,res) => {
  const id = parseInt(req.params.userId);
  res.json(users[id - 1]);
});

app.put('/users/:userId', (req,res) => {
  console.log(req.body)
  const id = parseInt(req.params.userId);
  users[id - 1].name = req.body.name;
  users[id - 1].occupation = req.body.occupation;
  res.json(users)
});

app.delete('/users/:userId', (req,res) => {
  const id = parseInt(req.params.userId);
  let index = users.findIndex(u => u._id == id)
  users[index].isActive = false;
  res.send('deleted')
  })
 
/* END - create routes here */

app.listen(4000, () => {
  console.log(`Example app listening on port ${port}!`)
})