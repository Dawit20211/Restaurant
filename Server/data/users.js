import bcrypt from 'bcryptjs';

const users = [{
    name: " Dawit Habte",
    email: "dawit@gmail.com",
    password: bcrypt.hashSync('123', 10),
    phoneNumber: "093482394096",
    isAdmin: true,
},
{
    name:"Trial User",
    email:"trial@gmail.com",
    password: bcrypt.hashSync('123', 10),
    phoneNumber: "09823837402",

    isAdmin: false,
},
{
    name: "Bob",
    email: "bob@gmail.com",
    password: bcrypt.hashSync('123', 10),
    phoneNumber: "07923849284",

    isAdmin: false,
},
{
    name: " Yoel Yo",
    email: "yoel@gmail.com",
    password: bcrypt.hashSync('123', 10),
    phoneNumber: "08483482983",
    isAdmin: false,
}]
export default users;