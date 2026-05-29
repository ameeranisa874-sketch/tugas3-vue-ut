# SITTA - Sistem Pemesanan & Tracking Bahan Ajar Universitas Terbuka

Aplikasi web Vue.js v2 untuk mengelola pemesanan dan tracking bahan ajar di Universitas Terbuka.

## Struktur Proyek

```
tugas3-vue-ut/
│
├── index.html                  # File HTML utama
│
├── assets/
│   └── css/
│       └── style.css           # Gaya CSS global
│
├── data/
│   └── dataBahanAjar.json      # Dummy data JSON
│
├── js/
│   ├── app.js                  # Root Vue instance & state management
│   ├── services/
│   │   └── api.js              # Service untuk fetch data
│   └── components/
│       ├── stock-table.js      # Komponen <ba-stock-table>
│       ├── do-tracking.js      # Komponen <do-tracking>
│       ├── order-form.js       # Komponen <order-form>
│       ├── status-badge.js     # Komponen <status-badge>
│       └── app-modal.js        # Komponen <app-modal>
│
└── README.md                   # File ini
```

## Fitur Utama

### 1. Halaman Stok & CRUD (Stock Table)
- Menampilkan daftar stok bahan ajar dalam tabel
- **Create**: Tambah data bahan ajar baru (tekan Enter untuk simpan)
- **Read**: Lihat semua data stok
- **Update**: Edit data stok existing (tekan Enter untuk simpan)
- **Delete**: Hapus data (dengan konfirmasi modal)
- Filter berdasarkan UPBJJ dan Kategori
- Indikator status stok (Aman/Hijau, Menipis/Oranye, Kosong/Merah)

### 2. Halaman Tracking DO (DO Tracking)
- Cari DO berdasarkan Nomor DO atau NIM (tekan Enter)
- Reset pencarian (tekan Esc)
- Tambah DO baru dengan nomor auto-generate
- Lihat detail paket dan isi paket
- Tracking progress pengiriman dengan timeline

### 3. Halaman Formulir Pemesanan (Order Form)
- Form untuk membuat pesanan baru
- Validasi input
- Integrasi dengan data stok

## Vue Features yang Digunakan

### Data Binding & Directives
- `v-bind` untuk attribute binding
- `v-model` untuk two-way data binding
- `v-for` untuk list rendering
- `v-if`, `v-else`, `v-show` untuk conditional rendering
- `v-text`, `v-html` untuk text content

### Computed Properties
- Filter dan sorting data
- Dependent options (kategori muncul setelah memilih UPBJJ)

### Watchers
- Minimal 2 watcher untuk monitoring perubahan data

### Filters
- `currency`: Format mata uang (Rp)
- `unit`: Format satuan stok (buah)
- `formatDate`: Format tanggal (hari bulan tahun)

### Event Handlers
- Keyboard events (Enter, Esc)
- Mouse events (hover untuk tooltip)
- Click events untuk button actions

## Penggunaan

1. Clone repository
2. Buka `index.html` di browser
3. Data akan dimuat otomatis dari `data/dataBahanAjar.json`

## Teknologi

- **Vue.js v2** (CDN, tanpa build tools)
- **HTML5 & CSS3**
- **ES6 JavaScript**
- **JSON** untuk data storage

## Developer Notes

- Gunakan console untuk debugging
- Semua template ada di bawah `index.html` dengan prefix `tpl-`
- Service API di `js/services/api.js` handle fetch data
- Komponen menggunakan kebab-case naming convention

---

**Dibuat untuk Tugas Praktik 3 - Universitas Terbuka**
