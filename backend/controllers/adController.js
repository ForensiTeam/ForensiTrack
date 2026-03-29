const Ad = require('../models/Ad');

// G3: İlan Ekleme
exports.createAd = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const newAd = new Ad({
      title, description, price, category, userId: req.user.userId
    });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G4: İlan Listeleme
exports.getAds = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const ads = await Ad.find().skip(skip).limit(limit);
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G5: İlan Güncelleme
exports.updateAd = async (req, res) => {
  try {
    const { adId } = req.params;
    const ad = await Ad.findById(adId);
    
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    if (ad.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'User not authorized to update this ad' });
    }

    const updatedAd = await Ad.findByIdAndUpdate(adId, req.body, { new: true });
    res.status(200).json(updatedAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G6: İlan Silme
exports.deleteAd = async (req, res) => {
  try {
    const { adId } = req.params;
    const ad = await Ad.findById(adId);
    
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    if (ad.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'User not authorized to delete this ad' });
    }

    await Ad.findByIdAndDelete(adId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G7: İlan Arama
exports.searchAds = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    const ads = await Ad.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).skip(skip).limit(parseInt(limit));
    
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G8: İlan Filtreleme
exports.filterAds = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let filterQuery = {};
    if (category) filterQuery.category = category;

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = Number(minPrice);
      if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
    }

    const ads = await Ad.find(filterQuery).skip(skip).limit(parseInt(limit));
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
