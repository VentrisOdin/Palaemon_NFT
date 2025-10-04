const fs = require('fs');
const path = require('path');

console.log('🚀 Generating enhanced Palaemon NFT metadata...');

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

const metadataDir = './metadata';
if (!fs.existsSync(metadataDir)) {
  fs.mkdirSync(metadataDir);
}

function getEnhancedAttributes(filename) {
  const attributes = [];
  
  // Collection type
  if (filename.includes('chart_cpr') || filename.includes('detective') || filename.includes('winchman')) {
    attributes.push({"trait_type": "Collection", "value": "Field Medic Missions"});
  } else if (filename.includes('coin') || filename.includes('future') || filename.includes('computer')) {
    attributes.push({"trait_type": "Collection", "value": "Crypto-Hero Moments"});
  } else if (filename.includes('wildfire') || filename.includes('water') || filename.includes('desert') || filename.includes('mountain')) {
    attributes.push({"trait_type": "Collection", "value": "Global Missions"});
  } else if (filename.includes('hero') || filename.includes('king') || filename.includes('triumph') || filename.includes('abstract')) {
    attributes.push({"trait_type": "Collection", "value": "Legendary Editions"});
  } else {
    attributes.push({"trait_type": "Collection", "value": "Core Rescue Team"});
  }
  
  // Scene/Mission type
  const sceneMap = {
    "water": "Maritime Rescue",
    "boat": "Flood Response", 
    "heli": "Helicopter Drop",
    "rubble": "Earthquake Response",
    "snow": "Alpine Rescue",
    "coin_forge": "Coin Forge",
    "computer": "Digital Command",
    "guardian": "Crypto Guardian",
    "wildfire": "Wildfire Frontline",
    "desert": "Desert Relief",
    "mountain": "Mountain Airlift",
    "hero": "Hero Portrait",
    "king": "Founder's Legacy",
    "triumph": "Victory Moment"
  };
  
  for (const [key, scene] of Object.entries(sceneMap)) {
    if (filename.includes(key)) {
      attributes.push({"trait_type": "Scene", "value": scene});
      break;
    }
  }
  
  // Environment
  if (filename.includes('fire') || filename.includes('volcano')) {
    attributes.push({"trait_type": "Environment", "value": "Fire/Heat"});
  } else if (filename.includes('water') || filename.includes('boat')) {
    attributes.push({"trait_type": "Environment", "value": "Aquatic"});
  } else if (filename.includes('snow') || filename.includes('mountain')) {
    attributes.push({"trait_type": "Environment", "value": "Alpine"});
  } else if (filename.includes('desert')) {
    attributes.push({"trait_type": "Environment", "value": "Desert"});
  } else if (filename.includes('future') || filename.includes('computer')) {
    attributes.push({"trait_type": "Environment", "value": "Digital"});
  }
  
  // Special equipment
  if (filename.includes('heli')) {
    attributes.push({"trait_type": "Vehicle", "value": "Helicopter"});
  } else if (filename.includes('boat')) {
    attributes.push({"trait_type": "Vehicle", "value": "Rescue Boat"});
  }
  
  // Gear
  if (filename.includes('fireaxe')) {
    attributes.push({"trait_type": "Gear", "value": "Fire Axe"});
  } else if (filename.includes('cape')) {
    attributes.push({"trait_type": "Gear", "value": "Hero Cape"});
  } else if (filename.includes('bags')) {
    attributes.push({"trait_type": "Gear", "value": "Supply Bags"});
  }
  
  // Always include stethoscope (medical theme)
  attributes.push({"trait_type": "Stethoscope", "value": "Yes"});
  
  // Branding
  if (filename.includes('coin') || filename.includes('airdrop')) {
    attributes.push({"trait_type": "Branding", "value": "$PAL Coin"});
  } else if (filename.includes('logo') || filename.includes('hero')) {
    attributes.push({"trait_type": "Branding", "value": "Palaemon Logo"});
  } else {
    attributes.push({"trait_type": "Branding", "value": "Both"});
  }
  
  // Rarity
  if (filename.includes('hero') || filename.includes('king') || filename.includes('triumph') || filename.includes('abstract') || filename.includes('0be35c2f')) {
    attributes.push({"trait_type": "Rarity Hint", "value": "Legendary"});
  } else if (filename.includes('coin') || filename.includes('future') || filename.includes('guardian')) {
    attributes.push({"trait_type": "Rarity Hint", "value": "Rare"});
  } else {
    attributes.push({"trait_type": "Rarity Hint", "value": "Core"});
  }
  
  return attributes;
}

