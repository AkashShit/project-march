var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const deleted = [true, false];
const goals = ['','Improve my health', 'Manage my wealth', 'Save time & money'];
const registertype = ["normal", "facebook", "google", "apple"];

var UserSchema = new Schema({
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  profile:{type: String, default: '' },
  phone:{type:Number,default:''},
  dob:{type:Date,default:''},
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  deviceToken: { type: String, default: '' },
  deviceType: { type: String, default: '' },  
  register_type: { type: String, default: 'normal', enum: registertype },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  isActive: { type: Boolean, default: true, enum: [true, false] }
}, { timestamps: true, versionKey: false });

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password, checkPassword) {
  return bcrypt.compareSync(password, checkPassword);
  //bcrypt.compare(jsonData.password, result[0].pass
};

// For pagination
UserSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);