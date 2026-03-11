1. **Vaka Oluşturma** (G9)
   - **API Metodu:** `POST /api/cases`
   - **Açıklama:** Yeni bir adli vaka dosyasının tanımlanmasını sağlar.

2. **Vaka Önceliklendirme** (G10)
   - **API Metodu:** `PATCH /api/cases/{caseId}/priority`
   - **Açıklama:** Vakanın önem derecesinin belirlenmesini sağlar.

3. **Vaka Durum Güncelleme** (G11)
   - **API Metodu:** `PATCH /api/cases/{caseId}/status`
   - **Açıklama:** Vakanın "Cozuldu" veya "Acik" olarak işaretlenmesini sağlar.

4. **Not Ekleme** (G12)
   - **API Metodu:** `POST /api/cases/{caseId}/notes`
   - **Açıklama:** Vaka dosyasına teknik inceleme notu eklenmesini sağlar.

5. **Araç Listeleme** (G13)
   - **API Metodu:** `GET /api/tools`
   - **Açıklama:** Adli bilişim araçlarının listelenmesini sağlar.

6. **Araç Detay Görüntüleme** (G14)
   - **API Metodu:** `GET /api/tools/{toolId}`
   - **Açıklama:** Bir aracın teknik bilgilerinin okunmasını sağlar.

7. **Puan Verme** (G15)
   - **API Metodu:** `POST /api/reviews/rate`
   - **Açıklama:** Uzman hizmetine 1-5 arası puan verilmesini sağlar.

8. **Yorum Yapma** (G16)
   - **API Metodu:** `POST /api/reviews/comment`
   - **Açıklama:** Uzman hizmeti altına geri bildirim yazılmasını sağlar.