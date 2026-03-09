# Ümmühan Atmaca'nın REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Vaka Oluşturma (G7)
- **Endpoint:** `POST /api/cases`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "title": "Şirket Sunucusu İhlali",
    "description": "Sunucuya yetkisiz erişim şüphesi",
    "category": "Ag Adli Bilisimi",
    "priority": "yuksek"
  }
  ```
- **Response:** `201 Created` - Vaka başarıyla oluşturuldu ve takip numarası atandı

## 2. Vaka Önceliklendirme (G8)
- **Endpoint:** `PATCH /api/cases/{caseId}/priority`
- **Path Parameters:**
  - `caseId` (string, required) - Vakanın benzersiz kimlik numarası (örn: `FT-2026-001`)
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "priority": "kritik"
  }
  ```
- **Response:** `200 OK` - Öncelik seviyesi başarıyla güncellendi

## 3. Vaka Durum Güncelleme (G13)
- **Endpoint:** `PATCH /api/cases/{caseId}/status`
- **Path Parameters:**
  - `caseId` (string, required) - Vakanın benzersiz kimlik numarası (örn: `FT-2026-001`)
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "status": "Çözüldü"
  }
  ```
- **Response:** `200 OK` - Vaka durumu başarıyla güncellendi

## 4. Not Ekleme (G16)
- **Endpoint:** `POST /api/cases/{caseId}/notes`
- **Path Parameters:**
  - `caseId` (string, required) - Notun ekleneceği vakanın kimlik numarası (örn: `FT-2026-001`)
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "content": "Volatility3 ile yapılan bellek analizi tamamlandı. Şüpheli process tespit edildi."
  }
  ```
- **Response:** `201 Created` - Teknik not vaka geçmişine başarıyla eklendi

## 5. Araç Listeleme (G11)
- **Endpoint:** `GET /api/tools`
- **Query Parameters:**
  - `category` (string) - Araçları kategoriye göre filtreler:
    - `Bellek Analizi`
    - `Disk Analizi`
    - `Ag Analizi`
    - `Mobil Analiz`
    - `Sifreleme`
  - `page` (integer) - Sayfa numarası (varsayılan: 1)
  - `limit` (integer) - Sayfa başına araç sayısı (varsayılan: 10, maks: 50)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Araç listesi başarıyla getirildi

## 6. Araç Detay Görüntüleme (G12)
- **Endpoint:** `GET /api/tools/{toolId}`
- **Path Parameters:**
  - `toolId` (string, required) - Aracın benzersiz kimlik numarası (örn: `tool_volatility3`)
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Araç detayları başarıyla getirildi

## 7. Puan Verme (G14)
- **Endpoint:** `POST /api/reviews/rate`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "adId": "ad_501",
    "rating": 5
  }
  ```
- **Response:** `201 Created` - Puan başarıyla kaydedildi

## 8. Yorum Yapma (G15)
- **Endpoint:** `POST /api/reviews/comment`
- **Authentication:** Bearer Token gerekli
- **Request Body:**
  ```json
  {
    "adId": "ad_501",
    "comment": "Çok profesyonel bir hizmet, RAM analizini hızlı ve eksiksiz tamamladı."
  }
  ```
- **Response:** `201 Created` - Yorum başarıyla eklendi
