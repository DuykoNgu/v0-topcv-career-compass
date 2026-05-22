const fs = require('fs');
const path = require('path');

const dirs = [
  'app/(auth)/welcome',
  'app/(auth)/login',
  'app/(auth)/career-stage',
  'app/(dashboard)/onboarding',
  'app/(dashboard)/compass-result',
  'app/(dashboard)/profile',
  'app/(dashboard)/jobs',
  'app/(dashboard)/job/[id]',
  'app/(dashboard)/apply',
  'app/(dashboard)/cv',
  'app/(dashboard)/fit-explanation',
  'app/(dashboard)/referral'
];

console.log('Creating directory structure...\n');

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log('✓ Created: ' + dir);
});

console.log('\n✅ All 12 directories created successfully!');
