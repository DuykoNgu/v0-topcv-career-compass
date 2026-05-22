#!/bin/bash

# Create route directory structure
echo "Creating route directories..."

# Auth group
mkdir -p "app/(auth)/welcome"
mkdir -p "app/(auth)/login"
mkdir -p "app/(auth)/career-stage"

# Dashboard group
mkdir -p "app/(dashboard)/onboarding"
mkdir -p "app/(dashboard)/compass-result"
mkdir -p "app/(dashboard)/profile"
mkdir -p "app/(dashboard)/jobs"
mkdir -p "app/(dashboard)/job/[id]"
mkdir -p "app/(dashboard)/apply"
mkdir -p "app/(dashboard)/cv"
mkdir -p "app/(dashboard)/fit-explanation"
mkdir -p "app/(dashboard)/referral"

echo "✓ Directories created successfully!"
echo ""
echo "Next steps:"
echo "1. Restart your development server"
echo "2. Routes will be automatically available:"
echo "   - /welcome"
echo "   - /login"
echo "   - /career-stage"
echo "   - /onboarding"
echo "   - /compass-result"
echo "   - /profile"
echo "   - /jobs"
echo "   - /job/[id]"
echo "   - /apply"
echo "   - /cv"
echo "   - /fit-explanation"
echo "   - /referral"
