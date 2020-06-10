const User = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

signUp = async (body) => {
  try {
    let hashedPassword = await bcrypt.hash(body.password, 12);
    
    let userParams = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      address: body.address,
      password: hashedPassword
    }

    let user = await User.findOne({ email: userParams.email });
    
    if (!user) {
      let createdUser = new User(userParams);
      createdUser.save();
      const token = jwt.sign(
        { userId: createdUser.id, },
        config.get("jwtSecret"),
        { expiresIn: '1h' }
      )
      return { token, id: createdUser.id };
    }

    else {
      return { message: 'User alredy exist!' };
    }
     
  } catch (error) {
    console.log(error);
  }
}

signIn = async (body) => {
  try {
    const { email, password } = body;

    let user = await User.findOne({ email });
    if (!user) return { message: 'Could not find user!' }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { message: 'Incorrect password!' }

    const token = jwt.sign(
      { userId: user.id, },
      config.get("jwtSecret"),
      { expiresIn: '1h' }
    )

    return { token, userId: user.id }
  } catch (error) {
    return { status: 404, error: error, message:'Something went wrong :(' };
  }
}

index = async () => {
  try {
    let users = await User.find({});
    return users;
  } catch (error) {
    return { status: 500, message: 'Something went wrong!' };
  }
}

deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete({ _id: userId });
    return { message: 'Deleted succesfully!' }
  } catch (error) {
    return { status: 404, error: error };
  }
}

updateUser = async (userId, body) => {
  try {
    if (Object.keys(body).length === 0) return { message: 'Nothing to update!' };

    let newUser = {};
    let allowedProps = ['firstName', 'lastName', 'phoneNumber', 'address', 'password'];
  
    allowedProps.forEach((prop) => {
      if (req.body.hasOwnProperty(prop)) newUser[prop] = req.body[prop];
    });

    let user = await User.findOneAndUpdate(
      {
        _id: userId
      },
      {
        $set: newUser
      },
      {
        new: true
      }
    );
    
    return { message: 'Updated succesfully!' };
  } catch(error) {
    return { error: error }
  }
}

userData = async (userId) => {
  try {
    let user = await User.findById({ _id: userId });
    if (user) {
      return { 
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        email: user.email
      } 
    } else {
      return { status: 404, message: "User doesn't exist" }
    }
  } catch (error) {
    console.log(error);
  } 
}

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.index = index;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.userData = userData