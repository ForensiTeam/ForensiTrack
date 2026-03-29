require('dotenv').config();
const mongoose = require('mongoose');
const Tool = require('./models/Tool');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Yükleniyor...');
    
    await Tool.deleteMany({}); // Önce eski listeyi sil
    console.log('Eski amatör araçlar silindi.');

    await Tool.insertMany([
      { name: 'Magnet AXIOM', category: 'Kapsamlı İnceleme', description: 'Akılı cihazlar, bulut, IoT ve Windows/Mac sistemleri üzerinde derinlemesine adli bilişim analizi yapabilen endüstri standardı yazılım.', overallRating: 4.8 },
      { name: 'Cellebrite UFED', category: 'Mobil İnceleme', description: 'Dünya çapında kolluk kuvvetleri tarafından tercih edilen, kilitli mobil cihazlardan bile veri çıkarımı ve imaj alma aracı.', overallRating: 4.9 },
      { name: 'EnCase Forensic', category: 'Disk Analizi', description: 'Mahkemelerde delil olarak kabul edilebilirliği kanıtlanmış, siber suç soruşturmaları için gelişmiş disk imajı alma ve adli analiz yazılımı.', overallRating: 4.5 },
      { name: 'FTK (Forensic Toolkit)', category: 'Disk Analizi', description: 'Devasa veri setlerini çok hızlı indeksleyebilen, şifre kırıcılara ve e-posta analizine sahip güçlü adli analiz platformu.', overallRating: 4.6 },
      { name: 'Autopsy', category: 'Açık Kaynak Analiz', description: 'Dijital soruşturmalar için tasarlanmış ve kullanımı tamamen ücretsiz olan açık kaynaklı, modüler dijital adli tıp arayüzü.', overallRating: 4.7 },
      { name: 'Volatility Framework', category: 'Bellek (RAM) Analizi', description: 'Çalışan veya ele geçirilmiş sistemlerdeki zararlı yazılımları bulmak için kullanılan açık kaynak kodlu ileri RAM analiz aracı.', overallRating: 4.8 },
      { name: 'Wireshark', category: 'Ağ Analizi', description: 'Ağ trafiğini anlık olarak dinleyen, paket inceleme yetenekleri ile siber saldırıların tespiti için kullanılan global ağ analizörü.', overallRating: 4.9 },
      { name: 'XRY Forensic', category: 'Mobil İnceleme', description: 'MSAB tarafından geliştirilen, özellikle şifrelenmiş uygulamalardaki gizli verileri güvenli şekilde çıkarmaya odaklanan mobil araç.', overallRating: 4.4 },
      { name: 'Oxygen Forensic', category: 'Mobil & Bulut İnceleme', description: 'Sadece cihazlardan değil, drone, IoT ve bulut servislerinden (Google, iCloud) veri çıkarma konusunda uzman yazılım.', overallRating: 4.5 },
      { name: 'Ghidra', category: 'Tersine Mühendislik', description: 'NSA tarafından geliştirilip açık kaynak hale getirilen, zararlı yazılımları (malware) analiz etmek için kullanılan tersine mühendislik aracı.', overallRating: 4.9 }
    ]);
    
    console.log('10 Gerçek Adli Yazılım Başarıyla Eklendi!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Hata:', err);
    process.exit(1);
  });
