// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const Tool = require('../models/Tool');
const Review = require('../models/Review');

// Seed Tools Helper
exports.seedTools = async (req, res) => {
  try {
    await Tool.deleteMany({});
    await Tool.insertMany([
      { name: 'Magnet AXIOM', category: 'Kapsamli Inceleme', description: 'Akilli cihazlar, bulut, IoT ve sistemler uzerinde derinlemesine adli bilisim analizi yapabilen endustri standardi yazilim.' },
      { name: 'Cellebrite UFED', category: 'Mobil Inceleme', description: 'Dunya capinda kolluk kuvvetleri tarafindan tercih edilen, kilitli mobil cihazlardan bile veri cikarimi ve imaj alma araci.' },
      { name: 'EnCase Forensic', category: 'Disk Analizi', description: 'Mahkemelerde delil olarak kabul edilebilirligi kanitlanmis, siber suc sorusturmalari icin gelismis disk imaji alma ve adli analiz yazilimi.' },
      { name: 'FTK (Forensic Toolkit)', category: 'Disk Analizi', description: 'Devasa veri setlerini cok hizli indeksleyebilen, sifre kiricilara ve e-posta analizine sahip guclu adli analiz platformu.' },
      { name: 'Autopsy', category: 'Acik Kaynak Analiz', description: 'Dijital sorusturmalar icin tasarlanmis ve kullanimi tamamen ucretsiz olan acik kaynakli, moduler dijital adli tip arayuzu.' },
      { name: 'Volatility Framework', category: 'Bellek Istihbarati', description: 'Calisan veya ele gecirilmis sistemlerdeki zararli yazilimlari bulmak icin kullanilan acik kaynak kodlu ileri duzey RAM analiz araci.' },
      { name: 'Wireshark', category: 'Ag Analizi', description: 'Ag trafigini anlik olarak dinleyen, paket inceleme yetenekleri ile siber saldirilarin tespiti icin kullanilan global ag analizoru.' },
      { name: 'XRY Forensic', category: 'Mobil Inceleme', description: 'Ozellikle sifrelenmis uygulamalardaki gizli verileri guvenli sekilde cikarmaya odaklanan gelismis mobil adli bilisim araci.' },
      { name: 'Oxygen Detective', category: 'Mobil/Bulut Inceleme', description: 'Sadece cihazlardan degil, drone, IoT ve bulut servislerinden (Google, iCloud) veri cikarma konusunda uzman yazilim.' },
      { name: 'Ghidra', category: 'Tersine Muhendislik', description: 'NSA tarafindan gelistirilip acik kaynak hale getirilen, zararli yazilimlari analiz etmek icin kullanilan tersine muhendislik araci.' }
    ]);
    res.status(201).json({ message: 'Arac kutuphanesi basariyla eklendi.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G13: Arac Listeleme
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// G14: Arac Detay Goruntuleme
exports.getToolById = async (req, res) => {
  try {
    const { toolId } = req.params;
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: 'Arac bulunamadi.' });
    
    const reviews = await Review.find({ toolId }).populate('userId', 'username');
    
    res.status(200).json({ tool, reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
