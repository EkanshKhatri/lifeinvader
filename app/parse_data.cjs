const fs = require('fs');
const path = require('path');

const carsCsvPath = path.join(__dirname, '..', 'cars.csv');
const clothsCsvPath = path.join(__dirname, '..', 'cloths.csv');
const outputPath = path.join(__dirname, 'src', 'data.js');

function parseCars() {
    const content = fs.readFileSync(carsCsvPath, 'utf-8');
    const lines = content.split('\n');
    const cars = new Set();
    
    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const matches = line.match(/"""([^"]+)"""/g);
        if (matches) {
            matches.forEach(m => {
                let name = m.replace(/"""/g, '');
                if (name) cars.add(name);
            });
        }
    }
    // Add extra bikes provided by user
    const extraBikes = [
        "Akuma", "Bagger", "Carbon RS", "Daemon", "Enduro", "Faggio", "Gargoyle", 
        "Hakuchou", "Innovation", "Lectro", "Manchez", "Nemesis", "PCJ-600", "Rat Bike", 
        "Sanchez", "Thrust", "Vader", "Whippet Race Bike", "Zombie Chopper", "Apocalypse Deathbike", 
        "Bati 801", "Chimera", "Defiler", "Esskey", "FCR 1000", "Hakuchou Drag", "Nightblade", 
        "Ruffian", "Sanctus", "Tri-Cycles Race Bike", "Vindicator", "Wolfsbane", "Avarus", 
        "Bati 801RR", "Cliffhanger", "Diabolus", "FCR 1000 Custom", "Hexer", "Shotaro", "Vortex", 
        "BF-400", "Cruiser", "Diabolus Custom", "Future Shock Deathbike", "Sovereign", "Blazer", 
        "Double-T", "Street Blazer", "Blazer Lifeguard", "Stryder", "BMX"
    ];
    extraBikes.forEach(bike => cars.add(bike));

    return Array.from(cars).sort();
}

function parseCloths() {
    const content = fs.readFileSync(clothsCsvPath, 'utf-8');
    const lines = content.split('\n');
    const cloths = new Set();
    
    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Split by comma
        const parts = line.split(',');
        parts.forEach(part => {
            const name = part.trim();
            if (name && name !== '""' && name !== '"') {
                cloths.add(name.replace(/"/g, ''));
            }
        });
    }
    
    return Array.from(cloths).sort();
}

const cars = parseCars();
const cloths = parseCloths();

const fileContent = `
export const carsList = ${JSON.stringify(cars, null, 2)};
export const clothsList = ${JSON.stringify(cloths, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated src/data.js with ' + cars.length + ' cars and ' + cloths.length + ' cloths.');
