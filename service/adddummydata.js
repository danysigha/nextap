const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// MongoDB Connection URI
const MONGO_URI = "mongodb+srv://parkarar:jB44lCrZK5WAr5Wh@profile.u3s1j.mongodb.net/?retryWrites=true&w=majority&appName=profile";

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  cardNo: String,
  accNo: String,
});

const User = mongoose.model("User", UserSchema);

const addDummyUser = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected!");

    const hashedPassword = await bcrypt.hash("123", 10);

    const dummyUser = new User({
      email: "p@admin.com",
      password: hashedPassword,
      name: "Arslan P",
      phone: "+876887567",
      cardNo: "2234 5278 9012",
      accNo: "0001233456799",
    });

    await dummyUser.save();
    console.log("Dummy user inserted into 'users' collection!");
  } catch (err) {
    console.error("Error inserting user:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

addDummyUser();