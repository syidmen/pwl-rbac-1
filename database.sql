-- Buat database
CREATE DATABASE IF NOT EXISTS rbac_db;
USE rbac_db;

-- Tabel roles
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel permissions
CREATE TABLE IF NOT EXISTS permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,  -- user:create, user:edit, role:view
  resource VARCHAR(50),               -- users, roles, permissions
  action VARCHAR(20)                  -- create, read, update, delete
);

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Tabel role_permissions (relasi many-to-many)
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INT,
  permission_id INT,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- ============================================================
-- Seed Data (jalankan setelah tabel dibuat)
-- ============================================================
-- NOTE: Password di-hash menggunakan bcrypt, gunakan script seed.ts
-- untuk seeding dengan password yang benar.
--
-- INSERT INTO roles (name) VALUES ('admin'), ('editor'), ('viewer');
-- INSERT INTO permissions (name, resource, action) VALUES
--   ('user:view', 'users', 'view'),
--   ('user:create', 'users', 'create'),
--   ('user:edit', 'users', 'edit'),
--   ('user:delete', 'users', 'delete'),
--   ('role:view', 'roles', 'view'),
--   ('role:create', 'roles', 'create'),
--   ('role:delete', 'roles', 'delete'),
--   ('permission:view', 'permissions', 'view'),
--   ('permission:create', 'permissions', 'create'),
--   ('permission:delete', 'permissions', 'delete'),
--   ('permission:assign', 'permissions', 'assign');
