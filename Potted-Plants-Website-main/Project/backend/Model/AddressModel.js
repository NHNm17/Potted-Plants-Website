const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    type: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Address = mongoose.model("AddressModel", addressSchema);

module.exports = Address;
