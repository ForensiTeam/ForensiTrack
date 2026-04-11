# Yiğit Bayraktar'ın Web Frontend Görevleri

## 1. Kayıt Olma Sayfası (G1)
- **API Endpoint:** `POST /api/auth/register`
- **Görev:** Uzman kayıt işlemi için web sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Responsive kayıt formu (dark theme, glassmorphism tasarım)
  - Kullanıcı adı input alanı (placeholder: uzman_adi)
  - Email input alanı (type="email", placeholder: ornek@forensitrack.com)
  - Şifre input alanı (type="password")
  - "Kayıt Ol (G1)" butonu (primary button style)
  - "Zaten hesabınız var mı? Giriş Yap" linki
  - Form container (glass-panel centered layout)
- **Form Validasyonu:**
  - HTML5 form validation (required attributes)
  - Tüm alanlar doldurulmadan submit engellenir
  - Email format kontrolü (browser native validation)
  - Sunucu tarafı duplicate email kontrolü
- **Kullanıcı Deneyimi:**
  - Başarılı kayıt sonrası success notification (yeşil alert)
  - Otomatik giriş sayfasına yönlendirme (1.5 saniye sonra)
  - Hata durumlarında kırmızı alert mesajı
  - Keyboard navigation desteği (Tab, Enter)
- **Teknik Detaylar:**
  - Framework: React (Vite)
  - API_BASE dinamik URL yapısı (VITE_API_URL)
  - useNavigate ile React Router yönlendirme
  - State management: useState hook

## 2. Giriş Yapma Sayfası (G2)
- **API Endpoint:** `POST /api/auth/login`
- **Görev:** Uzman giriş işlemi için web sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - Responsive giriş formu (dark theme, glassmorphism)
  - Email input alanı (type="email")
  - Şifre input alanı (type="password")
  - "Giriş Yap (G2)" butonu (primary button, full-width)
  - "Hesabınız yok mu? Kayıt Ol" linki
  - ForensiTrack logo ve açıklama metni
- **Token Yönetimi:**
  - Başarılı giriş sonrası JWT token localStorage'a kaydedilir
  - Token varlığına göre App.jsx protected route yönetimi
  - setIsAuthenticated ile global auth state güncellenir
- **Kullanıcı Deneyimi:**
  - Hatalı giriş denemelerinde anlamlı hata mesajları
  - Sunucuya bağlanılamadığında "Sunucuya bağlanılamadı" mesajı
  - Giriş sonrası otomatik /ads sayfasına yönlendirme
  - Giriş yapılmışsa login sayfası yerine /ads'e redirect

## 3. Hizmet İlanları Sayfası (G3, G4, G5, G6)
- **API Endpoints:** `POST /api/ads`, `GET /api/ads`, `PUT /api/ads/{adId}`, `DELETE /api/ads/{adId}`
- **Görev:** İlan CRUD işlemleri sayfası tasarımı ve implementasyonu
- **UI Bileşenleri:**
  - İlan kartları grid layout (cards-grid, responsive)
  - Her kart: kategori badge, fiyat, başlık, açıklama, düzenle/sil butonları
  - "+ Yeni İlan Ekle (G3)" butonu (header sağ üst)
  - Modal form (İlan Ekle/Düzenle) - başlık, açıklama, fiyat, kategori
  - Düzenle (G5) ve Sil (G6) butonları her kartın altında sabit konumda
  - Boş state mesajı (ilan yoksa)
- **İlan Ekleme/Güncelleme (G3/G5):**
  - Modal açılır, form doldurulur, "İlanı Kaydet" ile POST gönderilir
  - Düzenle butonunda anında sahiplik kontrolü (JWT userId karşılaştırma)
  - Yetki yoksa kırmızı alert: "Sadece kendi ilanınızı düzenleyebilirsiniz!"
- **İlan Silme (G6):**
  - Sil butonunda anında sahiplik kontrolü
  - Yetki yoksa kırmızı alert mesajı
  - Başarılı silme sonrası liste otomatik yenilenir
- **Kullanıcı Deneyimi:**
  - Hata ve başarı mesajları tıklanarak kapatılabilir
  - Modal dışına tıklayarak kapatma
  - Kart başına sabit düzen (açıklama flex:1, butonlar alt border ile ayrılmış)
- **Teknik Detaylar:**
  - JWT token'dan userId decode (atob ile payload parse)
  - Authorization header ile tüm istekler
  - fetchAds() ile her işlem sonrası otomatik yenileme

## 4. İlan Arama Sayfası (G7)
- **API Endpoint:** `GET /api/ads/search?query={keyword}`
- **Görev:** Kelime bazlı ilan arama özelliği
- **UI Bileşenleri:**
  - Arama input alanı (placeholder: "İlan ara... (G7)")
  - "Ara (G7)" butonu
  - Temizle butonu (arama/filtre aktifken görünür)
- **Kullanıcı Deneyimi:**
  - Enter tuşu ile arama tetiklenir
  - Boş query ile arama yapılırsa tüm ilanlar getirilir
  - Aramadan çıkmak için "Temizle" butonu

## 5. İlan Filtreleme Sayfası (G8)
- **API Endpoint:** `GET /api/ads/filter?category={category}`
- **Görev:** Kategoriye göre ilan filtreleme özelliği
- **UI Bileşenleri:**
  - Kategori dropdown select ("Tüm Kategoriler (G8)")
  - 5 kategori seçeneği (Bellek, Disk, Mobil, Ağ, Bulut)
  - Fiyat sıralama dropdown (Ucuzdan Pahalıya / Pahalıdan Ucuza)
- **Kullanıcı Deneyimi:**
  - Kategori değiştiğinde anında filtreleme
  - Fiyat sıralaması client-side çalışır
  - Temizle butonu ile tüm filtreler sıfırlanır
