// Скрипт для перевірки налаштування проекту
const fs = require('fs');
const path = require('path');

console.log('🔍 Перевірка налаштування проекту...\n');

// Перевірка .env файлу
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('✅ Файл .env існує');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasDatabaseUrl = envContent.includes('DATABASE_URL=');
    const hasNextAuthSecret = envContent.includes('NEXTAUTH_SECRET=');
    const hasNextAuthUrl = envContent.includes('NEXTAUTH_URL=');
    
    console.log(hasDatabaseUrl ? '✅ DATABASE_URL встановлено' : '❌ DATABASE_URL відсутній');
    console.log(hasNextAuthSecret ? '✅ NEXTAUTH_SECRET встановлено' : '❌ NEXTAUTH_SECRET відсутній');
    console.log(hasNextAuthUrl ? '✅ NEXTAUTH_URL встановлено' : '❌ NEXTAUTH_URL відсутній');
} else {
    console.log('❌ Файл .env не знайдено!');
    console.log('   Створіть файл .env з наступним вмістом:');
    console.log('   DATABASE_URL="mongodb+srv://..."');
    console.log('   NEXTAUTH_SECRET="..."');
    console.log('   NEXTAUTH_URL="http://localhost:3000"');
}

// Перевірка Prisma Client
const prismaClientPath = path.join(__dirname, 'src', 'generated', 'prisma');
if (fs.existsSync(prismaClientPath)) {
    console.log('\n✅ Prisma Client згенеровано');
} else {
    console.log('\n❌ Prisma Client не згенеровано!');
    console.log('   Виконайте: npx prisma generate');
}

// Перевірка node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    console.log('\n✅ node_modules встановлено');
} else {
    console.log('\n❌ node_modules відсутній!');
    console.log('   Виконайте: npm install');
}

console.log('\n📋 Наступні кроки:');
console.log('1. Переконайтеся, що .env файл містить правильні значення');
console.log('2. Виконайте: npx prisma generate');
console.log('3. Перевірте підключення до MongoDB');
console.log('4. Запустіть: npm run dev');
console.log('5. Перевірте консоль сервера на помилки');
