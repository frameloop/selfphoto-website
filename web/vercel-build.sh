#!/bin/bash
echo "No build step required for static site"
echo "Copying files to output directory..."
cp -r . ../.vercel/output/
echo "Build completed successfully!"
