# Yiğit Bayraktar'ın REST API Metotları

**API Test Videosu:** [https://youtu.be/xv4smOf8WaA](https://youtu.be/xv4smOf8WaA)

## 1. Kayıt Olma (G1)
- **Endpoint:** `POST /api/auth/register`
- **Request Body:** 
  ```json
  {
    "username": "uzman_yigit",
    "email": "yigit@forensitrack.com",
    "password": "GuvenliSifre123!"
  }
  ```
- **Response:** `201 Created` - Kullanıcı başarıyla oluşturuldu

## 2. Giriş Yapma (G2)
- **Endpoint:** `POST /api/auth/login`
- **Request Body:** 
  ```json
  {
    "email": "yigit@forensitrack.com",
    "password": "GuvenliSifre123!"
  }
  ```
- **Response:** `200 OK` - JWT Token döndürülür
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

## 3. İlan Ekleme (G3)
- **Endpoint:** `POST /api/ads`
- **Request Body:** 
  ```json
  {
    "title": "RAM Analizi ve Zararlı Yazılım Tespiti",
    "description": "Volatility3 ile bellek dökümü analizi yapılmaktadır.",
    "price": 2500,
    "category": "Bellek Adli Bilisimi"
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - İlan başarıyla oluşturuldu

## 4. İlan Listeleme (G4)
- **Endpoint:** `GET /api/ads`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Tüm ilanlar listelenir

## 5. İlan Güncelleme (G5)
- **Endpoint:** `PUT /api/ads/{adId}`
- **Path Parameters:** 
  - `adId` (string, required) - İlan ID'si
- **Request Body:** 
  ```json
  {
    "title": "Güncellenmiş İlan Başlığı",
    "description": "Güncellenmiş açıklama",
    "price": 3000,
    "category": "Disk Adli Bilisimi"
  }
  ```
- **Authentication:** Bearer Token gerekli (Sadece ilan sahibi güncelleyebilir)
- **Response:** `200 OK` - İlan başarıyla güncellendi

## 6. İlan Silme (G6)
- **Endpoint:** `DELETE /api/ads/{adId}`
- **Path Parameters:** 
  - `adId` (string, required) - İlan ID'si
- **Authentication:** Bearer Token gerekli (Sadece ilan sahibi silebilir)
- **Response:** `200 OK` - İlan başarıyla silindi

## 7. İlan Arama (G7)
- **Endpoint:** `GET /api/ads/search?query={keyword}`
- **Query Parameters:** 
  - `query` (string, required) - Arama kelimesi
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Eşleşen ilanlar listelenir

## 8. İlan Filtreleme (G8)
- **Endpoint:** `GET /api/ads/filter?category={category}`
- **Query Parameters:** 
  - `category` (string, required) - Kategori adı
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Filtrelenen ilanlar listelenir
