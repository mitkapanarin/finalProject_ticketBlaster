const UserModel = require("../../../pkg/user/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const newUser = await UserModel.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    const token = jwt.sign(
      { id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      userData: {
        fullName,
        role,
        email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error, please try again", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    // 1) Prvoeruvame dali ima vneseno email i password
    if (!email || !password) {
      return res.status(400).send("Please provide email and password!");
    }

    // 2) Proveruvvame dali korisnikot posti
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send("this user doesn't exist");
    }
    // 3) Spreduvame pasvordite
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password!");
    }

    // 4) Generirame i isprakjame token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      userData: {
        fullName: findUser.fullName,
        role: findUser.role,
        email: findUser.email,
        token,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error, please try again", error: err });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const { fullName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        fullName,
        email,
        password: hashedPassword
      },
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Successfully updated user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(userID);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.allUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}