1. **Kayıt Olma**
   - **API Metodu:** `POST /api/auth/register`
   - **Açıklama:** Uzmanların sisteme yeni hesap açmasını sağlar.

2. **Giriş Yapma**
   - **API Metodu:** `POST /api/auth/login`
   - **Açıklama:** Kayıtlı uzmanların sisteme erişim sağlamasını sağlar.

3. **İlan Ekleme**
   - **API Metodu:** `POST /api/ads`
   - **Açıklama:** Uzmanın yeni bir hizmet ilanı oluşturmasını sağlar.

4. **İlan Listeleme**
   - **API Metodu:** `GET /api/ads`
   - **Açıklama:** Yayındaki tüm hizmet ilanlarının görüntülenmesini sağlar.

5. **İlan Güncelleme**
   - **API Metodu:** `PUT /api/ads/{adId}`
   - **Açıklama:** Uzmanın kendi ilan bilgilerini değiştirmesini sağlar.

6. **İlan Silme**
   - **API Metodu:** `DELETE /api/ads/{adId}`
   - **Açıklama:** Uzmanın kendi ilanını sistemden kaldırmasını sağlar.

7. **Vaka Oluşturma**
   - **API Metodu:** `POST /api/cases`
   - **Açıklama:** Yeni bir adli vaka dosyasının tanımlanmasını sağlar.

8. **Vaka Önceliklendirme**
   - **API Metodu:** `PATCH /api/cases/{caseId}/priority`
   - **Açıklama:** Vakanın önem derecesinin belirlenmesini sağlar.