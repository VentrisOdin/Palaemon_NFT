const fs = require('fs');
const path = require('path');

console.log('🚀 Generating complete Palaemon NFT metadata...');

const imageFiles = [
  "0be35c2f-6289-4a7c-aa76-bc030c8feb25.png",
  "pal_abstract_logo.png", 
  "pal_airdrop.png",
  "pal_ba_bags.png",
  "pal_boat.png",
  "pal_cape.png", 
  "pal_chart_cpr.jpeg",
  "pal_chill.png",
  "pal_coin_forge.png",
  "pal_coin.jpeg",
  "pal_computer.png",
  "pal_desert.png",
  "pal_detective.jpeg", 
  "pal_discord_promo.png",
  "pal_fire.png",
  "pal_fireaxe.png",
  "pal_future_2.png",
  "pal_future.png",
  "pal_guardian.png",
  "pal_heli.png",
  "pal_hero_logo.png",
  "pal_king.png",
  "pal_mountain.png",
  "pal_planet.png",
  "pal_rubble.png", 
  "pal_snow.png",
  "pal_superhero.png",
  "pal_triumph.png",
  "pal_volcano.png",
  "pal_water.png",
  "pal_wildfire.png",
  "pal_winchman.png",
  "pal_yellow.png"
];

// Create metadata directory if it doesn't exist
const metadataDir = './metadata';
if (!fs.existsSync(metadataDir)) {
  fs.mkdirSync(metadataDir);
}

function generateTraits(filename) {
  const traits = [];
  
  // Element
  if (filename.includes('fire') || filename.includes('volcano') || filename.includes('wildfire')) {
    traits.push({ "trait_type": "Element", "value": "Fire" });
  } else if (filename.includes('water') || filename.includes('boat')) {
    traits.push({ "trait_type": "Element", "value": "Water" });
  } else if (filename.includes('desert') || filename.includes('mountain') || filename.includes('rubble')) {
    traits.push({ "trait_type": "Element", "value": "Earth" });
  } else if (filename.includes('snow')) {
    traits.push({ "trait_type": "Element", "value": "Ice" });
  } else if (filename.includes('planet') || filename.includes('future')) {
    traits.push({ "trait_type": "Element", "value": "Cosmic" });
  } else {
    traits.push({ "trait_type": "Element", "value": "Neutral" });
  }
  
  // Role
  if (filename.includes('hero') || filename.includes('superhero')) {
    traits.push({ "trait_type": "Role", "value": "Hero" });
  } else if (filename.includes('king')) {
    traits.push({ "trait_type": "Role", "value": "Royalty" });
  } else if (filename.includes('detective')) {
    traits.push({ "trait_type": "Role", "value": "Detective" });
  } else if (filename.includes('guardian')) {
    traits.push({ "trait_type": "Role", "value": "Guardian" });
  } else if (filename.includes('winchman')) {
    traits.push({ "trait_type": "Role", "value": "Rescue Worker" });
  } else {
    traits.push({ "trait_type": "Role", "value": "Warrior" });
  }
  
  // Rarity
  if (filename.includes('logo') || filename.includes('abstract') || filename.includes('0be35c2f')) {
    traits.push({ "trait_type": "Rarity", "value": "Legendary" });
  } else if (filename.includes('triumph') || filename.includes('king') || filename.includes('superhero')) {
    traits.push({ "trait_type": "Rarity", "value": "Epic" });
  } else if (filename.includes('hero') || filename.includes('guardian') || filename.includes('detective')) {
    traits.push({ "trait_type": "Rarity", "value": "Rare" });
  } else {
    traits.push({ "trait_type": "Rarity", "value": "Common" });
  }
  
  return traits;
}

