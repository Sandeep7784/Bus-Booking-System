const Bus = require('../models/busModel');

// Create a new bus
exports.createBus = async (req, res) => {
  try {
    const { bus_name, total_seats, route_id, days_of_operation, schedule_time } = req.body;

    // Create a new bus and include days_of_operation and schedule_time
    const newBus = await Bus.create({
      bus_name,
      total_seats,
      route_id,
      days_of_operation: days_of_operation || 'Monday, Saturday, Thursday', // Default value
      schedule_time: schedule_time || '09:00:00', // Default value
    });

    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in creating bus' });
  }
};

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching buses' });
  }
};

// Update bus details
exports.updateBus = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const { bus_name, total_seats, route_id, days_of_operation, schedule_time } = req.body;

    const bus = await Bus.findByPk(bus_id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    bus.bus_name = bus_name || bus.bus_name;
    bus.total_seats = total_seats || bus.total_seats;
    bus.route_id = route_id || bus.route_id;
    bus.days_of_operation = days_of_operation || bus.days_of_operation; // Update days of operation if provided
    bus.schedule_time = schedule_time || bus.schedule_time; // Update schedule time if provided

    await bus.save();

    res.status(200).json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating bus' });
  }
};

// Delete bus
exports.deleteBus = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const bus = await Bus.findByPk(bus_id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    await bus.destroy();
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bus' });
  }
};
