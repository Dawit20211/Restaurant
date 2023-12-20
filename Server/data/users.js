import bcrypt from 'bcryptjs';

const users = [{
    name: " Dawit Habte",
    email: "dawit@gmail.com",
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
},
{
    name:"Trial User",
    email:"trial@gmail.com",
    password: bcrypt.hashSync('123', 10),
    isAdmin: false,
},
{
    name: "Bob",
    email: "bob@gmail.com",
    password: bcrypt.hashSync('123', 10),
    isAdmin: false,
},
{
    name: " Yoel Yo",
    email: "yoel@gmail.com",
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
}

]
export default users;