1. **İlan Arama**
   - **API Metodu:** `GET /api/ads/search`
   - **Açıklama:** Kullanıcıların kelime bazlı ilan sorgulamasını sağlar.

2. **İlan Filtreleme**
   - **API Metodu:** `GET /api/ads/filter`
   - **Açıklama:** İlanların kategoriye göre ayrıştırılmasını sağlar.

3. **Araç Listeleme**
   - **API Metodu:** `GET /api/tools`
   - **Açıklama:** Adli bilişim araçlarının listelenmesini sağlar.

4. **Araç Detay Görüntüleme**
   - **API Metodu:** `GET /api/tools/{toolId}`
   - **Açıklama:** Bir aracın teknik bilgilerinin okunmasını sağlar.

5. **Vaka Durum Güncelleme**
   - **API Metodu:** `PATCH /api/cases/{caseId}/status`
   - **Açıklama:** Vakanın "Çözüldü" veya "Açık" olarak işaretlenmesini sağlar.

6. **Puan Verme**
   - **API Metodu:** `POST /api/reviews/rate`
   - **Açıklama:** Uzman hizmetine 1-5 arası puan verilmesini sağlar.

7. **Yorum Yapma**
   - **API Metodu:** `POST /api/reviews/comment`
   - **Açıklama:** Uzman hizmeti altına geri bildirim yazılmasını sağlar.

8. **Not Ekleme**
   - **API Metodu:** `POST /api/cases/{caseId}/notes`
   - **Açıklama:** Vaka dosyasına teknik inceleme notu eklenmesini sağlar.