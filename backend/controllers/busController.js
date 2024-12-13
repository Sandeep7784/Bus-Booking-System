const Bus = require('../models/busModel');

// Create a new bus
exports.createBus = async (req, res) => {
  try {
    const { bus_name, total_seats, route_id } = req.body;

    const newBus = await Bus.create({
      bus_name,
      total_seats,
      route_id,
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
    const { bus_name, total_seats, route_id } = req.body;

    const bus = await Bus.findByPk(bus_id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    bus.bus_name = bus_name || bus.bus_name;
    bus.total_seats = total_seats || bus.total_seats;
    bus.route_id = route_id || bus.route_id;

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