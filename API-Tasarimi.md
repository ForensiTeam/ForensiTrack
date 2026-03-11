# API Tasarımı - ForensiTrack OpenAPI Specification

**OpenAPI Spesifikasyon Dosyası:** [ForensiTrack-API.yaml](ForensiTrack-API.yaml)

Bu doküman, ForensiTrack adli bilişim platformu için OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış API tasarımını içermektedir.

---

## Genel Bilgiler

| Özellik | Değer |
|---|---|
| **API Standardı** | OpenAPI 3.0.3 |
| **Kimlik Doğrulama** | JWT Bearer Token (HTTP Bearer) |
| **Base URL (Mock)** | `https://e49102fe-a427-47fc-8c36-ed96f6e4229b.mock.pstmn.io` |
| **Base URL (Production)** | `https://forensitrack.api.com` |
| **İçerik Türü** | `application/json` |

---

## Gereksinim — Endpoint Eşleşme Tablosu

| G Kodu | Gereksinim | Metot | Endpoint |
|---|---|---|---|
| G1 | Kayıt Olma | `POST` | `/api/auth/register` |
| G2 | Giriş Yapma | `POST` | `/api/auth/login` |
| G3 | İlan Ekleme | `POST` | `/api/ads` |
| G4 | İlan Listeleme | `GET` | `/api/ads` |
| G5 | İlan Güncelleme | `PUT` | `/api/ads/{adId}` |
| G6 | İlan Silme | `DELETE` | `/api/ads/{adId}` |
| G7 | İlan Arama | `GET` | `/api/ads/search` |
| G8 | İlan Filtreleme | `GET` | `/api/ads/filter` |
| G9 | Vaka Oluşturma | `POST` | `/api/cases` |
| G10 | Vaka Önceliklendirme | `PATCH` | `/api/cases/{caseId}/priority` |
| G11 | Vaka Durum Güncelleme | `PATCH` | `/api/cases/{caseId}/status` |
| G12 | Not Ekleme | `POST` | `/api/cases/{caseId}/notes` |
| G13 | Araç Listeleme | `GET` | `/api/tools` |
| G14 | Araç Detay Görüntüleme | `GET` | `/api/tools/{toolId}` |
| G15 | Puan Verme | `POST` | `/api/reviews/rate` |
| G16 | Yorum Yapma | `POST` | `/api/reviews/comment` |

---

## Kimlik Doğrulama

API, **JWT tabanlı HTTP Bearer Token** kimlik doğrulaması kullanmaktadır.

```yaml
securitySchemes:
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT
```

**Kullanım:**
1. `POST /api/auth/login` ile giriş yapılır
2. Dönen `token` değeri sonraki isteklerde header'a eklenir:
   ```
   Authorization: Bearer <token>
   ```

**Public endpointler** (token gerektirmez):
- `POST /api/auth/register`
- `POST /api/auth/login`

---

## Etiketler (Tags)

| Etiket | Kapsanan Gereksinimler | Açıklama |
|---|---|---|
| `Auth` | G1, G2 | Kullanıcı kaydı ve kimlik doğrulama |
| `Ilanlar` | G3, G4, G5, G6, G7, G8 | İlan yönetimi, arama ve filtreleme |
| `Vakalar` | G9, G10, G11, G12 | Vaka takip ve not yönetimi |
| `Araclar` | G13, G14 | Adli bilişim araç rehberi |
| `Degerlendirmeler` | G15, G16 | Puan ve yorum işlemleri |

---

## Request Body Şemaları

### Auth Şemaları

#### UserInput (G1 - Kayıt Olma)
```json
{
  "username": "yigit_bayraktar",
  "email": "yigit@forensitrack.com",
  "password": "Forensic!2026",
  "role": "uzman"
}
```
> **Zorunlu alanlar:** `username`, `email`, `password`
> **role enum:** `uzman` | `musteri` | `admin`

#### LoginInput (G2 - Giriş Yapma)
```json
{
  "email": "yigit@forensitrack.com",
  "password": "Forensic!2026"
}
```
> **Zorunlu alanlar:** `email`, `password`

