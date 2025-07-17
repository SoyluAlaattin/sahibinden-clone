# Vercel Deployment Guide

## Elasticsearch Setup

Bu proje Elasticsearch kullanıyor. Vercel'de deploy etmek için:

### 1. Elasticsearch Hosting

Vercel'de Elasticsearch çalıştıramayız, bu yüzden external bir servis kullanmalısınız:

**Seçenekler:**
- **Elastic Cloud** (Önerilen): https://www.elastic.co/cloud/
- **AWS Elasticsearch Service**
- **Google Cloud Elasticsearch**
- **DigitalOcean Managed Elasticsearch**

### 2. Environment Variables

Vercel Dashboard'da şu environment variable'ı ekleyin:

```
ELASTICSEARCH_URL=https://your-elasticsearch-instance.com
```

### 3. Deployment Steps

1. **Elasticsearch instance'ınızı oluşturun**
2. **Vercel Dashboard'da Environment Variable ekleyin**
3. **Projeyi deploy edin**
4. **Test sayfasına gidin**: `https://your-app.vercel.app/test-elasticsearch`
5. **"Initialize with Sample Data" butonuna tıklayın**

### 4. Local Development

Local'de çalıştırmak için:

```bash
# Elasticsearch'i Docker ile başlat
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.13.4

# Projeyi başlat
npm run dev
```

### 5. Troubleshooting

**Build Error**: Eğer build hatası alırsanız:
- Elasticsearch client'ı sadece server-side'da çalışıyor
- Client-side'da import edilmemeli
- API route'ları kullanın

**Connection Error**: Elasticsearch bağlantı hatası:
- Environment variable'ı kontrol edin
- Elasticsearch instance'ının çalıştığından emin olun
- Firewall ayarlarını kontrol edin 