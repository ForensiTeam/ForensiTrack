// Merkezi API Bağlantı Noktası (Central API Base URL)
// Yerel testlerde http://localhost:5000 kullanır.
// Vercel'e atıldığında Vercel Dashboard'undaki VITE_API_URL env variable'ı otomatik devreye girer.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE;
