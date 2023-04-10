const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ["Active", "Inactive"];

const CategorySchema = new Schema({
  category: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: "Active", enum: status },
}, { timestamps: true, versionKey: false });

// For pagination
CategorySchema.plugin(mongooseAggregatePaginate);

// create the model for Shop and expose it to our app
module.exports = mongoose.model('categoryModel', CategorySchema);