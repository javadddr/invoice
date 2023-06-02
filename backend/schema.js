const mongoose = require('mongoose');

// Define the schema for your collection
const dataSchema = new mongoose.Schema({
  dateselected: {
    type: Date,
    required: true
  },
  Name2: {
    type: String,
    required: true
  },
  Name1: {
    type: String,
    required: true
  },
  'Metal 1': {
    type: String,
    required: true
  },
  'kg 1': {
    type: Number,
    required: true
  },
  'pricePerKg 1': {
    type: Number,
    required: true
  },
  'totalPrice 1': {
    type: Number,
    required: true
  },
  totalKg: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
  
},{
    toJSON: { virtuals: true },
  });

// Virtual property for weekday
dataSchema.virtual('weekday').get(function() {
  return this.dateselected.getDay();
});

// Virtual property for month
dataSchema.virtual('month').get(function() {
  return this.dateselected.getMonth();
});

// Virtual property for week number and year
dataSchema.virtual('weekNumber').get(function() {
  const date = new Date(this.dateselected);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNumber;
});

dataSchema.virtual('year').get(function() {
  return this.dateselected.getFullYear();
});

// Virtual property for quarter and year
dataSchema.virtual('quarter').get(function() {
  const month = this.dateselected.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return quarter;
});

dataSchema.virtual('quarterYear').get(function() {
  const year = this.dateselected.getFullYear();
  const quarter = Math.floor(this.dateselected.getMonth() / 3) + 1;
  return `${quarter}Q${year}`;
});

// Create a model using the schema
const Data = mongoose.model('Data', dataSchema);

// Export the model
module.exports = Data;
