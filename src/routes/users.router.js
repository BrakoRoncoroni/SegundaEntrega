const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const users = [
    {
        id: uuidv4(),
        name: "John Doe",
        email: "john.doe@example.com"
    },
    {
        id: uuidv4(),
        name: "Jane Smith",
        email: "jane.smith@example.com"
    },
    {
        id: uuidv4(),
        name: "Alice Johnson",
        email: "alice.johnson@example.com"
    },
    {
        id: uuidv4(),
        name: "Bob Brown",
        email: "bob.brown@example.com"
    },
    {
        id: uuidv4(),
        name: "Charlie Davis",
        email: "charlie.davis@example.com"
    },
    {
        id: uuidv4(),
        name: "Diana Evans",
        email: "diana.evans@example.com"
    },

];

router.get('/', (req, res) => {
    res.status(200).json(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
    