# AURORA — SSPE Monitoring & Governance Platform

> Portfolio case study — enterprise web application untuk kebutuhan Subsurface Performance & Engineering (SSPE) Regional 1.

## Ringkasan Proyek

**AURORA** (*Advanced Upstream Repository Orchestration & Reliable Analytics*) adalah platform web terpadu yang saya kembangkan untuk membantu tim **Pertamina Regional 1** mengelola dan memantau data operasional subsurface dalam satu sistem.

Platform ini mengonsolidasikan proses monitoring, perencanaan kerja, tata kelola FID, analitik, dan pelaporan yang sebelumnya tersebar di berbagai sumber data menjadi dashboard terpusat yang lebih mudah ditelusuri, dianalisis, dan digunakan dalam pengambilan keputusan.

| Informasi | Detail |
| --- | --- |
| Klien | Pertamina Regional 1 — Tim SSPE |
| Industri | Energi, Oil & Gas, Upstream |
| Peran saya | System Designer & Full-Stack Developer |
| Jenis proyek | Enterprise monitoring and workflow platform |
| Status | Private / proprietary project |

## Peran dan Kontribusi Saya

Dalam proyek ini saya bertanggung jawab atas proses pengembangan sistem secara end-to-end, meliputi:

- menerjemahkan kebutuhan bisnis dan alur kerja operasional menjadi modul aplikasi;
- merancang arsitektur aplikasi, struktur database, dan pola integrasi data;
- mengembangkan antarmuka dashboard yang responsif dan data-intensive;
- membangun API, autentikasi, validasi, serta kontrol akses aplikasi;
- mengembangkan visualisasi KPI, filter, drill-down, tabel, dan ekspor data;
- membangun alur impor data Excel bertahap untuk mendukung konsolidasi data;
- mengimplementasikan workflow FID, approval, audit trail, dan monitoring progres;
- menyiapkan migration, seed, konfigurasi deployment, dan dokumentasi teknis;
- melakukan pengujian, debugging, optimasi performa, dan pemeliharaan sistem.

## Tantangan Bisnis

Aktivitas SSPE melibatkan data lintas wilayah, entitas, sumur, proyek, periode, dan tahapan persetujuan. Ketika data tersebar dalam banyak file dan format, tim menghadapi beberapa tantangan:

- proses konsolidasi dan validasi data memerlukan waktu;
- status program kerja sulit dipantau secara menyeluruh;
- penelusuran hubungan antara rencana, realisasi, dan approval tidak sederhana;
- laporan manajemen membutuhkan pengolahan berulang;
- histori perubahan dan jejak keputusan perlu terdokumentasi dengan baik.

## Solusi yang Dibangun

AURORA menyediakan satu sumber informasi terpusat dengan alur berikut:

```text
Sumber Data & Excel
        ↓
Validasi dan Proses Import
        ↓
PostgreSQL + Prisma Data Layer
        ↓
API dan Business Workflow
        ↓
Dashboard, Analytics, Approval, dan Export
```

Arsitektur memisahkan lapisan data, business logic, server rendering, dan komponen interaktif agar setiap modul dapat dikembangkan serta dipelihara secara konsisten.

## Fitur Utama

### Monitoring Operasional

- monitoring realisasi drilling, Workover, dan Well Intervention/Well Service;
- rekonsiliasi produksi minyak dan gas;
- monitoring kesiapan pengeboran dan status sumur;
- tracking RKAP, WP&B, CAPEX, AFE, PPP, dan COR;
- monitoring reserves, FID, POD, Business Plan, dan RJPP;
- KPI cards, tren, perbandingan target–realisasi, dan drill-down detail.

### Governance dan Workflow FID

- master data dan pengajuan FID;
- funneling dan review berjenjang;
- workflow RK–BOR–WO sampai post-mortem;
- approval, revisi, close-out, dan evaluasi;
- timeline proses, status progres, notifikasi, dan audit trail;
- pengelolaan dokumen serta data pendukung pengajuan.

### Data dan Pelaporan

