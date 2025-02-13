const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = await AuthService.register(name, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
