1. **Kayıt Olma** (G1)
   - **API Metodu:** `POST /api/auth/register`
   - **Açıklama:** Adli bilişim uzmanlarının ForensiTrack platformuna yeni hesap açmasını sağlar. Kullanıcı adı, e-posta adresi ve şifre bilgileri toplanarak benzersiz bir hesap oluşturulur. Şifre bcrypt ile hashlenerek güvenli şekilde veritabanına kaydedilir. Güvenlik için email adresinin benzersiz olması zorunludur.

2. **Giriş Yapma** (G2)
   - **API Metodu:** `POST /api/auth/login`
   - **Açıklama:** Kayıtlı adli bilişim uzmanlarının platforma güvenli erişim sağlamasını mümkün kılar. Kullanıcı e-posta ve şifre bilgilerini girer, sunucu tarafında bcrypt ile doğrulama yapılır. Başarılı giriş sonrası JWT (JSON Web Token) oluşturularak istemciye döndürülür. Token, sonraki tüm korumalı API isteklerinde kimlik doğrulama için kullanılır.

3. **İlan Ekleme** (G3)
   - **API Metodu:** `POST /api/ads`
   - **Açıklama:** Uzmanların kendi adli bilişim hizmetlerini ilan olarak yayınlamasını sağlar. İlan başlığı, açıklama, fiyat ve kategori bilgileri alınır. Kategori seçenekleri: Bellek Adli Bilisimi, Disk Adli Bilisimi, Mobil Adli Bilisimi, Ag Adli Bilisimi, Bulut Adli Bilisimi. JWT token ile kimlik doğrulaması yapılır ve ilan sahibi otomatik olarak giriş yapan kullanıcıya atanır.

4. **İlan Listeleme** (G4)
   - **API Metodu:** `GET /api/ads`
   - **Açıklama:** Platformda yayındaki tüm adli bilişim hizmet ilanlarının listelenmesini sağlar. Tüm ilanlar başlık, açıklama, fiyat, kategori ve oluşturulma tarihi bilgileriyle birlikte getirilir. Bearer Token ile yetkilendirme gereklidir.

5. **İlan Güncelleme** (G5)
   - **API Metodu:** `PUT /api/ads/{adId}`
   - **Açıklama:** Uzmanın yalnızca kendisine ait ilan bilgilerini düzenlemesini sağlar. Sunucu tarafında ilan sahibi ile JWT token'dan gelen userId karşılaştırılır. Eşleşme yoksa 403 Forbidden dönülür. Başlık, açıklama, fiyat ve kategori güncellenebilir.

6. **İlan Silme** (G6)
   - **API Metodu:** `DELETE /api/ads/{adId}`
   - **Açıklama:** Uzmanın yalnızca kendisine ait ilanı sistemden kalıcı olarak kaldırmasını sağlar. Sunucu tarafında sahiplik kontrolü yapılır, yetki dışı silme işlemleri engellenir. Başarılı silme işlemi sonrası ilan veritabanından silinir ve 200 OK dönülür.

7. **İlan Arama** (G7)
   - **API Metodu:** `GET /api/ads/search?query={keyword}`
   - **Açıklama:** Kullanıcıların kelime bazlı ilan araması yapmasını sağlar. Arama sorgusu ilan başlığı ve açıklaması üzerinde case-insensitive regex ile gerçekleştirilir. Eşleşen tüm ilanlar sonuç olarak döndürülür.

8. **İlan Filtreleme** (G8)
   - **API Metodu:** `GET /api/ads/filter?category={category}`
   - **Açıklama:** İlanların kategoriye göre ayrıştırılmasını sağlar. Kullanıcı istediği adli bilişim kategorisinizi seçerek (Bellek, Disk, Mobil, Ağ, Bulut) yalnızca o kategorideki ilanları görüntüler.