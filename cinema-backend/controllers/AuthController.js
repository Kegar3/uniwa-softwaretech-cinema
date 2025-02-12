const AuthService = require('../services/AuthService');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.login(username, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await AuthService.register(username, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};