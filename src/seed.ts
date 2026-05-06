import 'dotenv/config';
import bcrypt from 'bcryptjs';
import pool from './config/database';

async function seed() {
  const conn = await pool.getConnection();

  try {
    // Buat tabel
    await conn.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) UNIQUE NOT NULL,
        resource VARCHAR(50),
        action VARCHAR(20)
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS role_permissions (
        role_id INT,
        permission_id INT,
        PRIMARY KEY (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      )
    `);

    // Seed roles
    await conn.query(`
      INSERT IGNORE INTO roles (name) VALUES ('admin'), ('editor'), ('viewer')
    `);

    // Seed permissions
    await conn.query(`
      INSERT IGNORE INTO permissions (name, resource, action) VALUES
        ('user:view',         'users',       'view'),
        ('user:create',       'users',       'create'),
        ('user:edit',         'users',       'edit'),
        ('user:delete',       'users',       'delete'),
        ('role:view',         'roles',       'view'),
        ('role:create',       'roles',       'create'),
        ('role:delete',       'roles',       'delete'),
        ('permission:view',   'permissions', 'view'),
        ('permission:create', 'permissions', 'create'),
        ('permission:delete', 'permissions', 'delete'),
        ('permission:assign', 'permissions', 'assign')
    `);

    // Admin: semua permission
    await conn.query(`
      INSERT IGNORE INTO role_permissions (role_id, permission_id)
      SELECT 1, id FROM permissions
    `);

    // Editor: user:view, user:create, role:view
    await conn.query(`
      INSERT IGNORE INTO role_permissions (role_id, permission_id)
      SELECT 2, id FROM permissions WHERE name IN ('user:view', 'user:create', 'role:view')
    `);

    // Viewer: user:view saja
    await conn.query(`
      INSERT IGNORE INTO role_permissions (role_id, permission_id)
      SELECT 3, id FROM permissions WHERE name = 'user:view'
    `);

    // Seed demo users dengan password ter-hash
    const adminPass  = await bcrypt.hash('admin123', 10);
    const editorPass = await bcrypt.hash('editor123', 10);
    const viewerPass = await bcrypt.hash('viewer123', 10);

    await conn.query(`
      INSERT IGNORE INTO users (username, password, role_id) VALUES
        ('admin',  ?, 1),
        ('editor', ?, 2),
        ('viewer', ?, 3)
    `, [adminPass, editorPass, viewerPass]);

    console.log('Seeding selesai!');
    console.log('');
    console.log('Demo accounts:');
    console.log('  admin  / admin123   -> semua akses');
    console.log('  editor / editor123  -> user:view, user:create, role:view');
    console.log('  viewer / viewer123  -> user:view saja');
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
