# Ümmühan Atmaca'nın REST API Metotları


## 1. Vaka Oluşturma (G9)
- **Endpoint:** `POST /api/cases`
- **Request Body:** 
  ```json
  {
    "title": "Şüpheli Disk İmajı İncelemesi",
    "description": "Ele geçirilen hard diskin adli analizi",
    "priority": "Yuksek"
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - Vaka başarıyla oluşturuldu

## 2. Vaka Önceliklendirme (G10)
- **Endpoint:** `PATCH /api/cases/{caseId}/priority`
- **Path Parameters:** 
  - `caseId` (string, required) - Vaka ID'si
- **Request Body:** 
  ```json
  {
    "priority": "Kritik"
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Öncelik başarıyla güncellendi

## 3. Vaka Durum Güncelleme (G11)
- **Endpoint:** `PATCH /api/cases/{caseId}/status`
- **Path Parameters:** 
  - `caseId` (string, required) - Vaka ID'si
- **Request Body:** 
  ```json
  {
    "status": "Cozuldu"
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Durum başarıyla güncellendi

## 4. Not Ekleme (G12)
- **Endpoint:** `POST /api/cases/{caseId}/notes`
- **Path Parameters:** 
  - `caseId` (string, required) - Vaka ID'si
- **Request Body:** 
  ```json
  {
    "content": "Disk imajı üzerinde silinen dosyalar FTK ile kurtarıldı."
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - Not başarıyla eklendi

## 5. Araç Listeleme (G13)
- **Endpoint:** `GET /api/tools`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Tüm adli bilişim araçları listelenir

## 6. Araç Detay Görüntüleme (G14)
- **Endpoint:** `GET /api/tools/{toolId}`
- **Path Parameters:** 
  - `toolId` (string, required) - Araç ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Araç detayları ve kullanıcı değerlendirmeleri döndürülür

## 7. Puan Verme (G15)
- **Endpoint:** `POST /api/reviews/rate`
- **Request Body:** 
  ```json
  {
    "toolId": "665abc123def456ghi789",
    "rating": 5
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Puan başarıyla kaydedildi

## 8. Yorum Yapma (G16)
- **Endpoint:** `POST /api/reviews/comment`
- **Request Body:** 
  ```json
  {
    "toolId": "665abc123def456ghi789",
    "comment": "Harika bir araç, çok kullanışlı ve detaylı analiz sunuyor."
  }
  ```
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Yorum başarıyla kaydedildi
