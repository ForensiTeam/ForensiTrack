const Tool = require('../models/Tool');

// G13: Araç Listeleme
exports.getTools = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = category ? { category } : {};
    const tools = await Tool.find(query).skip(skip).limit(parseInt(limit));
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G14: Araç Detay Görüntüleme
exports.getToolDetails = async (req, res) => {
  try {
    const { toolId } = req.params;
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: 'Araç bulunamadı' });
    res.status(200).json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