function getEnhancedName(filename, tokenId) {
  const nameMap = {
    "0be35c2f-6289-4a7c-aa76-bc030c8feb25.png": "Palaemon Genesis #",
    "pal_abstract_logo.png": "Palaemon Abstract #",
    "pal_airdrop.png": "Palaemon Airdrop #",
    "pal_ba_bags.png": "Palaemon Supply Drop #",
    "pal_boat.png": "Palaemon Mariner #",
    "pal_cape.png": "Palaemon Cape #",
    "pal_chart_cpr.jpeg": "Palaemon Medic #",
    "pal_chill.png": "Palaemon Chill #",
    "pal_coin_forge.png": "Palaemon Forge Master #",
    "pal_coin.jpeg": "Palaemon Coin Bearer #",
    "pal_computer.png": "Palaemon Digital Command #",
    "pal_desert.png": "Palaemon Desert Relief #",
    "pal_detective.jpeg": "Palaemon Detective #",
    "pal_discord_promo.png": "Palaemon Discord #",
    "pal_fire.png": "Palaemon Fire Fighter #",
    "pal_fireaxe.png": "Palaemon Axe Warrior #",
    "pal_future_2.png": "Palaemon Future Vision #",
    "pal_future.png": "Palaemon Time Walker #",
    "pal_guardian.png": "Palaemon Guardian #",
    "pal_heli.png": "Palaemon Air Rescue #",
    "pal_hero_logo.png": "Palaemon Hero #",
    "pal_king.png": "Palaemon King #",
    "pal_mountain.png": "Palaemon Mountain Rescue #",
    "pal_planet.png": "Palaemon Cosmic #",
    "pal_rubble.png": "Palaemon Earthquake Response #",
    "pal_snow.png": "Palaemon Snow Rescue #",
    "pal_superhero.png": "Palaemon Super Hero #",
    "pal_triumph.png": "Palaemon Triumph #",
    "pal_volcano.png": "Palaemon Volcano Warrior #",
    "pal_water.png": "Palaemon Water Guardian #",
    "pal_wildfire.png": "Palaemon Wildfire Hero #",
    "pal_winchman.png": "Palaemon Winch Operator #",
    "pal_yellow.png": "Palaemon Golden #"
  };
  
  return `${nameMap[filename] || "Palaemon Warrior #"}${tokenId}`;
}

function getEnhancedDescription(filename) {
  const descriptions = {
    "0be35c2f-6289-4a7c-aa76-bc030c8feb25.png": "The genesis NFT of the Palaemon collection, representing the birth of maritime rescue heroism in the digital age.",
    "pal_hero_logo.png": "The legendary Palaemon hero stands proud, embodying courage and maritime protection for all who venture into dangerous waters.",
    "pal_king.png": "A regal Palaemon ruler commanding the seas with wisdom, strength, and an unwavering commitment to rescue operations.",
    "pal_detective.jpeg": "Master investigator of the Palaemon order, solving maritime mysteries and uncovering threats to ocean safety.",
    "pal_guardian.png": "Eternal protector of sailors and those lost at sea, wielding ancient powers to shield the innocent from harm.",
    "pal_coin_forge.png": "Blacksmith hero forges the sacred $PAL coins in the fires of determination, each strike creating value and hope.",
    "pal_wildfire.png": "On the wildfire frontlines, this brave Palaemon fights flames with unwavering courage and advanced rescue technology.",
    "pal_water.png": "Master of aquatic rescues, this Palaemon commands the waves and protects all maritime travelers.",
    "pal_winchman.png": "Elite rescue specialist operating winch systems for high-altitude and maritime operations across all terrains."
  };
  
  return descriptions[filename] || "A dedicated member of the Palaemon rescue force, trained in advanced life-saving techniques and equipped with cutting-edge rescue technology.";
}

// Generate enhanced metadata
imageFiles.forEach((filename, index) => {
  const metadata = {
    "name": getEnhancedName(filename, index),
    "description": getEnhancedDescription(filename),
    "image": `ipfs://YOUR_CID/${filename}`,
    "external_url": `https://palaemon.example/nft/${index}`,
    "attributes": getEnhancedAttributes(filename),
    "edition": index + 1
  };
  
  fs.writeFileSync(
    path.join(metadataDir, `${index}.json`),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log(`✅ Created ${index}.json - ${getEnhancedName(filename, index)}`);
});

// Enhanced collection metadata
const collectionMetadata = {
  "name": "Palaemon NFT Collection",
  "description": "A collection of 32 unique Palaemon NFTs inspired by the Greek deity of rescue and maritime protection. Each NFT represents heroic rescue missions, crypto innovations, and legendary moments in the Palaemon universe.",
  "image": "ipfs://YOUR_CID/pal_hero_logo.png",
  "external_link": "https://palaemon.example",
  "seller_fee_basis_points": 500,
  "fee_recipient": "YOUR_WALLET_ADDRESS_HERE"
};

fs.writeFileSync(
  path.join(metadataDir, 'collection.json'),
  JSON.stringify(collectionMetadata, null, 2)
);

console.log(`\n🎉 Enhanced metadata complete! Generated ${imageFiles.length} NFT files + collection.json`);
console.log('\n📋 Features added:');
console.log('- Rich attribute system');
console.log('- Collection categories'); 
console.log('- Scene descriptions');
console.log('- Equipment & gear traits');
console.log('- Rarity indicators');
console.log('- External URLs');
console.log('- Edition numbers');