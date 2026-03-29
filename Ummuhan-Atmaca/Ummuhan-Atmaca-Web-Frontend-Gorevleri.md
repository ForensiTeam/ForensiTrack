# Ümmühan Atmaca'nın Web Frontend Görevleri
**Front-end Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Vaka Oluşturma Sayfası (G9)
- **API Endpoint:** `POST /api/cases`
- **Görev:** Yeni adli vaka dosyası oluşturma sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - "+ Yeni Vaka Oluştur (G9)" butonu (header sağ üst)
  - Modal form: Vaka başlığı, açıklama textarea, öncelik dropdown
  - Öncelik seçenekleri: Dusuk, Orta, Yuksek, Kritik
  - "Vakayı Kaydet" butonu (primary, full-width)
  - "İptal" butonu (secondary, full-width)
- **Form Validasyonu:**
  - Başlık ve açıklama zorunlu alan kontrolü (required)
  - Varsayılan öncelik: Orta
- **Kullanıcı Deneyimi:**
  - Başarılı oluşturma sonrası yeşil success alert
  - Modal dışına tıklayarak kapatma
  - Form otomatik temizlenir
  - Vaka listesi otomatik yenilenir
- **Teknik Detaylar:**
  - Authorization header ile POST isteği
  - useState ile form state yönetimi
  - fetchCases() ile otomatik yenileme

## 2. Vaka Önceliklendirme (G10)
- **API Endpoint:** `PATCH /api/cases/{caseId}/priority`
- **Görev:** Vaka öncelik seviyesini değiştirme UI bileşeni
- **UI Bileşenleri:**
  - Her vaka kartında "Öncelik (G10)" etiketi
  - Dropdown select: Dusuk (yeşil), Orta (sarı), Yuksek (turuncu), Kritik (kırmızı)
  - Renk kodlu font (seçilen önceliğe göre dinamik renk)
- **Kullanıcı Deneyimi:**
  - Dropdown değiştiğinde anında PATCH isteği
  - Renk anında güncellenir
  - Sayfa yenilemesi gerekmez

## 3. Vaka Durum Güncelleme (G11)
- **API Endpoint:** `PATCH /api/cases/{caseId}/status`
- **Görev:** Vaka durum güncelleme UI bileşeni
- **UI Bileşenleri:**
  - Her vaka kartında "Durum (G11)" etiketi
  - Dropdown select: Acik (mavi), Incelemede (mor), Cozuldu (yeşil)
  - Renk kodlu font (seçilen duruma göre dinamik renk)
- **Kullanıcı Deneyimi:**
  - Dropdown değiştiğinde anında PATCH isteği
  - Renk anında güncellenir
  - Vaka akışı: Acik → Incelemede → Cozuldu

## 4. Not Ekleme (G12)
- **API Endpoint:** `POST /api/cases/{caseId}/notes`
- **Görev:** Vaka dosyasına teknik inceleme notu ekleme UI bileşeni
- **UI Bileşenleri:**
  - Her vaka kartının alt kısmında "Vaka Notları (G12)" bölümü
  - Koyu arkaplan ile ayrılmış not alanı
  - Mevcut notlar listesi (scrollable, maxHeight: 120px)
  - Her not başında 📝 emoji ile görsel ayrım
  - Not input alanı (placeholder: "Yeni not yazın... (G12)")
  - "Ekle (G12)" butonu
- **Kullanıcı Deneyimi:**
  - Enter tuşu ile not ekleme desteği
  - Not eklendikten sonra input otomatik temizlenir
  - Not listesi anında güncellenir
  - Boş not gönderimi engellenir
  - "Henüz not eklenmemiş" placeholder metni
- **Teknik Detaylar:**
  - noteContent state her vaka için ayrı tutulur (object key: caseId)
  - POST request body: { content: "not metni" }
  - fetchCases() ile otomatik yenileme

## 5. Araç Listeleme Sayfası (G13)
- **API Endpoint:** `GET /api/tools`
- **Görev:** Adli bilişim araçları listeleme sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Sayfa başlığı: "Adli Bilişim Araçları (G13)"
  - Araç kartları grid layout (cards-grid, responsive)
  - Her kart: 🛠️ emoji, kategori badge, araç adı, açıklama (100 karakter)
  - Ortalama puan (★ yıldız ve sayısal değer)
  - "Detayları Görüntüle (G14) →" linki
  - Hover efekti (translateY -4px animasyon)
  - "Araç Veritabanını Doldur" seed butonu (araç yoksa görünür)
- **Kullanıcı Deneyimi:**
  - Tüm kart tıklanabilir (detay modal açılır)
  - Hover'da kart yukarı kayar (micro-animation)
  - 10 adet adli bilişim aracı listelenir

## 6. Araç Detay Görüntüleme (G14)
- **API Endpoint:** `GET /api/tools/{toolId}`
- **Görev:** Araç detay modal tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Modal overlay (blur backdrop)
  - Araç bilgileri: kategori badge, isim, ortalama puan, tam açıklama
  - "Kapat" butonu (sağ üst)
  - Kullanıcı Değerlendirmeleri bölümü (yorum sayısı header'da)
  - Her değerlendirme kartı: avatar, @kullanıcıadı, "Adli Uzman" badge, yıldız puanı, yorum metni
  - Scrollable değerlendirme listesi (maxHeight: 250px)
- **Kullanıcı Deneyimi:**
  - Modal dışına tıklayarak kapatma
  - Değerlendirmeler kullanıcı adıyla birlikte görüntülenir
  - Boş state: "Henüz değerlendirme yok. İlk yorumu sen yap!"

## 7. Puan Verme (G15)
- **API Endpoint:** `POST /api/reviews/rate`
- **Görev:** Araç puanlama UI bileşeni
- **UI Bileşenleri:**
  - "Puan Ver (G15)" etiketi
  - Dropdown select: 1-5 arası yıldız seçimi (★☆ görsel)
  - Değerlendirme formu mavi çerçeveli container içinde
- **Kullanıcı Deneyimi:**
  - Varsayılan puan: 5
  - Gönderdikten sonra değerlendirme listesi anında güncellenir
  - "Değerlendirmeniz kaydedildi!" success alert

## 8. Yorum Yapma (G16)
- **API Endpoint:** `POST /api/reviews/comment`
- **Görev:** Araç yorumlama UI bileşeni
- **UI Bileşenleri:**
  - "Yorum Yaz (G16)" etiketi
  - Textarea input (placeholder: "Araç hakkındaki düşüncelerini yaz... (G16)")
  - "Gönder (G15-G16)" butonu (primary, full-width)
- **Kullanıcı Deneyimi:**
  - Puan ve yorum tek formla gönderilir
  - Yorum boş bırakılabilir (sadece puan gönderilebilir)
  - Gönderdikten sonra form temizlenir
  - Yeni yorum değerlendirmeler listesinde anında görünür
- **Teknik Detaylar:**
  - İki ayrı API çağrısı: önce /rate sonra /comment
  - openDetail() ile değerlendirmeler yeniden yüklenir
  - fetchTools() ile ortalama puan güncellenir
