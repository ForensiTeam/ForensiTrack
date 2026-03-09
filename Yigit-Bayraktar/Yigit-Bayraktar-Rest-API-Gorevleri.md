# Yiğit Bayraktar'ın REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Kayıt Olma (G1)
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "yigit_bayraktar",
    "email": "yigit@forensitrack.com",
    "password": "Forensic!2026",
    "role": "uzman"
  }
  ```
- **Response:** `201 Created` - Kullanıcı başarıyla oluşturuldu

## 2. Giriş Yapma (G2)
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "yigit@forensitrack.com",
    "password": "Forensic!2026"
  }
  ```
- **Response:** `200 OK` - Giriş başarılı, JWT token döndürüldü

## 3. İlan Ekleme (G3)
- **Endpoint:** `POST /api/ads`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "title": "RAM Analizi Hizmeti",
    "description": "Volatility3 ile bellek dökümü analizi",
    "category": "Bellek Adli Bilisimi",
    "price": 1500,
    "location": "İstanbul"
  }
  ```
- **Response:** `201 Created` - İlan başarıyla yayına alındı

## 4. İlan Listeleme (G4)
- **Endpoint:** `GET /api/ads`
- **Query Parameters:**
  - `page` (integer) - Sayfa numarası (varsayılan: 1)
  - `limit` (integer) - Sayfa başına ilan sayısı (varsayılan: 10, maks: 50)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - İlan listesi başarıyla getirildi

## 5. İlan Güncelleme (G5)
- **Endpoint:** `PUT /api/ads/{adId}`
- **Path Parameters:**
  - `adId` (string, required) - İlanın benzersiz kimlik numarası (örn: `ad_501`)
- **Authentication:** Bearer Token gerekli (sadece ilan sahibi)
- **Request Body:**
  ```json
  {
    "title": "Güncellenmiş RAM Analizi Hizmeti",
    "description": "Volatility3 ile detaylı bellek analizi",
    "category": "Bellek Adli Bilisimi",
    "price": 1800,
    "location": "İstanbul"
  }
  ```
- **Response:** `200 OK` - İlan başarıyla güncellendi

## 6. İlan Silme (G6)
- **Endpoint:** `DELETE /api/ads/{adId}`
- **Path Parameters:**
  - `adId` (string, required) - İlanın benzersiz kimlik numarası (örn: `ad_501`)
- **Authentication:** Bearer Token gerekli (sadece ilan sahibi)
- **Response:** `204 No Content` - İlan başarıyla silindi

## 7. İlan Arama (G9)
- **Endpoint:** `GET /api/ads/search`
- **Query Parameters:**
  - `query` (string, required) - Aranacak kelime veya ifade (örn: `ram analizi`)
  - `page` (integer) - Sayfa numarası (varsayılan: 1)
  - `limit` (integer) - Sayfa başına sonuç sayısı (varsayılan: 10, maks: 50)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Arama sonuçları başarıyla listelendi

## 8. İlan Filtreleme (G10)
- **Endpoint:** `GET /api/ads/filter`
- **Query Parameters:**
  - `category` (string, required) - Filtrelenecek kategori:
    - `Bellek Adli Bilisimi`
    - `Disk Adli Bilisimi`
    - `Mobil Adli Bilisimi`
    - `Ag Adli Bilisimi`
    - `Bulut Adli Bilisimi`
  - `page` (integer) - Sayfa numarası (varsayılan: 1)
  - `limit` (integer) - Sayfa başına sonuç sayısı (varsayılan: 10, maks: 50)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Filtrelenmiş ilanlar başarıyla listelendi
