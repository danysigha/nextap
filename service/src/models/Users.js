const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }, // Name field for identifying users
  phone: { type: String },
  cardNo: { type: String },
  accNo: { type: String },
  balance: { type: Number, default: 550 }, // Balance field with default value
  cards: [
    {
      nfcId: { type: String, required: true },
      pin: { type: String, required: true },
    },
  ], // Array to store NFC card details
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
