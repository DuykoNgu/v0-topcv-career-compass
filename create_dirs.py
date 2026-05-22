#!/usr/bin/env python3
import os
import sys

os.chdir('d:\\FE\\v0-topcv-career-compass')

dirs = [
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
]

print('Creating directory structure...\n')

for d in dirs:
    try:
        os.makedirs(d, exist_ok=True)
        print(f'✓ Created: {d}')
    except Exception as e:
        print(f'✗ Error creating {d}: {e}', file=sys.stderr)
        sys.exit(1)

print('\n✅ All 12 directories created successfully!')
