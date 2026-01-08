import { FairStatus } from '@prisma/client';
import { fairs } from '../src/data/fairs';
import prisma from '../src/lib/prisma';

async function main() {
  console.log('🚀 Starting fairs migration...');

  // Clear existing fairs (optional - remove if you want to keep existing data)
  // await prisma.fair.deleteMany({});
  // console.log('✅ Cleared existing fairs');

  let created = 0;
  let skipped = 0;

  for (const fair of fairs) {
    try {
      // Determine status based on dates
      const startDate = new Date(fair.startDate);
      const endDate = new Date(fair.endDate);
      const now = new Date();

      let status: FairStatus;
      if (endDate < now) {
        status = FairStatus.COMPLETED;
      } else if (startDate <= now && endDate >= now) {
        status = FairStatus.ONGOING;
      } else {
        status = FairStatus.UPCOMING;
      }

      // Check if fair already exists by name_tr and startDate
      const existingFair = await prisma.fair.findFirst({
        where: {
          name_tr: fair.name.tr,
          startDate: new Date(fair.startDate),
        },
      });

      if (existingFair) {
        console.log(`⏭️  Skipped: ${fair.name.tr} (already exists)`);
        skipped++;
        continue;
      }

      // Extract sector string (use Turkish version)
      const sectorStr = typeof fair.sector === 'string'
        ? fair.sector
        : fair.sector.tr;

      // Create fair in database
      await prisma.fair.create({
        data: {
          // Multilingual name fields
          name_tr: fair.name.tr,
          name_en: fair.name.en || fair.name.tr,

          // Multilingual description fields
          description_tr: fair.description.tr,
          description_en: fair.description.en || fair.description.tr,

          // Fair details
          sector: sectorStr,
          country: fair.location.country,
          city: fair.location.city,
          venue: fair.location.venue,
          startDate: new Date(fair.startDate),
          endDate: new Date(fair.endDate),
          status,

          // Optional metadata
          websiteUrl: fair.website || null,
          logoUrl: fair.image || null,
        },
      });

      console.log(`✅ Created: ${fair.name.tr} (${status})`);
      created++;
    } catch (error) {
      console.error(`❌ Error creating fair "${fair.name.tr}":`, error);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`   Created: ${created} fairs`);
  console.log(`   Skipped: ${skipped} fairs (already exist)`);
  console.log(`   Total: ${fairs.length} fairs processed`);
  console.log('\n✨ Migration completed!');
}

main()
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
