
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting clean database setup...');

  // Create user accounts (authentication only - no demo business data)
  console.log('Creating user accounts...');
  
  // Hash passwords
  const demoPassword = await bcrypt.hash('johndoe123', 12);
  const grantPassword = await bcrypt.hash('grant2025', 12);

  // Create demo user (mandatory for testing)
  const demoUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: demoPassword,
      name: 'John Doe',
      role: 'admin',
    },
  });

  // Create Grant Kelly user
  const grantUser = await prisma.user.upsert({
    where: { email: 'grant@wcd954.com' },
    update: {},
    create: {
      email: 'grant@wcd954.com',
      password: grantPassword,
      name: 'Grant Kelly',
      role: 'admin',
    },
  });

  console.log('✅ User accounts created');

  // Initialize document counter (starting at 1986 as specified)
  console.log('Initializing document counter...');
  await prisma.documentCounter.upsert({
    where: { id: 'counter' },
    update: { current: 1986 },
    create: {
      id: 'counter',
      current: 1986,
    },
  });

  console.log('✅ Document counter initialized at 1986');
  console.log('🎉 Clean database setup completed successfully!');
  console.log('\n📝 User Accounts (Authentication Only):');
  console.log('   Email: john@doe.com | Password: johndoe123');
  console.log('   Email: grant@wcd954.com | Password: grant2025');
  console.log('\n🔢 Document numbering starts from: 1986');
  console.log('📊 No demo business data - ready for production use');
  console.log('🏁 System ready for World Class Detailing business operations');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
