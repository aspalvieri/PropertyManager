const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");
const Manager = require("../models/Manager");
const Landlord = require("../models/Landlord");
const Tenant = require("../models/Tenant");
const Property = require("../models/Property");

const findRoleUser = async (id, role) => {
  if (role === "manager") {
    return await Manager.findOne({ user_id: id }).catch(err => console.log(err));
  }
  else if (role === "landlord") {
    return await Landlord.findOne({ user_id: id }).catch(err => console.log(err));
  }
  else if (role === "tenant") {
    return await Tenant.findOne({ user_id: id }).catch(err => console.log(err));
  }
  else {
    return false;
  }
};

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  
  User.findOne({ username: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "User already exists!" });
    }
    else {
      const newUser = new User({
        username: req.body.email,
        password: req.body.password,
        role: "manager"
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
            newUser.password = hash;
          User.create(newUser).then(user => {
            Manager.create({ user_id: user.id }).then(manager => {
              res.json(user);
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        });
      });
    }
  }).catch(err => console.log(err));
};

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  // Find user by email
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Grab roleUser based on their role
        findRoleUser(user.id, user.role).then(roleUser => {
          if (!roleUser) {
            return res.status(404).json({ usernotfound: "User role not found" });
          }
          // Create JWT Payload, this data is stored in the token
          const payload = {
            //Change values here to control what user object has on frontend
            id: user.id,
            //Username will be an email for managers
            username: user.username,
            role: user.role,
            //Role user is the table link from role. IE: user.roleUser would be manager if user.role == manager
            roleUser: roleUser
          };
          // Sign token
          jwt.sign(payload, process.env.secret, {
              expiresIn: 259200 //3 days in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        }).catch(err => console.log(err));
      } 
      else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  }).catch(err => console.log(err));
};
