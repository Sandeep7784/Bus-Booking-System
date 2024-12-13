const BusDetails = require('../models/busDetailsModel');

// Create bus details (schedule, days of operation)
exports.createBusDetails = async (req, res) => {
  try {
    const { bus_id, days_of_operation, schedule_time } = req.body;

    const busDetails = await BusDetails.create({
      bus_id,
      days_of_operation,
      schedule_time,
    });

    res.status(201).json({ message: 'Bus details created successfully', busDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating bus details' });
  }
};

// Get bus details by bus id
exports.getBusDetails = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const busDetails = await BusDetails.findOne({ where: { bus_id } });

    if (!busDetails) {
      return res.status(404).json({ message: 'Bus details not found' });
    }

    res.status(200).json(busDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bus details' });
  }
};

exports.updateBusDetails = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const { days_of_operation, schedule_time } = req.body;

    const busDetails = await BusDetails.findOne({ where: { bus_id } });
    if (!busDetails) {
      return res.status(404).json({ message: 'Bus details not found' });
    }

    busDetails.days_of_operation = days_of_operation;
    busDetails.schedule_time = schedule_time;

    await busDetails.save();

    res.status(200).json({ message: 'Bus details updated successfully', busDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating bus details' });
  }
};

exports.deleteBusDetails = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const busDetails = await BusDetails.findOne({ where: { bus_id } });
    if (!busDetails) {
      return res.status(404).json({ message: 'Bus details not found' });
    }

    await busDetails.destroy();
    res.status(200).json({ message: 'Bus details deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bus details' });
  }
};