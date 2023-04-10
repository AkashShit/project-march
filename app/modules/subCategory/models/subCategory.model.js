const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = ["Active", "Inactive"];

const subCategorySchema = new Schema({
  categoryType: {type: Schema.Types.ObjectId, ref:'categoryModel' },
  subCategory: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: "Active", enum: status },
}, { timestamps: true, versionKey: false });

// For pagination
subCategorySchema.plugin(mongooseAggregatePaginate);

// create the model for Shop and expose it to our app
module.exports = mongoose.model('subCategoryModel', subCategorySchema);