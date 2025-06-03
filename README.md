# 📖 Digital Qur'an

Digital Qur'an adalah aplikasi web yang menampilkan daftar surat dalam Al-Qur'an beserta isi surat dan terjemahannya. Aplikasi ini dibangun menggunakan **React.js**, **Tailwind CSS**, dan konsumsi API dari [equran.id](https://equran.id).

## 🚀 Fitur Utama

- Menampilkan semua surat Al-Qur'an (114 surat)
- Melihat detail surat, ayat, dan terjemahan
- Navigasi antar surat secara dinamis
- Desain responsif dan modern menggunakan Tailwind CSS
- Pemisahan komponen React untuk efisiensi dan keterbacaan kode

## 🛠️ Teknologi yang Digunakan

- **React.js** – Library JavaScript untuk membangun antarmuka pengguna
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – Untuk pengambilan data dari API
- **equran.id API** – Sumber data Al-Qur'an dan terjemahan

## 📂 Struktur Proyek

```bash
Digital-Qur-an/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── SurahCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── SurahDetail.jsx
│   ├── App.jsx
│   ├── index.js
│   └── App.css
├── tailwind.config.js
├── package.json
└── README.md
```
📸 Tampilan(https://github.com/aidilprmdta/Digital-Qur-an/blob/main/image.png?raw=true)

##📦 Cara Menjalankan Proyek
1. Clone repositori ini:
```
git clone https://github.com/aidilprmdta/Digital-Qur-an.git
cd Digital-Qur-an
```
2. Install dependencies:
```
npm install
```
3. Jalankan aplikasi:
```
npm run dev
```
4. Buka di browser:
```
http://localhost:5173
```
##🤝 Kontribusi
Kontribusi sangat terbuka! Kamu bisa:

Membuat pull request

Membuka issue untuk bug atau fitur baru

Fork dan kembangkan sendiri

##📜 Lisensi
Proyek ini dilisensikan di bawah MIT License.

Dibuat dengan ❤️ oleh Aidil Pramadita Putra
