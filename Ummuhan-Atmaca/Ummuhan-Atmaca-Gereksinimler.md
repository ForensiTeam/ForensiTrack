1. **Vaka Oluşturma** (G9)
   - **API Metodu:** `POST /api/cases`
   - **Açıklama:** Yeni bir adli vaka dosyasının sisteme tanımlanmasını sağlar. Vaka başlığı, açıklama ve öncelik seviyesi girilerek kayıt oluşturulur. Öncelik seviyeleri: Dusuk, Orta, Yuksek, Kritik. Vaka oluşturulduğunda varsayılan durum "Acik" olarak atanır. JWT token ile kimlik doğrulaması yapılır ve vaka sahibi giriş yapan kullanıcıya atanır.

2. **Vaka Önceliklendirme** (G10)
   - **API Metodu:** `PATCH /api/cases/{caseId}/priority`
   - **Açıklama:** Mevcut bir vakanın önem derecesinin değiştirilmesini sağlar. Uzmanlar vakanın aciliyetine göre önceliği Dusuk, Orta, Yuksek veya Kritik olarak güncelleyebilir. Değişiklik anlık olarak veritabanına yansıtılır ve güncellenmiş vaka bilgisi döndürülür.

3. **Vaka Durum Güncelleme** (G11)
   - **API Metodu:** `PATCH /api/cases/{caseId}/status`
   - **Açıklama:** Vakanın mevcut durumunun güncellenmesini sağlar. Durum seçenekleri: Acik (devam eden soruşturma), Incelemede (uzman incelemesi sürüyor), Cozuldu (soruşturma tamamlandı). Uzmanlar vaka ilerledikçe durumu güncelleyerek ekip içi koordinasyonu sağlar.

4. **Not Ekleme** (G12)
   - **API Metodu:** `POST /api/cases/{caseId}/notes`
   - **Açıklama:** Vaka dosyasına teknik inceleme notu eklenmesini sağlar. Her not, ekleyen uzmanın userId bilgisi ve zaman damgasıyla birlikte kayıt edilir. Notlar kronolojik sırayla saklanır ve vaka geçmişinin takibini kolaylaştırır. Bir vakaya sınırsız sayıda not eklenebilir.

5. **Araç Listeleme** (G13)
   - **API Metodu:** `GET /api/tools`
   - **Açıklama:** ForensiTrack platformundaki tüm adli bilişim araçlarının listelenmesini sağlar. EnCase, Wireshark, Volatility, Cellebrite gibi profesyonel araçlar kategori, açıklama ve ortalama puan bilgisiyle birlikte döndürülür. Araçlar veritabanına seed mekanizmasıyla yüklenir.

6. **Araç Detay Görüntüleme** (G14)
   - **API Metodu:** `GET /api/tools/{toolId}`
   - **Açıklama:** Bir aracın detaylı teknik bilgilerinin görüntülenmesini sağlar. Aracın adı, kategorisi, açıklaması, ortalama puanı ve o araca yapılmış tüm kullanıcı değerlendirmeleri (yorum + puan + kullanıcı adı) birlikte döndürülür.

7. **Puan Verme** (G15)
   - **API Metodu:** `POST /api/reviews/rate`
   - **Açıklama:** Uzmanların adli bilişim araçlarına 1-5 arası puan vermesini sağlar. Bir kullanıcı aynı araca tekrar puan verirse önceki puanı güncellenir (upsert mantığı). Puan verildiğinde aracın ortalama puanı otomatik olarak yeniden hesaplanır ve Tool modelindeki overallRating alanı güncellenir.

8. **Yorum Yapma** (G16)
   - **API Metodu:** `POST /api/reviews/comment`
   - **Açıklama:** Uzmanların adli bilişim araçları altına geri bildirim yazmasını sağlar. Bir kullanıcı aynı araca tekrar yorum yaparsa önceki yorumu güncellenir (upsert mantığı). Yorum metni zorunludur ve boş gönderilemez. Değerlendirmeler araç detay sayfasında kullanıcı adıyla birlikte görüntülenir.