function generateName(filename, tokenId) {
  const nameMap = {
    "0be35c2f-6289-4a7c-aa76-bc030c8feb25.png": "Palaemon Genesis",
    "pal_abstract_logo.png": "Palaemon Abstract",
    "pal_airdrop.png": "Palaemon Airdrop",
    "pal_ba_bags.png": "Palaemon Bags",
    "pal_boat.png": "Palaemon Mariner",
    "pal_cape.png": "Palaemon Cape",
    "pal_chart_cpr.jpeg": "Palaemon Medic",
    "pal_chill.png": "Palaemon Chill",
    "pal_coin_forge.png": "Palaemon Forge",
    "pal_coin.jpeg": "Palaemon Coin",
    "pal_computer.png": "Palaemon Digital",
    "pal_desert.png": "Palaemon Desert",
    "pal_detective.jpeg": "Palaemon Detective",
    "pal_discord_promo.png": "Palaemon Discord",
    "pal_fire.png": "Palaemon Fire",
    "pal_fireaxe.png": "Palaemon Firefighter",
    "pal_future_2.png": "Palaemon Future II",
    "pal_future.png": "Palaemon Future",
    "pal_guardian.png": "Palaemon Guardian",
    "pal_heli.png": "Palaemon Pilot",
    "pal_hero_logo.png": "Palaemon Hero",
    "pal_king.png": "Palaemon King",
    "pal_mountain.png": "Palaemon Mountain",
    "pal_planet.png": "Palaemon Cosmic",
    "pal_rubble.png": "Palaemon Rescue",
    "pal_snow.png": "Palaemon Snow",
    "pal_superhero.png": "Palaemon Super",
    "pal_triumph.png": "Palaemon Triumph",
    "pal_volcano.png": "Palaemon Volcano",
    "pal_water.png": "Palaemon Water",
    "pal_wildfire.png": "Palaemon Wildfire",
    "pal_winchman.png": "Palaemon Winchman",
    "pal_yellow.png": "Palaemon Golden"
  };
  
  return `${nameMap[filename] || "Palaemon Warrior"} #${tokenId}`;
}

function generateDescription(filename) {
  const descriptions = {
    "0be35c2f-6289-4a7c-aa76-bc030c8feb25.png": "The genesis of the Palaemon collection, representing the origin of maritime rescue heroism.",
    "pal_hero_logo.png": "The legendary Palaemon hero, symbol of courage and maritime protection.",
    "pal_king.png": "A regal Palaemon ruler, commanding the seas with wisdom and strength.",
    "pal_detective.jpeg": "Master investigator of the Palaemon order, solving mysteries of the deep.",
    "pal_guardian.png": "Eternal protector of sailors and those lost at sea.",
    "pal_superhero.png": "Enhanced Palaemon with extraordinary rescue capabilities.",
    "pal_winchman.png": "Elite rescue specialist, master of high-altitude and maritime operations."
  };
  
  return descriptions[filename] || "A brave member of the Palaemon order, dedicated to rescue and protection across all realms.";
}

// Generate metadata for each NFT
console.log(`Generating metadata for ${imageFiles.length} NFTs...`);

imageFiles.forEach((filename, index) => {
  const metadata = {
    "name": generateName(filename, index),
    "description": generateDescription(filename),
    "image": `ipfs://YOUR_IMAGES_CID/${filename}`,
    "attributes": generateTraits(filename),
    "tokenId": index
  };
  
  fs.writeFileSync(
    path.join(metadataDir, `${index}.json`),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log(`✅ Created ${index}.json - ${generateName(filename, index)}`);
});

// Generate collection metadata
const collectionMetadata = {
  "name": "Palaemon NFT Collection",
  "description": "A collection of 32 unique Palaemon NFTs inspired by the Greek deity of rescue and maritime protection. Each NFT represents different aspects of heroism, rescue operations, and elemental powers.",
  "image": "ipfs://YOUR_IMAGES_CID/pal_hero_logo.png",
  "external_link": "https://your-website.com",
  "seller_fee_basis_points": 500,
  "fee_recipient": "YOUR_WALLET_ADDRESS_HERE"
};

fs.writeFileSync(
  path.join(metadataDir, 'collection.json'),
  JSON.stringify(collectionMetadata, null, 2)
);

console.log(`\n🎉 Complete! Generated ${imageFiles.length} NFT metadata files + collection.json`);
console.log('\n📋 Next steps:');
console.log('1. Upload your images to IPFS');
console.log('2. Replace "YOUR_IMAGES_CID" with actual IPFS hash');  
console.log('3. Upload metadata to IPFS');
console.log('4. Update BASE_URI in .env');
console.log('5. Deploy contract!');