---

### İlan Şemaları

#### AdInput (G3 İlan Ekleme / G5 İlan Güncelleme)
```json
{
  "title": "RAM Analizi Hizmeti",
  "description": "Volatility3 ile bellek dökümü analizi yapılmaktadır.",
  "price": 1500,
  "category": "Bellek Adli Bilisimi"
}
```
> **Zorunlu alanlar:** `title`, `description`, `price`, `category`
> **category enum:** `Bellek Adli Bilisimi` | `Disk Adli Bilisimi` | `Mobil Adli Bilisimi` | `Ag Adli Bilisimi` | `Bulut Adli Bilisimi`

#### İlan Arama Parametreleri (G7)
| Parametre | Tür | Zorunlu | Açıklama |
|---|---|---|---|
| `query` | string | **Evet** | Aranacak kelime/ifade |
| `page` | integer | Hayır | Sayfa numarası (varsayılan: 1) |
| `limit` | integer | Hayır | Sayfa başına sonuç (varsayılan: 10, maks: 50) |

#### İlan Filtreleme Parametreleri (G8)
| Parametre | Tür | Zorunlu | Açıklama |
|---|---|---|---|
| `category` | string (enum) | **Evet** | Filtrelenecek kategori |
| `page` | integer | Hayır | Sayfa numarası (varsayılan: 1) |
| `limit` | integer | Hayır | Sayfa başına sonuç (varsayılan: 10, maks: 50) |

---

### Vaka Şemaları

#### CaseInput (G9 - Vaka Oluşturma)
```json
{
  "title": "Şirket Sunucusu İhlali",
  "description": "Sunucuya yetkisiz erişim şüphesiyle açılan vaka.",
  "priority": "Yuksek",
  "assignedExpert": "FT-99"
}
```
> **Zorunlu alanlar:** `title`, `description`, `priority`
> **priority enum:** `Kritik` | `Yuksek` | `Orta` | `Dusuk`

#### PriorityUpdate (G10 - Vaka Önceliklendirme)
```json
{
  "priority": "Kritik"
}
```
> **Zorunlu alanlar:** `priority`

#### StatusUpdate (G11 - Vaka Durum Güncelleme)
```json
{
  "status": "Cozuldu"
}
```
> **Zorunlu alanlar:** `status`
> **status enum:** `Acik` | `Cozuldu` | `Incelemede`

#### CaseNoteInput (G12 - Not Ekleme)
```json
{
  "note": "Volatility3 ile yapılan bellek analizi tamamlandı. Şüpheli process tespit edildi."
}
```
> **Zorunlu alanlar:** `note`

---

### Değerlendirme Şemaları

#### RateInput (G15 - Puan Verme)
```json
{
  "adId": "ad_501",
  "rating": 5
}
```
> **Zorunlu alanlar:** `adId`, `rating`
> **rating:** 1-5 arası tam sayı

#### CommentInput (G16 - Yorum Yapma)
```json
{
  "adId": "ad_501",
  "comment": "Analiz raporu son derece detaylı ve profesyoneldi. Kesinlikle tavsiye ederim."
}
```
> **Zorunlu alanlar:** `adId`, `comment`

---

## HTTP Durum Kodları

| Kod | Açıklama | Kullanılan Durumlar |
|---|---|---|
| `200 OK` | İstek başarılı | GET, PUT, PATCH |
| `201 Created` | Kayıt oluşturuldu | POST (kayıt, ilan, vaka, not, puan, yorum) |
| `204 No Content` | Silme başarılı | DELETE |
| `400 Bad Request` | Geçersiz istek verisi | Eksik/hatalı parametre |
| `401 Unauthorized` | Token eksik/geçersiz | Protected endpoint erişimi |
| `403 Forbidden` | Yetki yok | Başkasının kaydını değiştirme |
| `404 Not Found` | Kaynak bulunamadı | Geçersiz ID |
| `409 Conflict` | Çakışma | Kayıtlı e-posta ile tekrar kayıt |