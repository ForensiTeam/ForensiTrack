1. **Kayıt Olma** (G1)
   - **API Metodu:** `POST /api/auth/register`
   - **Açıklama:** Uzmanların sisteme yeni hesap açmasını sağlar.

2. **Giriş Yapma** (G2)
   - **API Metodu:** `POST /api/auth/login`
   - **Açıklama:** Kayıtlı uzmanların sisteme erişim sağlamasını sağlar.

3. **İlan Ekleme** (G3)
   - **API Metodu:** `POST /api/ads`
   - **Açıklama:** Uzmanın yeni bir hizmet ilanı oluşturmasını sağlar.

4. **İlan Listeleme** (G4)
   - **API Metodu:** `GET /api/ads`
   - **Açıklama:** Yayındaki tüm hizmet ilanlarının görüntülenmesini sağlar.

5. **İlan Güncelleme** (G5)
   - **API Metodu:** `PUT /api/ads/{adId}`
   - **Açıklama:** Uzmanın kendi ilan bilgilerini değiştirmesini sağlar.

6. **İlan Silme** (G6)
   - **API Metodu:** `DELETE /api/ads/{adId}`
   - **Açıklama:** Uzmanın kendi ilanını sistemden kaldırmasını sağlar.

7. **İlan Arama** (G7)
   - **API Metodu:** `GET /api/ads/search`
   - **Açıklama:** Kullanıcıların kelime bazlı ilan sorgulamasını sağlar.

8. **İlan Filtreleme** (G8)
   - **API Metodu:** `GET /api/ads/filter`
   - **Açıklama:** İlanların kategoriye göre ayrıştırılmasını sağlar.