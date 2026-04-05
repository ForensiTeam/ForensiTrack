# Video Sunum ve Çekim Planı

## Sunum Videosu

> **Video Linki:** [https://youtu.be/-BQBAJC0ljw](https://youtu.be/-BQBAJC0ljw)

---

## Sunum Yapısı

### 1. Grup Lideri (Yiğit) - Açılış Konuşması (1-2 dakika)

**Konuşma İçeriği:**
- Ekibin tanıtımı.
- ForensiTrack projesinin genel tanıtımı (Adli bilişim uzmanları ve müşterileri buluşturan, vaka ve araç takibi yapan platform).
- Projenin amacı ve kapsamı.
- Sunumun yapısının kısaca açıklanması (Toplam 16 Gereksinimin 2 kişi arasında nasıl paylaşıldığı).

**Örnek Konuşma:**
> "Merhaba, ben Yiğit Bayraktar. Takım arkadaşım Ümmühan Atmaca ile birlikte ForensiTrack projesini geliştirdik. ForensiTrack, adli bilişim hizmetlerine ihtiyaç duyan müşterilerle, bu hizmetleri veren uzmanları bir araya getiren spesifik bir ilan ve vaka yönetim platformudur. Bugün sizlere projemizin uçtan uca çalıştığını canlı olarak göstereceğiz. İlk olarak ben kendi sorumluluğumda olan yetkilendirme ve ilan modüllerini anlatacağım, ardından sözü vaka, araç ve değerlendirme modüllerini sunması için Ümmühan'a bırakacağım."

---

### 2. Ekip Üyeleri - Kişisel Tanıtım ve Gereksinim Sunumu

#### A) Yiğit Bayraktar'ın Sunum Bölümü (Kişisel Tanıtım: 30sn | Demo: 6-8 dk)

**Kişisel Tanıtım:**
- "Merhaba, ben Yiğit Bayraktar. Projenin Full-Stack geliştiricisi olarak yetkilendirme, JWT bazlı güvenlik ve uzman ilan modüllerinden (G1'den G8'e kadar) sorumluyum."

**Gereksinimler ve Demo Akışı (Ekran Paylaşımıyla Gösterilecek):**
1. **Kayıt Olma (G1)**
   - API Metodu/Arayüz: `POST /api/auth/register` (Tasarımda Kayıt Ekranı)
   - Demo: "Postman'den veya arayüzden yeni bir uzman hesabı oluşturuyorum..."
2. **Giriş Yapma (G2)**
   - API Metodu/Arayüz: `POST /api/auth/login` (Tasarımda Giriş Ekranı)
   - Demo: "Oluşturduğum hesapla giriş yaparak token'ı alıyoruz ve güvenli sayfalara ulaşıyoruz."
3. **İlan Ekleme (G3)**
   - API Metodu/Arayüz: `POST /api/ads` (İlan Ekle Modal'ı)
   - Demo: "Sisteme giriş yaptığım hesapla 'Fidye Yazılımı İnceleme' gibi bir adli bilişim ilanı yayınlıyorum."
4. **İlan Listeleme (G4)**
   - API Metodu/Arayüz: `GET /api/ads` (Ana Sayfa)
   - Demo: "Eklediğimiz ilan ve daha önceki veritabanı kayıtları ana ilan havuzunda listeleniyor."
5. **İlan Güncelleme (G5)**
   - API Metodu/Arayüz: `PUT /api/ads/{adId}`
   - Demo: "Yalnızca ilanın sahibi olduğumuz için 'Fiyat'ı veya 'Başlığı' güncelliyoruz. (Sahibi olmayan bunu yapamaz)"
6. **İlan Silme (G6)**
   - API Metodu/Arayüz: `DELETE /api/ads/{adId}`
   - Demo: "Test için attığımız ilanı siliyoruz ve listeden kalktığını teyit ediyoruz."
7. **İlan Arama (G7)**
   - API Metodu/Arayüz: `GET /api/ads/search` (Genel Arama Çubuğu)
   - Demo: "Kelime bazlı (Örn: 'Veri Kurtarma') arama yapıyorum ve sadece o ilanlar geliyor."
8. **İlan Filtreleme (G8)**
   - API Metodu/Arayüz: `GET /api/ads/filter` (Kategori Dropdown)
   - Demo: "Sadece 'Mobil Adli Bilişimi' kategorisindeki uzmanlık ilanlarını filtreliyorum."

---

#### B) Ümmühan Atmaca'nın Sunum Bölümü (Kişisel Tanıtım: 30sn | Demo: 6-8 dk)

**Kişisel Tanıtım:**
- "Merhaba, ben Ümmühan Atmaca. Projenin Full-Stack geliştiricisi olarak vaka takip, araç veritabanı ve değerlendirme-yorum sistemlerinden (G9'dan G16'ya kadar) sorumluyum."

**Gereksinimler ve Demo Akışı (Ekran Paylaşımıyla Gösterilecek):**
1. **Vaka Oluşturma (G9)**
   - API Metodu: `POST /api/cases`
   - Demo: "Bir müşterinin analiz talebi üzerine sisteme yeni bir adli vaka kaydı oluşturuyorum."
2. **Vaka Önceliklendirme (G10)**
   - API Metodu: `PATCH /api/cases/{caseId}/priority`
   - Demo: "Vakanın kritik seviyesini (Örn: Kritik/Orta) güncelliyorum."
3. **Vaka Durum Güncelleme (G11)**
   - API Metodu: `PATCH /api/cases/{caseId}/status`
   - Demo: "Vakanın son durumunu (Açık'tan Çözüldü'ye) gibi geçiriyorum."
4. **Not Ekleme (G12)**
   - API Metodu: `POST /api/cases/{caseId}/notes`
   - Demo: "Vaka üzerinde çalışan uzman olarak teknik not/'log incelemesi bitti' kaydı atıyorum."
5. **Araç Listeleme (G13)**
   - API Metodu: `GET /api/tools`
   - Demo: "Sistemde rehber olarak sunulan adli bilişim araçlarını (Volatility, Autopsy vb.) listeliyoruz."
6. **Araç Detay Görüntüleme (G14)**
   - API Metodu: `GET /api/tools/{toolId}`
   - Demo: "'Volatility 3' aracının detaylarına girip komutlarına/işlevlerine bakıyoruz."
7. **Puan Verme (G15)**
   - API Metodu: `POST /api/reviews/rate`
   - Demo: "İşi tamamlanan uzmanın hizmet ilanına 5 puanlık bir skor gönderiyoruz."
8. **Yorum Yapma (G16)**
   - API Metodu: `POST /api/reviews/comment`
   - Demo: "Puanladığımız hizmet altına memnuniyet yorumumuzu yazıyoruz."

---

### 3. Kapanış Konuşması (1 dakika)

**Konuşma İçeriği:**
- Tüm gereksinimlerin tamamlandığının özeti
- Projenin başarıyla tamamlandığının vurgulanması

**Örnek Konuşma (Yiğit veya Ümmühan):**
> "Gördüğünüz gibi ForensiTrack, 16 temel gereksinimin tamamını başarıyla ve hatasız, yetkilendirmesiyle birlikte yürütmektedir. JWT token mekanizmasından tutun, MongoDB veritabanındaki CRUD (Ekleme/Düzenleme/Silme) işlemlerine kadar her iki farklı yapı (Vaka & İlan) aktif olarak entegre çalışmaktadır. Bizi izlediğiniz için teşekkür ederiz."

---

## Sunum Hazırlık Kontrol Listesi

### Genel/Teknik Hazırlık
- [ ] Yiğit ve Ümmühan ekran paylaşacakları programları hazırladı (OBS vb. veya Zoom Meets/Teams ile çekim)
- [ ] Kamera, ışıklandırma ve kaliteli mikrofon test edildi
- [ ] Render API, Vercel frontend ve Postman çekimden önce açılarak test edildi (Uyku devresini önlemek için)

### Kişisel Hazırlık ve Zamanlama
- **Toplam Hedef Süre:** Yaklaşık 15-20 Dakika (2 kişi için çok ideal bir süre)
- [ ] İkisinin de JWT token süreleri çekim esnasında düşmesin diye taze loginle başlanmalı.
- [ ] Hata veya teknik aksaklık göstermemek adına "Ad-blocker" veya yerel Proxy/VPN gibi eklentilerin tüm tarayıcılarda kapalı olduğu kesinleştirilmelidir.