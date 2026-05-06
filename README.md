# RBAC System (Role-Based Access Control)

Implementasi RBAC menggunakan **Bun.js + TypeScript + Express + EJS + TailwindCSS + MySQL2**

---

## Deskripsi

Project ini merupakan implementasi **Role-Based Access Control (RBAC)**, yaitu sistem pembatasan akses berdasarkan role pengguna.
Setiap user memiliki role, dan setiap role memiliki kumpulan permission tertentu.

Contoh:

* **Admin** → semua akses
* **Editor** → sebagian akses
* **Viewer** → hanya melihat data

---

## Fitur Utama

* Authentication (Login & Logout)
* Role-Based Access Control (RBAC)
* Middleware cek permission (`checkPermission`)
* CRUD User (basic)
* Relasi Role ↔ Permission (Many-to-Many)
* Tampilan menggunakan EJS + TailwindCSS
* Session-based authentication

---

## Tech Stack

* **Bun.js**
* **TypeScript**
* **Express.js**
* **MySQL2**
* **EJS (Template Engine)**
* **TailwindCSS**
* **express-session**
* **bcrypt**

---

## Struktur Folder

```
project/
├── .env
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routers/
│   ├── middleware/
│   ├── views/
│   └── seed.ts
```

---

## ⚙️ Setup & Instalasi

### 1. Clone Repository

```bash
git clone <repo-url>
cd <nama-folder>
```

### 2. Install Dependency

```bash
bun install
```

### 3. Setup Environment

Buat file `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=rbac_db
PORT=3000
SESSION_SECRET=your-secret-key
```

---

### 4. Setup Database

Buat database di MySQL:

```sql
CREATE DATABASE rbac_db;
```

Import struktur tabel (roles, users, permissions, dll)

---

### 5. Jalankan Seeder

```bash
bun run src/seed.ts
```

Seeder akan:

* Membuat role (admin, editor, viewer)
* Membuat permission
* Assign permission ke role
* Membuat user demo

---

### 6. Jalankan Aplikasi

```bash
bun run src/index.ts
```

Buka di browser:

```
http://localhost:3000/login
```

---

## Akun Demo

| Username | Password | Role   |
| -------- | -------- | ------ |
| admin    | 123      | admin  |
| editor   | 123      | editor |
| viewer   | 123      | viewer |

---

## Konsep RBAC

### Komponen

* **User** → pengguna sistem
* **Role** → peran (admin, editor, viewer)
* **Permission** → izin spesifik (user:create, user:delete)
* **Role_Permission** → relasi many-to-many

---

### Alur RBAC

1. User login → session disimpan
2. Request masuk ke route
3. Middleware `isAuthenticated` mengecek login
4. Middleware `checkPermission()` mengecek permission
5. Jika sesuai → akses diberikan
6. Jika tidak → **403 Forbidden**

---

## Testing Scenario

### Admin

* ✅ Bisa melihat user
* ✅ Bisa menambah user
* ✅ Bisa menghapus user

### Editor

* ✅ Bisa melihat user
* ✅ Bisa menambah user
* ❌ Tidak bisa menghapus user (403)

### Viewer

* ✅ Bisa melihat user
* ❌ Tidak bisa menambah user
* ❌ Tidak bisa menghapus user

---

## Catatan

* Jangan commit file `.env`
* Gunakan password hash (bcrypt)
* Gunakan `SESSION_SECRET` yang aman

---

## Endpoint Penting

| Endpoint   | Method | Deskripsi     |
| ---------- | ------ | ------------- |
| /login     | GET    | Halaman login |
| /login     | POST   | Proses login  |
| /logout    | GET    | Logout        |
| /users     | GET    | List user     |
| /users     | POST   | Tambah user   |
| /users/:id | DELETE | Hapus user    |

---

## Tujuan Pembelajaran

* Memahami konsep RBAC
* Implementasi middleware authorization
* Relasi database many-to-many
* Integrasi backend + view (EJS)

---

## 👨‍💻 Author

* Nama: (Isi nama kamu)
* NIM: (Isi NIM kamu)

---

## 📄 Lisensi

Untuk keperluan pembelajaran.
