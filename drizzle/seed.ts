/**
 * Database Seed Script - Drizzle Version
 * Creates initial admin user and optional demo data
 */

import { db } from '../lib/db';
import { users } from './schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function main() {
  console.log('🌱 Starting seed...');

  const enableDemoData = process.env.ENABLE_DEMO_DATA === 'true';
  console.log(`Demo data: ${enableDemoData ? 'ENABLED' : 'DISABLED'}`);

  try {
    // 1. Admin User (Always created)
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin2026!Secure';
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Check if admin already exists
    const existingAdmin = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);

    if (existingAdmin.length === 0) {
      const [admin] = await db.insert(users).values({
        id: crypto.randomUUID(),
        email: adminEmail,
        name: 'Admin User',
        passwordHash,
        role: 'admin',
      }).returning();

      console.log('✅ Admin user created:', {
        email: admin.email,
        password: adminPassword
      });
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Exit early if demo data is disabled
    if (!enableDemoData) {
      console.log('✅ Seed complete (admin only - demo data disabled)');
      console.log('');
      console.log('📋 Login credentials:');
      console.log('   Email: admin@example.com');
      console.log('   Password: Admin2026!Secure');
      console.log('');
      console.log('⚠️  IMPORTANT: Change the admin password after first login!');
      return;
    }

    // 2. Demo Data (Only if enabled)
    console.log('📊 Creating demo data...');

    // Add your demo data creation here
    // Example:
    // await db.insert(posts).values({
    //   title: 'Welcome Post',
    //   content: 'This is a demo post',
    //   published: true,
    //   authorId: admin.id,
    // });

    console.log('✅ Demo data created');
    console.log('✅ Seed complete');
    console.log('');
    console.log('📋 Login credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: Admin2026!Secure');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the admin password after first login!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

main()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
