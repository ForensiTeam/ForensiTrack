const Ad = require('../models/Ad');

// GUVENLIK Y1: Regex ozel karakterlerini escape et (ReDoS onlemi)
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// G3: İlan Ekleme
exports.createAd = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // GUVENLIK O2: Input validation
    if (!title || !description || price == null || !category) {
      return res.status(400).json({ message: 'Tum alanlar zorunludur.' });
    }
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'Fiyat gecerli bir sayi olmalidir.' });
    }

    const newAd = new Ad({
      title, description, price, category, userId: req.user.userId
    });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    console.error('createAd hatasi:', err.message);
    res.status(400).json({ message: 'Ilan olusturulamadi.' });
  }
};

// G4: İlan Listeleme
exports.getAds = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const ads = await Ad.find().skip(skip).limit(limit);
    res.status(200).json(ads);
  } catch (err) {
    console.error('getAds hatasi:', err.message);
    res.status(500).json({ message: 'Ilanlar listelenemedi.' });
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

    // GUVENLIK Y4: Mass assignment koruması - sadece izin verilen alanlar
    const allowedFields = ['title', 'description', 'price', 'category'];
    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updatedAd = await Ad.findByIdAndUpdate(adId, updateData, { new: true });
    res.status(200).json(updatedAd);
  } catch (err) {
    console.error('updateAd hatasi:', err.message);
    res.status(400).json({ message: 'Ilan guncellenemedi.' });
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
    console.error('deleteAd hatasi:', err.message);
    res.status(500).json({ message: 'Ilan silinemedi.' });
  }
};

// G7: İlan Arama
exports.searchAds = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const safePage = Math.max(1, parseInt(page));
    const safeLimit = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (safePage - 1) * safeLimit;

    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    // GUVENLIK Y1: Regex injection koruması
    const safeQuery = escapeRegex(query);

    const ads = await Ad.find({
      $or: [
        { title: { $regex: safeQuery, $options: 'i' } },
        { description: { $regex: safeQuery, $options: 'i' } }
      ]
    }).skip(skip).limit(safeLimit);
    
    res.status(200).json(ads);
  } catch (err) {
    console.error('searchAds hatasi:', err.message);
    res.status(500).json({ message: 'Arama basarisiz.' });
  }
};

// G8: İlan Filtreleme
exports.filterAds = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const safePage = Math.max(1, parseInt(page));
    const safeLimit = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (safePage - 1) * safeLimit;

    let filterQuery = {};
    if (category) filterQuery.category = category;

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = Number(minPrice);
      if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
    }

    const ads = await Ad.find(filterQuery).skip(skip).limit(safeLimit);
    res.status(200).json(ads);
  } catch (err) {
    console.error('filterAds hatasi:', err.message);
    res.status(500).json({ message: 'Filtreleme basarisiz.' });
  }
};
