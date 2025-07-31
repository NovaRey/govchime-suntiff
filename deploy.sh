#!/bin/bash

# Build the project
npm run build

# Create a temporary branch for deployment
git checkout -b gh-pages

# Copy dist contents to root
cp -r dist/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages --force

# Switch back to main
git checkout main
