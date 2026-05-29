import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createHash, randomUUID } from 'node:crypto';
import * as schema from '../src/lib/server/db/schema.js';

const { users, categories } = schema;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const client = postgres(DATABASE_URL);
const db = drizzle(client, { schema });

const SEED_USER_EMAIL = 'seed@ledgerwalker.dev';
const SEED_USER_PASSWORD = 'seed-password-do-not-use-in-production';

const DEFAULT_CATEGORIES: Array<{
  name: string;
  color: string;
  icon: string;
}> = [
  { name: 'Food', color: '#FF6B6B', icon: 'utensils' },
  { name: 'Transport', color: '#4ECDC4', icon: 'car' },
  { name: 'Housing', color: '#45B7D1', icon: 'home' },
  { name: 'Entertainment', color: '#96CEB4', icon: 'film' },
  { name: 'Health', color: '#FFEAA7', icon: 'heart' },
  { name: 'Income', color: '#55EFC4', icon: 'trending-up' },
];

async function seed() {
  console.log('Seeding database...');

  const passwordHash = createHash('sha256')
    .update(SEED_USER_PASSWORD)
    .digest('hex');

  const existingUsers = await db
    .select()
    .from(users)
    .limit(1);

  let seedUserId: string;

  if (existingUsers.length > 0 && existingUsers[0].email === SEED_USER_EMAIL) {
    seedUserId = existingUsers[0].id;
    console.log(`Seed user already exists: ${SEED_USER_EMAIL}`);
  } else {
    const [seedUser] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        email: SEED_USER_EMAIL,
        passwordHash,
      })
      .onConflictDoNothing()
      .returning();

    if (!seedUser) {
      const [found] = await db
        .select()
        .from(users)
        .limit(1);
      seedUserId = found.id;
      console.log(`Using existing user: ${found.email}`);
    } else {
      seedUserId = seedUser.id;
      console.log(`Created seed user: ${SEED_USER_EMAIL}`);
    }
  }

  for (const cat of DEFAULT_CATEGORIES) {
    await db
      .insert(categories)
      .values({
        id: randomUUID(),
        userId: seedUserId,
        name: cat.name,
        color: cat.color,
        icon: cat.icon,
        isDefault: true,
      })
      .onConflictDoNothing();
  }

  console.log(`Inserted ${DEFAULT_CATEGORIES.length} default categories.`);
  console.log('Seed complete.');
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => client.end());
