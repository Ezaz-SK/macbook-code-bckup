// Script to replace Cloudinary URLs with local assets in a repeating pattern
const fs = require('fs');
const path = require('path');

// Available images in order
const images = [
  'earring.jpeg',
  'icecream.jpeg',
  'powerpops.jpeg',
  'princles.jpeg',
  'shine.jpeg',
  'specs.jpeg',
  'sunsscreen.jpeg',
  'sweet_escape.jpeg',
  'water_bottle.jpeg'
];

// Read the HTML file
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Pattern to match img tags with srcset and src attributes
const imgPattern = /<img[^>]*srcset="([^"]*)"[^>]*src="([^"]*)"[^>]*>/g;

// Find all matches and replace them with local assets in repeating pattern
let match;
let imageIndex = 0;
const replacements = [];

while ((match = imgPattern.exec(html)) !== null) {
  const srcsetContent = match[1];
  const srcContent = match[2];
  const fullMatch = match[0];

  // Get current image from pattern
  const currentImage = images[imageIndex % images.length];

  // Extract size information from the img tag's sizes attribute or use defaults
  const sizesMatch = fullMatch.match(/sizes="[^"]*min-width:\s*(\d+)px[^"]*"/);
  let size1, size2;

  if (sizesMatch) {
    const baseSize = parseInt(sizesMatch[1]);
    size1 = baseSize;
    size2 = baseSize * 2; // 2x for retina
  } else {
    // Default fallback sizes based on common patterns
    size1 = 120;
    size2 = 240;
  }

  // Create new srcset with local paths
  const newSrcset = `srcset="./assets/${currentImage}    ${size1}w, ./assets/${currentImage} ${size2}w"`;
  const newSrc = `src="./assets/${currentImage}"`;

  // Replace in the HTML
  const newTag = fullMatch.replace(/srcset="[^"]*"/, newSrcset).replace(/src="[^"]*"/, newSrc);
  replacements.push({
    old: fullMatch,
    new: newTag
  });

  imageIndex++;
}

// Apply all replacements
replacements.forEach(({ old, new: newTag }) => {
  html = html.replace(old, newTag);
});

// Write back to file
fs.writeFileSync(htmlPath, html);

console.log(`Replaced ${replacements.length} image tags with repeating pattern`);
console.log(`Image usage:`);
images.forEach((img, index) => {
  const count = Math.floor(replacements.length / images.length) + (index < replacements.length % images.length ? 1 : 0);
  console.log(`${img}: ${count} times`);
});