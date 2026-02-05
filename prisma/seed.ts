/**
 * Database Seed Script - Prisma Version
 * Creates initial admin user and optional demo data
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const enableDemoData = process.env.ENABLE_DEMO_DATA === 'true';
  console.log(`Demo data: ${enableDemoData ? 'ENABLED' : 'DISABLED'}`);

  // 1. Admin User (Always created)
  const adminPassword = 'Admin2026!Secure';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: passwordHash,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created/updated');

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
  // await prisma.post.create({
  //   data: {
  //     title: 'Welcome Post',
  //     content: 'This is a demo post',
  //     published: true,
  //     authorId: admin.id,
  //   },
  // });

  console.log('✅ Demo data created');
  console.log('✅ Seed complete');
  console.log('');
  console.log('📋 Login credentials:');
  console.log('   Email: admin@example.com');
  console.log('   Password: Admin2026!Secure');
  console.log('');
  console.log('⚠️  IMPORTANT: Change the admin password after first login!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
