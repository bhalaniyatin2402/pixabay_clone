import { Schema, model } from "mongoose";
import JWT from "jsonwebtoken";
import bacrypt from "bcryptjs";

const userModal = new Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "name atleast 3 char long"],
      maxLength: [20, "name should not greater than 20 character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "this email already registered"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password at least 6 character long"],
      maxLength: [20, "password not greater that 20 character"],
      select: false,
    },
    favorite: {
      type: Array,
    },
    history: [
      {
        imageId: String,
        width: Number,
        height: Number,
        time: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// run always when password changes in the database
// and hash password using bcrypt
userModal.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bacrypt.hash(this.password, 10);
  }
  next();
});

userModal.methods = {
  generateAuthToken: async function () {
    return await JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  },
};

const User = model("User", userModal);

export default User;
