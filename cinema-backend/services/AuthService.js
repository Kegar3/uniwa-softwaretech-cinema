const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Βεβαιωνόμαστε ότι φορτώνουμε το .env

exports.login = async (username, password) => {
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
};

exports.register = async (username, email, password) => {
    const user = await User.create({ username, email, password: await bcrypt.hash(password, 8) });

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
};