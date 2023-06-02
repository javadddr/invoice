const Data = require('./schema');
const asyncHandler = require('express-async-handler')

const getGols = async (req, res) => {
  try {
    const data = await Data.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from the database.');
  }
};




const setGols = async (req, res) => {
  try {
    const dataArray = req.body;

    // Create an array to store the new data documents
    const newDataArray = [];

    for (const data of dataArray) {
      // Create a new instance of the Data model for each data object
      const newData = new Data(data);

      // Save the data to the database
      await newData.save();

      // Add the saved data document to the newDataArray
      newDataArray.push(newData);
    }

    res.status(200).json({ message: 'Data saved successfully.', newData: newDataArray });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Error saving data to the database.' });
  }
};





const updateGol = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    // Find the data by ID and update it
    const updatedData = await Data.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedData) {
      res.status(404).json({ message: 'Data not found.' });
    } else {
      res.status(200).json({ message: 'Data updated successfully.', data: updatedData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data in the database.');
  }
});




const deleteGol = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    // Find the data by ID and delete it
    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      res.status(404).json({ message: 'Data not found.' });
    } else {
      res.status(200).json({ message: 'Data deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data from the database.');
  }
});






module.exports={
  getGols,
  setGols,
  updateGol,
  deleteGol
  
}