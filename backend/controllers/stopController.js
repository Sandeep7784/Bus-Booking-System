const Stop = require('../models/stopModel');

// Create a new stop
exports.createStop = async (req, res) => {
  try {
    const { stop_name, route_id, stop_order } = req.body;

    const newStop = await Stop.create({
      stop_name,
      route_id,
      stop_order,
    });

    res.status(201).json({ message: 'Stop created successfully', stop: newStop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating stop' });
  }
};

// Get all stops for a route
exports.getStopsForRoute = async (req, res) => {
  try {
    const { route_id } = req.params;
    const stops = await Stop.findAll({ where: { route_id } });
    res.status(200).json(stops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stops' });
  }
};

exports.updateStop = async (req, res) => {
  try {
    const { stop_id } = req.params;
    const { stop_name, route_id, stop_order } = req.body;

    const stop = await Stop.findByPk(stop_id);
    if (!stop) {
      return res.status(404).json({ message: 'Stop not found' });
    }

    stop.stop_name = stop_name;
    stop.route_id = route_id;
    stop.stop_order = stop_order;

    await stop.save();
    res.status(200).json({ message: 'Stop updated successfully', stop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating stop' });
  }
};

exports.deleteStop = async (req, res) => {
  try {
    const { stop_id } = req.params;
    const stop = await Stop.findByPk(stop_id);
    if (!stop) {
      return res.status(404).json({ message: 'Stop not found' });
    }

    await stop.destroy();
    res.status(200).json({ message: 'Stop deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting stop' });
  }
};