- filter lintas dimensi seperti zona, entitas, wilayah kerja, sumur, dan periode;
- tabel interaktif, pencarian, sorting, dan pivot;
- visualisasi chart untuk kebutuhan analitik dan eksekutif;
- ekspor data untuk analisis dan pelaporan lanjutan;
- phased ETL: upload, preview, commit, dan recompute;
- validasi data dan penanganan tipe numerik enterprise.

## Teknologi

| Area | Teknologi |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| UI & Styling | Tailwind CSS 4, shadcn/ui, Base UI |
| Data Visualization | Apache ECharts, Recharts, D3, C3 |
| Backend | Next.js App Router, Route Handlers, Server Components |
| Database | PostgreSQL |
| ORM & Migration | Prisma 7 |
| Authentication | Better Auth |
| Data Fetching | TanStack Query, SWR |
| Form & Validation | React Hook Form, Zod |
| Data Processing | ExcelJS, phased ETL workflow |
| Deployment | Docker, Node.js |

## Pendekatan Engineering

- **Modular architecture** — fitur dipisahkan berdasarkan domain monitoring, rencana kerja, FID, approval, dan master data.
- **Reusable components** — pola filter, KPI, chart, tabel, modal, serta ekspor digunakan kembali lintas modul.
- **Type-safe development** — TypeScript, schema validation, dan Prisma mengurangi risiko inkonsistensi data.
- **Server/client separation** — pengambilan data dan interaksi antarmuka ditempatkan pada lapisan yang tepat.
- **Auditability** — histori proses dan perubahan status dipertahankan untuk mendukung governance.
- **Incremental delivery** — sistem dikembangkan bertahap mengikuti prioritas dan validasi kebutuhan pengguna.

## Dampak Solusi

Sistem dirancang untuk memberikan manfaat berikut:

- menyatukan informasi lintas modul dalam satu platform;
- mempercepat monitoring KPI dan identifikasi deviasi;
- meningkatkan keterlacakan proses pengajuan dan persetujuan;
- mengurangi pekerjaan konsolidasi dan pelaporan berulang;
- menyediakan tampilan operasional dan manajerial dari sumber data yang sama;
- membentuk fondasi digital yang dapat dikembangkan untuk kebutuhan SSPE berikutnya.

> Detail metrik bisnis dan data operasional tidak ditampilkan karena bersifat internal klien.

## Preview

Tambahkan screenshot yang telah disetujui dan disanitasi ke folder `docs/images`, lalu aktifkan bagian berikut:

<!--
![Executive Dashboard](docs/images/dashboard-overview.png)
![FID Workflow](docs/images/fid-workflow.png)
![Monitoring Analytics](docs/images/monitoring-analytics.png)
-->

## Tentang Developer

**Yusril Prayoga** — Full-Stack Developer / Software Engineer

Saya membangun aplikasi web dan sistem informasi berbasis kebutuhan bisnis, mulai dari analisis proses, desain arsitektur, pengembangan frontend–backend, pengelolaan database, hingga deployment dan pemeliharaan.

- Portfolio: https://side-portfolio.vercel.app
- LinkedIn: https://www.linkedin.com/in/yusrilprayoga/
- GitHub: https://github.com/yusrilprayoga-code
- Email: yusrildataiku@gmail.com

## Kerahasiaan dan Hak Kekayaan Intelektual

Project asli, source code, data, dokumen, kredensial, serta informasi operasional bersifat **private dan proprietary**. Repository portofolio ini hanya boleh memuat studi kasus, dokumentasi tingkat tinggi, dan aset yang telah memperoleh izin untuk dipublikasikan.

Nama dan merek dagang milik masing-masing pemiliknya. Penyebutan klien pada studi kasus ini tidak menyiratkan endorsement. Pastikan publikasi nama klien, logo, screenshot, dan hasil pekerjaan telah sesuai dengan kontrak, NDA, serta persetujuan pihak terkait.

---

© 2026 Yusril Prayoga. Portfolio case study. All rights reserved.
