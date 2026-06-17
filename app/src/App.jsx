import { useState, useEffect } from 'react';
import { carsList, allLocations, officialLocations, unofficialLocations, familyBusinesses, generalBusinesses, sharesBusinesses, workProfessions, constructionRoles, otherItemsList, partyLocations, otherServices, clothingItems } from './data';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [category, setCategory] = useState('');
  const [manualCategory, setManualCategory] = useState('Auto');
  const [copied, setCopied] = useState(false);
  
  const [carSearch, setCarSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Form Builder State
  const [formAction, setFormAction] = useState('Buy');
  const [formCar1, setFormCar1] = useState('');
  const [formCar2, setFormCar2] = useState('');
  const [formMoney, setFormMoney] = useState('');
  const [formMoneyUnit, setFormMoneyUnit] = useState('None');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [activeCarSearch, setActiveCarSearch] = useState(1);

  // Checklist State
  const [configLevel, setConfigLevel] = useState('none');
  const [hasVisuals, setHasVisuals] = useState(false);
  const [hasWheels, setHasWheels] = useState(false);
  const [wheelType, setWheelType] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [hasTurbo, setHasTurbo] = useState(false);
  const [hasDrift, setHasDrift] = useState(false);

  // Real Estate State
  const [propertyType, setPropertyType] = useState('House');
  const [apartmentComplex, setApartmentComplex] = useState('None');
  const [formHouseNum, setFormHouseNum] = useState('');
  const [houseQuantity, setHouseQuantity] = useState(1);
  const [formLocation, setFormLocation] = useState('');
  const [locPrefix, setLocPrefix] = useState('in');
  const [locSearch, setLocSearch] = useState('');
  const [showLocDropdown, setShowLocDropdown] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [garageSpaces, setGarageSpaces] = useState('None');
  const [warehouses, setWarehouses] = useState('None');
  const [customInterior, setCustomInterior] = useState(false);
  const [hasHelipad, setHasHelipad] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasTennis, setHasTennis] = useState(false);
  const [driveway, setDriveway] = useState('None');
  const [spaciousBackyard, setSpaciousBackyard] = useState(false);
  const [views, setViews] = useState('None');

  // Business State
  const [businessCategory, setBusinessCategory] = useState('General');
  const [selectedBusiness, setSelectedBusiness] = useState('None');
  const [formBusNum, setFormBusNum] = useState('');
  const [businessModifier, setBusinessModifier] = useState('Standard'); // Standard, Shares, Control
  const [cropType, setCropType] = useState('');
  const [plantationBeds, setPlantationBeds] = useState('');
  const [sharesQuantity, setSharesQuantity] = useState('');

  // Work State
  const [workAction, setWorkAction] = useState('Hiring'); // Hiring, Looking, Renting, Renting out
  const [workProfession, setWorkProfession] = useState('None');
  const [workExperience, setWorkExperience] = useState('');
  const [constructionSiteNum, setConstructionSiteNum] = useState('None');
  const [truckerVanPercent, setTruckerVanPercent] = useState('15');

  const [workIsPlural, setWorkIsPlural] = useState(false);

  // Dating State
  const [datingType, setDatingType] = useState('Family');

  // Other State
  const [otherType, setOtherType] = useState('Items'); // Items, Services, Parties, Games
  const [otherItem1, setOtherItem1] = useState('');
  const [otherItem2, setOtherItem2] = useState('');
  const [otherItem3, setOtherItem3] = useState('');
  const [otherBeachMarket, setOtherBeachMarket] = useState(false);
  const [otherBeachShop, setOtherBeachShop] = useState('');
  const [otherBulk, setOtherBulk] = useState(false);
  const [otherServiceType, setOtherServiceType] = useState('Lawyer');
  const [otherBusinessOwner, setOtherBusinessOwner] = useState('');
  const [otherEventType, setOtherEventType] = useState('Party');
  const [otherEventLocation, setOtherEventLocation] = useState('');
  const [otherPartyHouseNum, setOtherPartyHouseNum] = useState('');
  const [otherWeddingNames, setOtherWeddingNames] = useState('');
  const [otherWeddingTime, setOtherWeddingTime] = useState('');
  const [otherCarBrand, setOtherCarBrand] = useState('');
  const [otherGameType, setOtherGameType] = useState('Dice');
  const [otherGameBet, setOtherGameBet] = useState('');
  const [otherPrice1, setOtherPrice1] = useState('');
  const [otherPrice2, setOtherPrice2] = useState('');
  const [otherPrice3, setOtherPrice3] = useState('');
  const [otherQty1, setOtherQty1] = useState('');
  const [otherQty2, setOtherQty2] = useState('');
  const [otherQty3, setOtherQty3] = useState('');
  const [otherEach, setOtherEach] = useState(false);
  const [otherRespectively, setOtherRespectively] = useState(false);
  const [otherPrice1Unit, setOtherPrice1Unit] = useState('None');
  const [otherPrice2Unit, setOtherPrice2Unit] = useState('None');
  const [otherPrice3Unit, setOtherPrice3Unit] = useState('None');
  const [otherItem1Quality, setOtherItem1Quality] = useState('');
  const [otherItem2Quality, setOtherItem2Quality] = useState('');
  const [otherItem3Quality, setOtherItem3Quality] = useState('');
  const [otherItem1Type, setOtherItem1Type] = useState('');
  const [otherItem2Type, setOtherItem2Type] = useState('');
  const [otherItem3Type, setOtherItem3Type] = useState('');
  const [otherItem1Color, setOtherItem1Color] = useState('');
  const [otherItem2Color, setOtherItem2Color] = useState('');
  const [otherItem3Color, setOtherItem3Color] = useState('');

  const categories = ['Auto', 'Real Estate', 'Business', 'Work', 'Dating', 'Other'];

  const filteredCars = carSearch.length > 0 
    ? carsList.filter(car => car.toLowerCase().includes(carSearch.toLowerCase())).slice(0, 50)
    : [];

  const handleCarSelect = (car) => {
    if (activeCarSearch === 1) setFormCar1(car);
    else setFormCar2(car);
    setCarSearch('');
    setShowDropdown(false);
  };

  const filteredLocs = locSearch.length > 0 
    ? allLocations.filter(loc => loc.toLowerCase().includes(locSearch.toLowerCase())).slice(0, 50)
    : [];

  const handleLocSelect = (loc) => {
    setFormLocation(loc);
    setLocSearch('');
    setShowLocDropdown(false);
  };

  const generateRealEstateAd = () => {
    let ad = '';
    let priceStr = 'Negotiable';
    
    if (!isNegotiable && formMoney) {
      if (formMoneyUnit === 'Million') {
        let val = parseFloat(formMoney.replace(/,/g, '.'));
        if (!isNaN(val) && val > 300) {
          priceStr = 'Negotiable';
        } else {
          priceStr = '$' + formMoney + ' Million';
        }
      } else {
        let cleanNum = parseInt(formMoney.replace(/\D/g, ''), 10);
        if (!isNaN(cleanNum)) {
          if (cleanNum > 300000000) {
            priceStr = 'Negotiable';
          } else if (cleanNum >= 1000000) {
            let millionVal = cleanNum / 1000000;
            priceStr = '$' + millionVal + ' Million';
          } else {
            priceStr = '$' + cleanNum.toLocaleString('de-DE');
          }
        } else {
          priceStr = '$' + formMoney;
        }
      }
    }

    const features = [];
    if (propertyType === 'House') {
      if (hasGarden) features.push('garden');
      if (garageSpaces !== 'None') features.push(garageSpaces);
      if (warehouses !== 'None') features.push(warehouses);
      if (customInterior) features.push('custom interior');
      if (hasInsurance) features.push('insurance');
      if (hasHelipad) features.push('helipad');
      if (hasPool) features.push('swimming pool');
      if (hasTennis) features.push('tennis court');
      if (driveway !== 'None') features.push(driveway + ' driveway');
      if (spaciousBackyard) features.push('spacious backyard');
      if (views !== 'None') features.push(views + ' views');
    } else {
      if (garageSpaces !== 'None') features.push(garageSpaces);
      if (warehouses !== 'None') features.push(warehouses);
      if (customInterior) features.push('custom interior');
      if (views !== 'None') features.push(views + ' views');
    }

    let featuresStr = '';
    if (features.length > 0) {
      const firstFeature = features[0];
      const firstTakesA = 
        firstFeature === 'garden' || 
        firstFeature === 'helipad' || 
        firstFeature === 'swimming pool' || 
        firstFeature === 'tennis court' || 
        firstFeature.includes('driveway') || 
        firstFeature === 'spacious backyard';

      let joinStr = '';
      if (features.length === 1) {
        joinStr = features[0];
      } else if (features.length === 2) {
        joinStr = `${features[0]} and ${features[1]}`;
      } else {
        const last = features.pop();
        joinStr = `${features.join(', ')} and ${last}`;
      }
      
      featuresStr = firstTakesA ? ` with a ${joinStr}` : ` with ${joinStr}`;
    }

    let locStr = '';
    if (propertyType === 'Apartment' && apartmentComplex !== 'None') {
      if (apartmentComplex === 'beach market') {
        locStr = ' near the beach market';
      } else {
        locStr = ` in ${apartmentComplex}`;
      }
    } else if (propertyType === 'House' && formLocation) {
      if (officialLocations.includes(formLocation)) {
        locStr = ` ${locPrefix} ${formLocation}`;
      } else {
        locStr = ` ${locPrefix} the ${formLocation}`;
      }
    }

    let objStr = '';
    if (propertyType === 'House') {
      if (houseQuantity > 1) {
        objStr = `${houseQuantity} houses`;
      } else {
        objStr = formHouseNum ? `house №${formHouseNum}` : 'a house';
      }
    } else if (propertyType === 'Apartment') {
      if (houseQuantity > 1) {
        objStr = `${houseQuantity} apartments`;
      } else {
        objStr = formHouseNum ? `apartment №${formHouseNum}` : 'an apartment';
      }
    } else if (propertyType === 'Penthouse') {
      if (houseQuantity > 1) {
        objStr = `${houseQuantity} Casino penthouses`;
      } else {
        objStr = formHouseNum ? `Casino penthouse №${formHouseNum}` : 'Casino penthouse';
      }
    }

    if (formAction === 'Buy') {
      ad = `Buying ${objStr}${featuresStr}${locStr}. Budget: ${priceStr}.`;
    } else if (formAction === 'Sell') {
      ad = `Selling ${objStr}${featuresStr}${locStr}. Price: ${priceStr}.`;
    } else if (formAction === 'Rent') {
      if (formHouseNum) {
        ad = `Renting out ${objStr}${featuresStr}${locStr}. Rent: ${priceStr}${priceStr !== 'Negotiable' ? ' per week' : ''}.`;
      } else {
        ad = `Renting ${objStr}${featuresStr}${locStr}. Budget: ${priceStr}${priceStr !== 'Negotiable' ? ' per week' : ''}.`;
      }
    } else {
      ad = `Selling ${objStr}${featuresStr}${locStr}. Price: ${priceStr}.`;
    }
    return ad.replace('g.s.. ', 'g.s. ').replace('w.h.. ', 'w.h. ');
  };

  const generateAutoAd = () => {
    let ad = '';
    let priceStr = 'Negotiable';
    
    if (!isNegotiable && formMoney) {
      if (formMoneyUnit === 'Million') {
        let val = parseFloat(formMoney.replace(/,/g, '.'));
        if (!isNaN(val) && val > 300) {
          priceStr = 'Negotiable';
        } else {
          priceStr = '$' + formMoney + ' Million';
        }
      } else {
        let cleanNum = parseInt(formMoney.replace(/\D/g, ''), 10);
        if (!isNaN(cleanNum)) {
          if (cleanNum > 300000000) {
            priceStr = 'Negotiable';
          } else if (cleanNum >= 1000000) {
            let millionVal = cleanNum / 1000000;
            priceStr = '$' + millionVal + ' Million';
          } else {
            priceStr = '$' + cleanNum.toLocaleString('de-DE');
          }
        } else {
          priceStr = '$' + formMoney;
        }
      }
    }

    const features = [];
    if (configLevel === 'partial') features.push('partial configuration');
    if (configLevel === 'full') features.push('full configuration');
    if (hasVisuals) features.push('visual upgrades');
    if (hasWheels) features.push(`luminous wheels${wheelType.trim() ? ` of type ${wheelType.trim()}` : ''}`);
    if (hasInsurance) features.push('insurance');
    if (hasTurbo) features.push('turbo kit');
    if (hasDrift) features.push('drift kit');

    let featuresStr = '';
    if (features.length > 0) {
      if (features.length === 1) {
        featuresStr = ` with ${features[0]}`;
      } else if (features.length === 2) {
        featuresStr = ` with ${features[0]} and ${features[1]}`;
      } else {
        const last = features.pop();
        featuresStr = ` with ${features.join(', ')} and ${last}`;
      }
    }

    const car1Str = formCar1 ? `"${formCar1}"` : 'a car';
    const car2Str = formCar2 ? `"${formCar2}"` : 'a car';

    if (formAction === 'Buy') {
      ad = `Buying ${car1Str}${featuresStr}. Budget: ${priceStr}.`;
    } else if (formAction === 'Sell') {
      ad = `Selling ${car1Str}${featuresStr}. Price: ${priceStr}.`;
    } else if (formAction === 'Trade') {
      if (formCar2) {
        ad = `Trading ${car1Str}${featuresStr} for ${car2Str}.`;
      } else {
        ad = `Trading ${car1Str}${featuresStr}.`;
      }
    } else if (formAction === 'SellOrTrade') {
      ad = `Selling or trading ${car1Str}${featuresStr}. Price: ${priceStr}.`;
    }
    return ad;
  };

  const generateBusinessAd = () => {
    let ad = '';
    let priceStr = 'Negotiable';
    if (!isNegotiable) {
      let cleanNum = parseFloat(formMoney.replace(/,/g, '.'));
      let valInMillions = 0;
      if (!isNaN(cleanNum)) {
        if (formMoneyUnit === 'Million') {
          valInMillions = cleanNum;
          priceStr = '$' + cleanNum + ' Million';
        } else {
          if (cleanNum >= 1000000) {
            valInMillions = cleanNum / 1000000;
            priceStr = '$' + valInMillions + ' Million';
          } else {
            valInMillions = cleanNum / 1000000;
            priceStr = '$' + cleanNum.toLocaleString('de-DE');
          }
        }
      }
      
      if (valInMillions > 500) {
        priceStr = 'Negotiable';
      }
    }

    let locStr = '';
    let hideLocation = businessCategory === 'General' && (businessModifier === 'Shares' || businessModifier === 'Control');
    if (formLocation && !hideLocation) {
      if (officialLocations.includes(formLocation)) {
        locStr = ` ${locPrefix} ${formLocation}`;
      } else {
        locStr = ` ${locPrefix} the ${formLocation}`;
      }
    }

    let objStr = '';
    if (businessModifier === 'Shares') {
       let baseName = selectedBusiness !== 'None' ? selectedBusiness : 'business shares';
       objStr = sharesQuantity.trim() ? `${sharesQuantity.trim()} ${baseName}` : baseName;
    } else {
       if (selectedBusiness === 'Plantation') {
          let crop = cropType.trim() ? (cropType.charAt(0).toUpperCase() + cropType.slice(1).toLowerCase() + ' p') : 'P';
          objStr = `${crop}lantation business`;
          if (plantationBeds.trim()) {
            objStr += ` with ${plantationBeds} beds`;
          }
       } else if (selectedBusiness !== 'None') {
          let busName = selectedBusiness === 'Drug lab' ? 'Burger shop' : selectedBusiness;
          
          if (formBusNum && selectedBusiness !== 'Cowshed') {
            objStr = `${busName} №${formBusNum}`;
          } else {
            objStr = `${busName} business`;
          }

          if (businessModifier === 'Control') {
            objStr += ' Control';
          }
       } else {
          if (businessModifier === 'Control') {
            objStr = 'Business Control';
          } else {
            objStr = businessCategory === 'Family' ? 'a family business' : 'a private business';
          }
       }
    }

    if (formAction === 'Buy') {
      ad = `Buying ${objStr}${locStr}. Budget: ${priceStr}.`;
    } else if (formAction === 'Sell') {
      ad = `Selling ${objStr}${locStr}. Price: ${priceStr}.`;
    } else if (formAction === 'Trade') {
      ad = `Trading ${objStr}${locStr}.`;
    } else if (formAction === 'SellOrTrade') {
      ad = `Selling or trading ${objStr}${locStr}. Price: ${priceStr}.`;
    } else {
      ad = `Selling ${objStr}${locStr}. Price: ${priceStr}.`;
    }
    return ad;
  };

  const generateWorkAd = () => {
    let priceStr = 'Negotiable';
    let cleanNum = parseFloat(formMoney.replace(/,/g, '.'));
    if (!isNegotiable && !isNaN(cleanNum)) {
      if (formMoneyUnit === 'Million') {
        priceStr = '$' + cleanNum + ' Million';
      } else {
        if (cleanNum >= 1000000) {
          priceStr = '$' + (cleanNum / 1000000) + ' Million';
        } else {
          priceStr = '$' + cleanNum.toLocaleString('de-DE');
        }
      }
    }

    let expStr = (workExperience && (workProfession === 'Trucker' || constructionRoles.includes(workProfession))) ? ` with ${workExperience} years of experience` : '';

    let prof = workProfession === 'None' ? '' : workProfession;
    let isVowel = prof && /^[AEIOU]/i.test(prof);
    let article = isVowel ? 'an' : 'a';
    


    let isConstruction = constructionRoles.includes(prof);
    if (prof === 'Construction site' && workAction === 'Hiring') prof = ''; 

    let locStr = '';
    let currentLocPrefix = prof === 'Firefighter' ? 'at' : locPrefix;
    const noLocationProfs = ['Trucker', 'Lawyer', 'Personal driver', 'Assistant', 'Solar panel plantation worker'];

    if (formLocation && !noLocationProfs.includes(prof) && !isConstruction) {
      if (officialLocations.includes(formLocation)) {
        locStr = ` ${currentLocPrefix} ${formLocation}`;
      } else {
        locStr = ` ${currentLocPrefix} the ${formLocation}`;
      }
    }

    if (workAction === 'Looking') {
      if (isConstruction) {
        let siteStr = constructionSiteNum !== 'None' ? ` at construction site №${constructionSiteNum}` : ` at the construction site`;
        if (prof === 'Construction site') {
           return `Looking for a job${siteStr}.`;
        } else if (prof === '') {
           return `Looking for a job.`;
        } else {
           return `Looking to work as a ${prof.toLowerCase()}${siteStr}.`;
        }
      }
      
      if (prof === '') {
         return `Looking for a job.`;
      } else if (prof === 'Solar panel plantation worker') {
         return `Looking for solar panel plantation work.`;
      } else if (prof === 'Professional dancer') {
         return `Looking to work as a professional dancer.`;
      } else {
         let p = prof === 'DJ' ? 'DJ' : prof.charAt(0).toUpperCase() + prof.slice(1).toLowerCase();
         return `${p}${expStr} looking for work.`;
      }
    }

    let targetStr = '';
    let pLow = prof === 'DJ' ? 'DJ' : prof.toLowerCase();

    let pluralMap = {
      'Trucker': 'truckers',
      'Lawyer': 'lawyers',
      'DJ': 'DJs',
      'Photographer': 'photographers',
      'Bodyguard': 'bodyguards',
      'Professional dancer': 'professional dancers',
      'Personal driver': 'personal drivers',
      'Assistant': 'assistants',
      'Professional singer': 'professional singers',
      'Locksmith': 'locksmiths',
      'Electrician': 'electricians',
      'Gardener': 'gardeners',
      'Surveyor': 'surveyors',
      'Driver': 'drivers'
    };
    let pluralWord = pluralMap[prof] || prof.toLowerCase() + 's';

    if (prof === 'Firefighter') {
       targetStr = `firefighters${locStr}`;
    } else if (prof === 'Solar panel plantation worker') {
       targetStr = `workers for solar panel plantations${locStr}`;
    } else if (isConstruction) {
       if (prof === '') {
           targetStr = `workers at construction site`;
           if (constructionSiteNum !== 'None') targetStr += ` №${constructionSiteNum}`;
           targetStr += locStr;
       } else {
          if (workIsPlural && !constructionRoles.includes(workProfession) && !expStr) {
             targetStr = `${pluralWord} at construction site`;
          } else {
             targetStr = `${article} ${pLow}${expStr} at construction site`;
          }
          if (constructionSiteNum !== 'None') targetStr += ` №${constructionSiteNum}`;
          targetStr += locStr;
       }
    } else {
       if (prof === '') {
         targetStr = `workers${locStr}`; 
       } else {
         if (workIsPlural && !expStr) {
           targetStr = `${pluralWord}${locStr}`;
         } else {
           targetStr = `${article} ${pLow}${expStr}${locStr}`;
         }
       }
    }

    let finalStr = `Hiring ${targetStr}.`;
    
       if (prof === '' && isConstruction && priceStr === 'Negotiable' && !formMoney.trim()) {
          return finalStr + ` Salary: Negotiable.`;
       }
       return finalStr + ` Salary: ${priceStr}.`;
  };

  const generateOtherAd = () => {
    if (otherType === 'Games') {
      let betStr = 'Negotiable.';
      if (otherGameBet.trim()) {
        const val = otherGameBet.trim().toLowerCase();
        if (val === 'negotiable' || val === 'neg') betStr = 'Negotiable.';
        else {
           const num = parseFloat(val.replace(/[^0-9]/g, ''));
           if (num > 10000000) betStr = 'Negotiable.';
           else betStr = '$' + (num.toLocaleString('de-DE')) + '.';
        }
      }
      return `Looking to play ${otherGameType.toLowerCase()}. Bet: ${betStr}`;
    }

    if (otherType === 'Services') {
      if (otherServiceType === 'Business owner') {
         if (!otherBusinessOwner) return 'Looking for a Business owner.';
         return `Looking for a ${otherBusinessOwner} owner.`;
      }
      if (otherServiceType === 'Alliance') return `Looking for an alliance.`;
      return `Looking for a ${otherServiceType === 'DJ' ? 'DJ' : otherServiceType.toLowerCase()}.`;
    }

    if (otherType === 'Parties') {
      if (otherEventType === 'Wedding') {
         if (otherWeddingNames && otherWeddingTime) {
             return `Wedding at Church for ${otherWeddingNames.trim()} at ${otherWeddingTime.trim()}.`;
         }
         return `Wedding at Church.`;
      }
      if (otherEventType === 'Car meet') {
         let meetLocStr = '_';
         const loc = otherEventLocation.trim();
         if (loc) {
             if (loc.toLowerCase() === 'house' || loc.toLowerCase() === 'apartment' || loc.toLowerCase() === 'houses/apartment') {
                 const type = loc.toLowerCase() === 'apartment' ? 'apartment' : 'house';
                 meetLocStr = type;
                 if (otherPartyHouseNum.trim()) meetLocStr += ` №${otherPartyHouseNum.trim()}`;
             } else if (loc === 'The beach' || loc === 'The yacht') {
                 meetLocStr = loc.toLowerCase();
             } else {
                 meetLocStr = loc;
             }
         }
         if (otherCarBrand) {
             return `${otherCarBrand} exclusive car meet at ${meetLocStr}.`;
         }
         return `Car meet at ${meetLocStr}.`;
      }
      const loc = otherEventLocation.trim();
      let locStr = '';
      if (loc) {
          if (loc.toLowerCase() === 'house' || loc.toLowerCase() === 'apartment' || loc.toLowerCase() === 'houses/apartment') {
              const type = loc.toLowerCase() === 'apartment' ? 'apartment' : 'house';
              locStr = ` at ${type}`;
              if (otherPartyHouseNum.trim()) locStr += ` №${otherPartyHouseNum.trim()}`;
          } else if (loc === 'The beach' || loc === 'The yacht') {
              locStr = ` at ${loc.toLowerCase()}`;
          } else {
              locStr = ` at ${loc}`;
          }
      }
      if (!locStr) {
          return `Looking for a ${otherEventType === 'Pool party' ? 'pool party' : 'party'}.`;
      }
      return `${otherEventType === 'Pool party' ? 'Pool party' : 'Party'}${locStr}.`;
    }

    if (otherType === 'Items') {
      const formatItem = (qty, name, quality, isBulk, itemType, itemColor) => {
         const q = qty.trim();
         let n = name.trim();
         if (!n) return '';
         if (itemColor && itemColor.trim()) n = `${itemColor.trim().toLowerCase()} ${n}`;
         if (quality) n = `${quality.toLowerCase()} quality ${n}`;

         let plural = n;
         if (n.endsWith('y') && !n.endsWith('ey')) plural = n.slice(0, -1) + 'ies';
         else if (n.endsWith('s')) plural = n;
         else if (n.toLowerCase().includes('fish') || n === 'snow' || n === 'sand' || n === 'timber' || n === 'milk' || n.includes('inventory')) plural = n;
         else plural = n + 's';

         let typeSuffix = '';
         if (itemType) {
            let t = itemType.trim().replace(/extras?/ig, 'type');
            if (t) {
                if (t.toLowerCase().startsWith('type')) typeSuffix = ` of ${t.toLowerCase()}`;
                else typeSuffix = ` of type ${t}`;
            }
         }

         if (isBulk) return `${plural}${typeSuffix}`;

         if (!q) {
             const low = n.toLowerCase();
             if (low === 'battery' || low === 'seed' || low === 'fuel canister' || low === 'premium fuel canister' || low.endsWith(' backpack') || low.includes('container') || low.startsWith('automatic')) {
                 return /^[aeiou]/i.test(n) ? `an ${n}${typeSuffix}` : `a ${n}${typeSuffix}`;
             }
             return `${n}${typeSuffix}`;
         }
         
         if (q === '1') return `1 ${n}${typeSuffix}`;
         return `${q} ${plural}${typeSuffix}`;
      };

      const item1Str = formatItem(otherQty1, otherItem1, otherItem1Quality, otherBulk, otherItem1Type, otherItem1Color);
      const item2Str = formatItem(otherQty2, otherItem2, otherItem2Quality, otherBulk, otherItem2Type, otherItem2Color);
      const item3Str = formatItem(otherQty3, otherItem3, otherItem3Quality, otherBulk, otherItem3Type, otherItem3Color);

      const items = [item1Str, item2Str, item3Str].filter(i => i !== '');
      if (items.length === 0) return '';
      
      let itemsStr = '';
      if (otherBeachMarket) {
          itemsStr = items.length > 1 ? 'various items' : items[0];
      } else {
          if (items.length === 1) itemsStr = items[0];
          else if (items.length === 2) itemsStr = `${items[0]} and ${items[1]}`;
          else itemsStr = `${items[0]}, ${items[1]} and ${items[2]}`;
      }
      
      let marketStr = '';
      if (otherBeachMarket) {
          marketStr = ` at the beach market shop №${otherBeachShop.trim()}`;
      }
      
      let bulkStr = otherBulk ? ' in bulk' : '';
      let priceSuffix = '';
      if (otherEach) priceSuffix += ' each';
      if (otherRespectively) priceSuffix += ' respectively';

      let priceStr = 'Negotiable.';
      
      const p1 = otherPrice1.trim();
      const p2 = otherPrice2.trim();
      const p3 = otherPrice3.trim();
      
      const formatPrice = (p, unit) => {
         if (!p) return null;
         const val = p.toLowerCase();
         if (val === 'negotiable' || val === 'neg') return 'Negotiable';
         
         if (unit === 'Million') {
             const numStr = p.replace(/[^\d.,]/g, '');
             if (numStr) {
                 const parsed = parseFloat(numStr.replace(/,/g, '.'));
                 if (!isNaN(parsed)) return '$' + parsed + ' Million';
             }
         }
         
         if (/^\$?\d+$/.test(p)) {
             const digits = p.replace(/[^0-9]/g, '');
             return '$' + parseInt(digits, 10).toLocaleString('de-DE');
         }
         return p;
      };
      
      const fp1 = formatPrice(p1, otherPrice1Unit);
      const fp2 = formatPrice(p2, otherPrice2Unit);
      const fp3 = formatPrice(p3, otherPrice3Unit);
      
      const validPrices = [];
      if (fp1) validPrices.push(fp1);
      if (fp2 && items.length > 1) validPrices.push(fp2);
      if (fp3 && items.length > 2) validPrices.push(fp3);
      
      if (validPrices.length > 0) {
         if (validPrices.length === 1) {
            priceStr = validPrices[0] + (validPrices[0] === 'Negotiable' ? '' : priceSuffix) + '.';
         } else {
            if (validPrices.every(p => p === 'Negotiable')) {
               priceStr = 'Negotiable' + priceSuffix + '.';
             } else {
                if (validPrices.length === 2) {
                   priceStr = validPrices[0] + ' and ' + validPrices[1] + priceSuffix + '.';
                } else {
                   priceStr = validPrices[0] + ', ' + validPrices[1] + ' and ' + validPrices[2] + priceSuffix + '.';
                }
             }
         }
      }
      
      const label = formAction === 'Buy' ? 'Budget' : 'Price';
      if (otherBeachMarket) {
         if ((fp1 || fp2 || fp3) && priceStr !== 'Negotiable.') {
            return `${formAction === 'Buy' ? 'Buying' : 'Selling'} ${itemsStr}${bulkStr}${marketStr}. Price: ${priceStr}`;
         }
         return `${formAction === 'Buy' ? 'Buying' : 'Selling'} ${itemsStr}${bulkStr} for good prices${marketStr}.`;
      }
      
      return `${formAction === 'Buy' ? 'Buying' : formAction === 'Sell' ? 'Selling' : 'Trading'} ${itemsStr}${bulkStr}${marketStr}. ${label}: ${priceStr}`;
    }
  };

  const generateDatingAd = () => {
    const typeMap = {
      'Family': 'a family',
      'Family Members': 'family members',
      'Date': 'a date',
      'Wife': 'a wife',
      'Husband': 'a husband',
      'Valentine': 'a valentine',
      'Friend': 'a friend',
      'Friends': 'friends',
      'Boyfriend': 'a boyfriend',
      'Boyfriends': 'boyfriends',
      'Girlfriend': 'a girlfriend',
      'Girlfriends': 'girlfriends',
      'Casino Poker Players': 'Casino poker players'
    };

    const lookup = typeMap[datingType];
    if (!lookup) return '';
    return `Looking for ${lookup}.`;
  };

  const applyDigitRule = (text) => {
    if (!text) return text;
    let trimmed = text.trim();
    if (trimmed.endsWith('.')) {
      if (/\d$/.test(trimmed.slice(0, -1))) {
        if (/№\d+\.$/.test(trimmed)) return trimmed;
        if (/type \d+\.$/i.test(trimmed)) return trimmed;
        return trimmed.slice(0, -1);
      }
    }
    return trimmed;
  };

  useEffect(() => {
    let rawOutput = '';
    if (manualCategory === 'Auto') {
      rawOutput = generateAutoAd();
      setCategory('Auto');
    } else if (manualCategory === 'Real Estate') {
      rawOutput = generateRealEstateAd();
      setCategory('Real Estate');
    } else if (manualCategory === 'Business') {
      rawOutput = generateBusinessAd();
      setCategory('Business');
    } else if (manualCategory === 'Work') {
      rawOutput = generateWorkAd();
      setCategory('Work');
    } else if (manualCategory === 'Dating') {
      rawOutput = generateDatingAd();
      setCategory('Dating');
    } else if (manualCategory === 'Other') {
      rawOutput = generateOtherAd();
      setCategory('Other');
    } else {
      setCategory(manualCategory);
      if (input.trim() === '') setOutput('');
      return;
    }
    
    setOutput(applyDigitRule(rawOutput));
  }, [
    input, manualCategory, 
    formAction, formCar1, formCar2, formMoney, formMoneyUnit, isNegotiable, 
    configLevel, hasVisuals, hasWheels, wheelType, hasInsurance, hasTurbo, hasDrift,
    propertyType, apartmentComplex, formHouseNum, houseQuantity, formLocation, locPrefix, hasGarden, garageSpaces, warehouses, customInterior,
    hasHelipad, hasPool, hasTennis, driveway, spaciousBackyard, views,
    businessCategory, selectedBusiness, formBusNum, businessModifier, cropType, plantationBeds, sharesQuantity,
    workAction, workProfession, workExperience, constructionSiteNum, truckerVanPercent, workIsPlural,
    datingType,
    otherType, otherItem1, otherItem2, otherItem3, otherBeachMarket, otherBeachShop, otherBulk,
    otherServiceType, otherBusinessOwner, otherEventType, otherEventLocation, otherPartyHouseNum,
    otherWeddingNames, otherWeddingTime, otherCarBrand, otherGameType, otherGameBet, otherPrice1, otherPrice2, otherPrice3,
    otherQty1, otherQty2, otherQty3, otherEach, otherRespectively, otherPrice1Unit, otherPrice2Unit, otherPrice3Unit,
    otherItem1Quality, otherItem2Quality, otherItem3Quality, otherItem1Type, otherItem2Type, otherItem3Type
  ]);


  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    // Auto
    setFormCar1('');
    setFormCar2('');
    setConfigLevel('none');
    setHasVisuals(false);
    setHasWheels(false);
    setWheelType('');
    setHasInsurance(false);
    setHasTurbo(false);
    setHasDrift(false);

    // Real Estate
    setPropertyType('House');
    setApartmentComplex('None');
    setFormHouseNum('');
    setHouseQuantity(1);
    setHasGarden(false);
    setGarageSpaces('None');
    setWarehouses('None');
    setCustomInterior(false);
    setHasHelipad(false);
    setHasPool(false);
    setHasTennis(false);
    setDriveway('None');
    setSpaciousBackyard(false);
    setViews('None');

    // Business
    setBusinessCategory('General');
    setSelectedBusiness('None');
    setFormBusNum('');
    setBusinessModifier('Standard');
    setCropType('');
    setPlantationBeds('');

    // Work
    setWorkAction('Hiring');
    setWorkProfession('None');
    setWorkExperience('');
    setTruckerVanPercent('15');
    setWorkIsPlural(false);

    // Dating
    setDatingType('Family');

    // Other
    setOtherType('Items');
    setOtherItem1('');
    setOtherItem2('');
    setOtherItem3('');
    setOtherBeachMarket(false);
    setOtherBeachShop('');
    setOtherBulk(false);
    setOtherServiceType('Lawyer');
    setOtherBusinessOwner('');
    setOtherEventType('Party');
    setOtherEventLocation('');
    setOtherPartyHouseNum('');
    setOtherWeddingNames('');
    setOtherWeddingTime('');
    setOtherCarBrand('');
    setOtherGameType('Dice');
    setOtherGameBet('');
    setOtherPrice1('');
    setOtherPrice2('');
    setOtherPrice3('');
    setOtherQty1('');
    setOtherQty2('');
    setOtherQty3('');
    setOtherEach(false);
    setOtherRespectively(false);
    setOtherPrice1Unit('None');
    setOtherPrice2Unit('None');
    setOtherPrice3Unit('None');
    setOtherItem1Quality('');
    setOtherItem2Quality('');
    setOtherItem3Quality('');
    setOtherItem1Type('');
    setOtherItem2Type('');
    setOtherItem3Type('');
    setOtherItem1Color('');
    setOtherItem2Color('');
    setOtherItem3Color('');

    // Global
    setFormAction('Buy');
    setFormLocation('');
    setLocPrefix('in');
    setFormMoney('');
    setFormMoneyUnit('None');
    setIsNegotiable(false);
    setInput('');
    setOutput('');
    setCopied(false);
  };

  const handleOtherTypeChange = (newType) => {
    if (newType === otherType) return;
    
    setOtherItem1('');
    setOtherItem2('');
    setOtherItem3('');
    setOtherBeachMarket(false);
    setOtherBeachShop('');
    setOtherBulk(false);
    setOtherEach(false);
    setOtherRespectively(false);
    setOtherServiceType('Lawyer');
    setOtherBusinessOwner('');
    setOtherEventType('Party');
    setOtherEventLocation('');
    setOtherPartyHouseNum('');
    setOtherWeddingNames('');
    setOtherWeddingTime('');
    setOtherCarBrand('');
    setOtherGameType('Dice');
    setOtherGameBet('');
    setOtherPrice1('');
    setOtherPrice2('');
    setOtherPrice3('');
    setOtherQty1('');
    setOtherQty2('');
    setOtherQty3('');
    setOtherPrice1Unit('None');
    setOtherPrice2Unit('None');
    setOtherPrice3Unit('None');
    setOtherItem1Quality('');
    setOtherItem2Quality('');
    setOtherItem3Quality('');
    setOtherItem1Type('');
    setOtherItem2Type('');
    setOtherItem3Type('');
    setOtherItem1Color('');
    setOtherItem2Color('');
    setOtherItem3Color('');
    
    setOtherType(newType);
  };

  return (
    <div className="container">


      <div className="card">
        <div className="category-selector">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${manualCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setManualCategory(cat);
                handleReset();
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {manualCategory === 'Auto' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Ad Action</label>
              <div className="action-toggles">
                <button className={`action-btn ${formAction === 'Buy' ? 'active' : ''}`} onClick={() => setFormAction('Buy')}>🛒 Buy</button>
                <button className={`action-btn ${formAction === 'Sell' ? 'active' : ''}`} onClick={() => setFormAction('Sell')}>💰 Sell</button>
                <button className={`action-btn ${formAction === 'Trade' ? 'active' : ''}`} onClick={() => setFormAction('Trade')}>🔄 Trade</button>
                <button className={`action-btn ${formAction === 'SellOrTrade' ? 'active' : ''}`} onClick={() => setFormAction('SellOrTrade')}>🤝 Sell/Trade</button>
              </div>
            </div>

            <div className="form-group">
              <label>{formAction === 'Trade' ? 'Vehicle You Are Trading (Car 1)' : 'Vehicle Name'}</label>
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search vehicle..."
                  value={activeCarSearch === 1 ? carSearch : ''}
                  onChange={(e) => {
                    setActiveCarSearch(1);
                    setCarSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => { setActiveCarSearch(1); setShowDropdown(true); }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                <div style={{color: 'var(--text-main)', marginTop: '4px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  Selected: <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{formCar1 || 'None'}</span>
                  {formCar1 && (
                    <button style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, fontSize: '0.8rem', textDecoration: 'underline'}} onClick={() => setFormCar1('')}>remove</button>
                  )}
                </div>
                {showDropdown && activeCarSearch === 1 && filteredCars.length > 0 && (
                  <div className="dropdown">
                    {filteredCars.map(car => (
                      <div key={car} className="dropdown-item" onClick={() => handleCarSelect(car)}>{car}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {formAction === 'Trade' && (
              <div className="form-group">
                <label>Vehicle You Want (Optional) (Car 2)</label>
                <div className="search-container">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="Search vehicle..."
                    value={activeCarSearch === 2 ? carSearch : ''}
                    onChange={(e) => {
                      setActiveCarSearch(2);
                      setCarSearch(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => { setActiveCarSearch(2); setShowDropdown(true); }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  />
                  <div style={{color: 'var(--text-main)', marginTop: '4px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    Selected: <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{formCar2 || 'None'}</span>
                    {formCar2 && (
                      <button style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, fontSize: '0.8rem', textDecoration: 'underline'}} onClick={() => setFormCar2('')}>remove</button>
                    )}
                  </div>
                  {showDropdown && activeCarSearch === 2 && filteredCars.length > 0 && (
                    <div className="dropdown">
                      {filteredCars.map(car => (
                        <div key={car} className="dropdown-item" onClick={() => handleCarSelect(car)}>{car}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Vehicle Specifications</label>
              <div className="checklist">
                <label className="check-item">
                  <input type="checkbox" checked={configLevel === 'partial'} onChange={() => setConfigLevel(prev => prev === 'partial' ? 'none' : 'partial')} />
                  Partial Configuration
                </label>
                <label className="check-item">
                  <input type="checkbox" checked={configLevel === 'full'} onChange={() => setConfigLevel(prev => prev === 'full' ? 'none' : 'full')} />
                  Full Configuration
                </label>
                <label className="check-item">
                  <input type="checkbox" checked={hasVisuals} onChange={(e) => setHasVisuals(e.target.checked)} />
                  Visual Upgrades
                </label>
                <div className="check-item" style={{ cursor: 'default' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>
                    <input type="checkbox" checked={hasWheels} onChange={(e) => setHasWheels(e.target.checked)} />
                    Luminous Wheels
                  </label>
                  {hasWheels && (
                    <input type="text" className="check-inline-input" placeholder="Type (e.g. red)" value={wheelType} onChange={(e) => setWheelType(e.target.value)} />
                  )}
                </div>
                <label className="check-item">
                  <input type="checkbox" checked={hasInsurance} onChange={(e) => setHasInsurance(e.target.checked)} />
                  Insurance
                </label>
                <label className="check-item">
                  <input type="checkbox" checked={hasTurbo} onChange={(e) => setHasTurbo(e.target.checked)} />
                  Turbo Kit
                </label>
                <label className="check-item">
                  <input type="checkbox" checked={hasDrift} onChange={(e) => setHasDrift(e.target.checked)} />
                  Drift Kit
                </label>
              </div>
            </div>

            {formAction !== 'Trade' && (
              <div className="form-group">
                <label>Budget / Price</label>
                <div className="money-bar">
                  <input 
                    type="text" 
                    className="money-input"
                    placeholder={isNegotiable ? "Negotiable" : "Amount (e.g. 1.5)"}
                    value={formMoney}
                    onChange={(e) => setFormMoney(e.target.value)}
                    disabled={isNegotiable}
                  />
                  <button 
                    className={`money-btn ${formMoneyUnit === 'Million' ? 'active' : ''}`}
                    onClick={() => setFormMoneyUnit(prev => prev === 'Million' ? 'None' : 'Million')}
                    disabled={isNegotiable}
                  >
                    Million
                  </button>
                  <button 
                    className={`money-btn ${isNegotiable ? 'active' : ''}`}
                    onClick={() => setIsNegotiable(!isNegotiable)}
                  >
                    Negotiable
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {manualCategory === 'Real Estate' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Ad Action</label>
              <div className="action-toggles">
                <button className={`action-btn ${formAction === 'Buy' ? 'active' : ''}`} onClick={() => setFormAction('Buy')}>🛒 Buy</button>
                <button className={`action-btn ${formAction === 'Sell' ? 'active' : ''}`} onClick={() => setFormAction('Sell')}>💰 Sell</button>
                <button className={`action-btn ${formAction === 'Rent' ? 'active' : ''}`} onClick={() => setFormAction('Rent')}>🤝 Rent</button>
              </div>
            </div>

            <div className="form-group">
              <label>Property Type</label>
              <select value={propertyType} onChange={(e) => {
                const newType = e.target.value;
                setPropertyType(newType);
                if (newType !== 'House' && (garageSpaces === '2 g.s.' || garageSpaces === '5 g.s.')) {
                  setGarageSpaces('None');
                }
              }} className="search-input">
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <select value={houseQuantity} onChange={(e) => setHouseQuantity(Number(e.target.value))} className="search-input">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            {houseQuantity === 1 && (
              <div className="form-group">
                <label>House Number (Optional)</label>
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="e.g. 37"
                  value={formHouseNum}
                  onChange={(e) => setFormHouseNum(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            )}

            {propertyType !== 'Penthouse' && (
              <div className="form-group">
                {propertyType === 'Apartment' ? (
                  <>
                    <label>Apartment Complex</label>
                    <div className="checklist" style={{ marginTop: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                      {['Eclipse Towers', 'Tinsel Towers', 'Del Perro Heights', 'Richards Majestic', 'Tinkle Building', '3 Alta Street', 'Celltowa Building', 'beach market'].map(complex => (
                        <label key={complex} className="check-item">
                          <input 
                            type="checkbox" 
                            checked={apartmentComplex === complex} 
                            onChange={() => setApartmentComplex(apartmentComplex === complex ? 'None' : complex)} 
                          /> 
                          {complex}
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ margin: 0 }}>Location</label>
                      <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                        Prefix:
                        <select value={locPrefix} onChange={(e) => setLocPrefix(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem', margin: 0}}>
                          <option value="in">in</option>
                          <option value="near">near</option>
                        </select>
                      </label>
                    </div>
                    <div className="search-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', maxHeight: 'none', overflowY: 'visible', padding: '1.2rem', marginTop: 0, alignContent: 'start', gap: '0.4rem' }}>
                        <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Locations</div>
                        {[...officialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                          <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                            <input 
                              type="checkbox" 
                              checked={formLocation === loc} 
                              onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                            /> 
                            <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                          </label>
                        ))}
                        
                        <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Unofficial Locations</div>
                        {[...unofficialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                          <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                            <input 
                              type="checkbox" 
                              checked={formLocation === loc} 
                              onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                            /> 
                            <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="form-group">
              <label>Property Features</label>
              <div className="checklist">
                {propertyType === 'House' && (
                  <label className="check-item"><input type="checkbox" checked={hasGarden} onChange={(e) => setHasGarden(e.target.checked)} /> Garden</label>
                )}
                
                <div className="check-item" style={{ cursor: 'default' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'help', margin: 0 }} title="Available: 2, 5, 9, 25, 30, 35 g.s.">Garage Spaces</label>
                  <select value={garageSpaces} onChange={(e) => setGarageSpaces(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem'}}>
                    <option value="None">None</option>
                    {propertyType === 'House' && (
                      <>
                        <option value="2 g.s.">2 g.s.</option>
                        <option value="5 g.s.">5 g.s.</option>
                      </>
                    )}
                    <option value="9 g.s.">9 g.s.</option>
                    <option value="25 g.s.">25 g.s.</option>
                    <option value="30 g.s.">30 g.s.</option>
                    <option value="35 g.s.">35 g.s.</option>
                  </select>
                </div>

                <div className="check-item" style={{ cursor: 'default' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'help', margin: 0 }} title="Available: 3, 4, 5 w.h.">Warehouses</label>
                  <select value={warehouses} onChange={(e) => setWarehouses(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem'}}>
                    <option value="None">None</option>
                    <option value="3 w.h.">3 w.h.</option>
                    <option value="4 w.h.">4 w.h.</option>
                    <option value="5 w.h.">5 w.h.</option>
                  </select>
                </div>

                <label className="check-item"><input type="checkbox" checked={customInterior} onChange={(e) => setCustomInterior(e.target.checked)} /> Custom Interior</label>
                
                {propertyType === 'House' && (
                  <>
                    <label className="check-item"><input type="checkbox" checked={hasInsurance} onChange={(e) => setHasInsurance(e.target.checked)} /> Insurance</label>
                    <label className="check-item"><input type="checkbox" checked={hasHelipad} onChange={(e) => setHasHelipad(e.target.checked)} /> Helipad</label>
                    <label className="check-item"><input type="checkbox" checked={hasPool} onChange={(e) => setHasPool(e.target.checked)} /> Swimming Pool</label>
                    <label className="check-item"><input type="checkbox" checked={hasTennis} onChange={(e) => setHasTennis(e.target.checked)} /> Tennis Court</label>
                    
                    <div className="check-item" style={{ cursor: 'default' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'help', margin: 0 }} title="Available: long, large">Driveway</label>
                      <select value={driveway} onChange={(e) => setDriveway(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem'}}>
                        <option value="None">None</option>
                        <option value="long">long</option>
                        <option value="large">large</option>
                      </select>
                    </div>

                    <label className="check-item"><input type="checkbox" checked={spaciousBackyard} onChange={(e) => setSpaciousBackyard(e.target.checked)} /> Spacious Backyard</label>
                  </>
                )}

                <div className="check-item" style={{ cursor: 'default' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'help', margin: 0 }} title="Available: nice, beautiful, great">Views</label>
                  <select value={views} onChange={(e) => setViews(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem'}}>
                    <option value="None">None</option>
                    <option value="nice">nice</option>
                    <option value="beautiful">beautiful</option>
                    <option value="great">great</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Budget / Price</label>
              <div className="money-bar">
                <input 
                  type="text" 
                  className="money-input"
                  placeholder={isNegotiable ? "Negotiable" : "Amount (e.g. 1.5)"}
                  value={formMoney}
                  onChange={(e) => setFormMoney(e.target.value)}
                  disabled={isNegotiable}
                />
                <button 
                  className={`money-btn ${formMoneyUnit === 'Million' ? 'active' : ''}`}
                  onClick={() => setFormMoneyUnit(prev => prev === 'Million' ? 'None' : 'Million')}
                  disabled={isNegotiable}
                >
                  Million
                </button>
                <button 
                  className={`money-btn ${isNegotiable ? 'active' : ''}`}
                  onClick={() => setIsNegotiable(!isNegotiable)}
                >
                  Negotiable
                </button>
              </div>
            </div>
          </div>
        )}

        {manualCategory === 'Business' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Ad Action</label>
              <div className="action-toggles">
                <button className={`action-btn ${formAction === 'Buy' ? 'active' : ''}`} onClick={() => setFormAction('Buy')}>🛒 Buy</button>
                <button className={`action-btn ${formAction === 'Sell' ? 'active' : ''}`} onClick={() => setFormAction('Sell')}>💰 Sell</button>
                {businessCategory === 'General' && businessModifier === 'Standard' && (
                  <>
                    <button className={`action-btn ${formAction === 'Trade' ? 'active' : ''}`} onClick={() => setFormAction('Trade')}>🔄 Trade</button>
                    <button className={`action-btn ${formAction === 'SellOrTrade' ? 'active' : ''}`} onClick={() => setFormAction('SellOrTrade')}>🤝 Sell or Trade</button>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label>Business Category</label>
                  <select value={businessCategory} onChange={(e) => {
                    setBusinessCategory(e.target.value);
                    setSelectedBusiness('None');
                    if (e.target.value === 'Family' && (formAction === 'Trade' || formAction === 'SellOrTrade')) {
                      setFormAction('Buy');
                    }
                  }} className="search-input">
                    <option value="General">General Business</option>
                    <option value="Family">Family Business</option>
                  </select>
                </div>
                {businessCategory === 'General' && (
                  <div style={{ flex: '1 1 200px' }}>
                    <label>Modifier</label>
                    <select value={businessModifier} onChange={(e) => {
                      setBusinessModifier(e.target.value);
                      setSelectedBusiness('None');
                      if ((e.target.value === 'Shares' || e.target.value === 'Control') && (formAction === 'Trade' || formAction === 'SellOrTrade')) {
                        setFormAction('Buy');
                      }
                    }} className="search-input">
                      <option value="Standard">Standard</option>
                      <option value="Shares">Shares</option>
                      <option value="Control">Control</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {businessModifier === 'Shares' && businessCategory === 'General' && (
              <div className="form-group">
                <label>Shares Quantity</label>
                <div className="search-container">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="e.g. 5"
                    value={sharesQuantity}
                    onChange={(e) => setSharesQuantity(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>
            )}

            {businessModifier !== 'Shares' && selectedBusiness !== 'Plantation' && selectedBusiness !== 'Cowshed' && (
              <div className="form-group">
                <label>Business Number</label>
                <div className="search-container">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="e.g. 123"
                    value={formBusNum}
                    onChange={(e) => setFormBusNum(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Specific Business</label>
              <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', maxHeight: '200px', overflowY: 'auto' }}>
                <label className="check-item">
                  <input 
                    type="radio" 
                    checked={selectedBusiness === 'None'} 
                    onChange={() => setSelectedBusiness('None')} 
                  /> 
                  None (Generic)
                </label>
                {(businessCategory === 'General' ? (businessModifier === 'Shares' ? sharesBusinesses : generalBusinesses) : familyBusinesses).map(bus => (
                  <label key={bus} className="check-item">
                    <input 
                      type="radio" 
                      checked={selectedBusiness === bus} 
                      onChange={() => setSelectedBusiness(bus)} 
                      onClick={() => {
                        if (selectedBusiness === bus) {
                          setSelectedBusiness('None');
                        }
                      }}
                    /> 
                    {bus}
                  </label>
                ))}
              </div>
            </div>

            {selectedBusiness === 'Plantation' && (
              <div className="form-group">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <label>Crop Type</label>
                    <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', maxHeight: '150px', overflowY: 'auto' }}>
                      <label className="check-item">
                        <input type="radio" checked={cropType === ''} onChange={() => setCropType('')} />
                        None
                      </label>
                      {['Pumpkin', 'Cabbage', 'Mandarin', 'Pineapple'].map(crop => (
                        <label key={crop} className="check-item">
                          <input type="radio" checked={cropType === crop} onChange={() => setCropType(crop)} />
                          {crop}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <label>Beds</label>
                    <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', maxHeight: '150px', overflowY: 'auto' }}>
                      <label className="check-item">
                        <input type="radio" checked={plantationBeds === ''} onChange={() => setPlantationBeds('')} />
                        None
                      </label>
                      {['5', '10', '15', '20'].map(beds => (
                        <label key={beds} className="check-item">
                          <input type="radio" checked={plantationBeds === beds} onChange={() => setPlantationBeds(beds)} />
                          {beds}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!(businessCategory === 'General' && (businessModifier === 'Shares' || businessModifier === 'Control')) && (
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ margin: 0 }}>Location</label>
                  <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                    Prefix:
                    <select value={locPrefix} onChange={(e) => setLocPrefix(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem', margin: 0}}>
                      <option value="in">in</option>
                      <option value="near">near</option>
                    </select>
                  </label>
                </div>
                <div className="search-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', maxHeight: 'none', overflowY: 'visible', padding: '1.2rem', marginTop: 0, alignContent: 'start', gap: '0.4rem' }}>
                    <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Locations</div>
                    {[...officialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                      <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                        <input 
                          type="checkbox" 
                          checked={formLocation === loc} 
                          onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                        /> 
                        <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                      </label>
                    ))}

                    <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Unofficial Locations</div>
                    {[...unofficialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                      <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                        <input 
                          type="checkbox" 
                          checked={formLocation === loc} 
                          onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                        /> 
                        <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Budget / Price</label>
              <div className="money-bar">
                <input 
                  type="text" 
                  className="money-input"
                  placeholder={isNegotiable ? "Negotiable" : "Amount (e.g. 1.5)"}
                  value={formMoney}
                  onChange={(e) => setFormMoney(e.target.value)}
                  disabled={isNegotiable}
                />
                <button 
                  className={`money-btn ${formMoneyUnit === 'Million' ? 'active' : ''}`}
                  onClick={() => setFormMoneyUnit(prev => prev === 'Million' ? 'None' : 'Million')}
                  disabled={isNegotiable}
                >
                  Million
                </button>
                <button 
                  className={`money-btn ${isNegotiable ? 'active' : ''}`}
                  onClick={() => setIsNegotiable(!isNegotiable)}
                >
                  Negotiable
                </button>
              </div>
            </div>
          </div>
        )}

        {manualCategory === 'Work' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Action</label>
              <div className="action-toggles">
                <button className={`action-btn ${workAction === 'Hiring' ? 'active' : ''}`} onClick={() => setWorkAction('Hiring')}>💼 Hiring</button>
                <button className={`action-btn ${workAction === 'Looking' ? 'active' : ''}`} onClick={() => setWorkAction('Looking')}>🔍 Looking</button>
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Profession / Role</label>
                    {workAction === 'Hiring' && workProfession !== 'None' && workProfession !== 'Construction site' && workProfession !== 'Firefighter' && workProfession !== 'Solar panel plantation worker' && !constructionRoles.includes(workProfession) && (
                      <label className="check-item check-inline" style={{ padding: 0, margin: 0, fontSize: '0.75rem', fontWeight: 600 }}>
                        <input type="checkbox" checked={workIsPlural} onChange={(e) => setWorkIsPlural(e.target.checked)} />
                        Multiple (Plural)
                      </label>
                    )}
                  </div>
                  <select 
                    className="search-input"
                    value={workProfession} 
                    onChange={(e) => setWorkProfession(e.target.value)}
                  >
                    <optgroup label="General Roles">
                      {workProfessions.map(prof => (
                        <option key={prof} value={prof}>{prof}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Construction Roles">
                      {constructionRoles.filter(r => r !== 'None').map(prof => (
                        <option key={prof} value={prof}>
                          {prof === 'Construction site' && workAction === 'Hiring' ? 'Workers' : prof}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                
                {(constructionRoles.includes(workProfession) || workProfession === 'None' || workProfession === 'Construction site') && !(workAction === 'Looking' && workProfession === 'None') && (
                  <div style={{ flex: '1 1 200px' }}>
                    <label>Construction Site №</label>
                    <select 
                      className="search-input"
                      value={constructionSiteNum} 
                      onChange={(e) => setConstructionSiteNum(e.target.value)}
                    >
                      {['None', '1', '2', '3'].map(site => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>


            {(workProfession === 'Trucker' || constructionRoles.includes(workProfession)) && !(workAction === 'Looking' && workProfession === 'None') && (
              <div className="form-group">
                <label>Years of Experience</label>
                <div className="search-container">
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="e.g. 3"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
              </div>
            )}

            {workAction !== 'Looking' && constructionSiteNum === 'None' && !['Trucker', 'Lawyer', 'Personal driver', 'Assistant', 'Solar panel plantation worker'].includes(workProfession) && !constructionRoles.includes(workProfession) && (
              <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ margin: 0 }}>Location</label>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                  Prefix:
                  {workProfession === 'Firefighter' ? (
                    <span style={{ fontWeight: 'bold' }}>at</span>
                  ) : (
                    <select value={locPrefix} onChange={(e) => setLocPrefix(e.target.value)} className="check-inline-input" style={{width: 'auto', padding: '0.2rem 0.5rem', margin: 0}}>
                      <option value="in">in</option>
                      <option value="near">near</option>
                      <option value="on">on</option>
                    </select>
                  )}
                </label>
              </div>
              <div className="search-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', maxHeight: 'none', overflowY: 'visible', padding: '1.2rem', marginTop: 0, alignContent: 'start', gap: '0.4rem' }}>
                  <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Locations</div>
                  {[...officialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                    <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                      <input 
                        type="checkbox" 
                        checked={formLocation === loc} 
                        onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                      /> 
                      <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                    </label>
                  ))}

                  <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Unofficial Locations</div>
                  {[...unofficialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                    <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                      <input 
                        type="checkbox" 
                        checked={formLocation === loc} 
                        onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                      /> 
                      <span style={{ fontSize: '0.65rem', wordBreak: 'break-word', lineHeight: '1.4', paddingTop: '0.1rem' }}>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            )}

            {workAction !== 'Looking' && (
              <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ margin: 0 }}>Salary</label>
              </div>

              <div className="money-bar">
                <input 
                  type="text" 
                  className="money-input"
                  placeholder={isNegotiable ? "Negotiable" : "Amount (e.g. 15.000)"}
                  value={formMoney}
                  onChange={(e) => setFormMoney(e.target.value)}
                  disabled={isNegotiable}
                />
                <button 
                  className={`money-btn ${formMoneyUnit === 'Million' ? 'active' : ''}`}
                  onClick={() => setFormMoneyUnit(prev => prev === 'Million' ? 'None' : 'Million')}
                  disabled={isNegotiable}
                >
                  Million
                </button>
                <button 
                  className={`money-btn ${isNegotiable ? 'active' : ''}`}
                  onClick={() => setIsNegotiable(!isNegotiable)}
                >
                  Negotiable
                </button>
              </div>
            </div>
            )}
          </div>
        )}

        {manualCategory === 'Dating' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Looking For</label>
              <div className="action-toggles" style={{ flexWrap: 'wrap' }}>
                {['Family', 'Family Members', 'Date', 'Wife', 'Husband', 'Valentine', 'Friend', 'Friends', 'Boyfriend', 'Boyfriends', 'Girlfriend', 'Girlfriends', 'Casino Poker Players'].map(type => (
                  <button
                    key={type}
                    className={`action-btn ${datingType === type ? 'active' : ''}`}
                    onClick={() => setDatingType(type)}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    {type === 'Family' ? '👨‍👩‍👧‍👦 Family' : type === 'Family Members' ? '👥 Family Members' : type === 'Date' ? '💕 Date' : type === 'Wife' ? '👰 Wife' : type === 'Husband' ? '🤵 Husband' : type === 'Valentine' ? '💝 Valentine' : type === 'Friend' ? '🤝 Friend' : type === 'Friends' ? '🤝 Friends' : type === 'Boyfriend' ? '💙 Boyfriend' : type === 'Boyfriends' ? '💙 Boyfriends' : type === 'Girlfriend' ? '💗 Girlfriend' : type === 'Girlfriends' ? '💗 Girlfriends' : '🎰 Casino Poker Players'}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {manualCategory === 'Other' && (
          <div className="form-builder">
            <div className="form-group">
              <label>Ad Type</label>
              <div className="action-toggles">
                {['Items', 'Services', 'Parties', 'Games'].map(type => (
                  <button
                    key={type}
                    className={`action-btn ${otherType === type ? 'active' : ''}`}
                    onClick={() => handleOtherTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {otherType === 'Items' && (
              <>
                <div className="form-group">
                  <label>Action</label>
                  <div className="action-toggles">
                    {['Buy', 'Sell', 'Trade'].map(action => (
                      <button
                        key={action}
                        className={`action-btn ${formAction === action ? 'active' : ''}`}
                        onClick={() => setFormAction(action)}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                  
                  {/* ROW 1 */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                      <label>Item 1 (Required)</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., battery"
                        value={otherItem1}
                        onChange={(e) => setOtherItem1(e.target.value)}
                        list={otherItem1.length > 0 ? "otherItemsList" : ""}
                      />
                      {['engine tuning', 'transmission tuning', 'suspension tuning', 'brakes tuning', 'tires tuning'].includes(otherItem1.trim().toLowerCase()) && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High'].map(q => (
                              <button key={q} className={`action-btn ${otherItem1Quality === q ? 'active' : ''}`} onClick={() => setOtherItem1Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                      {otherItem1.trim().toLowerCase() === 'fishing rod' && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High', 'Max', 'Advanced'].map(q => (
                              <button key={q} className={`action-btn ${otherItem1Quality === q ? 'active' : ''}`} onClick={() => setOtherItem1Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                    </div>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>Qty 1</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., 3"
                        value={otherQty1}
                        onChange={(e) => setOtherQty1(e.target.value)}
                      />
                    </div>
                    {otherItem1.trim().toLowerCase() === 'luminous wheels' && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Type</label>
                        <input type="text" className="search-input" placeholder="e.g., 1, 2, Sport" value={otherItem1Type} onChange={(e) => setOtherItem1Type(e.target.value)} />
                      </div>
                    )}
                    {clothingItems.map(c => c.toLowerCase()).includes(otherItem1.trim().toLowerCase()) && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Color</label>
                        <input type="text" className="search-input" placeholder="e.g., red, neon" value={otherItem1Color} onChange={(e) => setOtherItem1Color(e.target.value)} />
                      </div>
                    )}
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>{formAction === 'Buy' ? 'Budget' : 'Price'} 1</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="$15.000 or Neg"
                          value={otherPrice1}
                          onChange={(e) => setOtherPrice1(e.target.value)}
                        />
                        <button 
                           className={`action-btn ${otherPrice1Unit === 'Million' ? 'active' : ''}`}
                           style={{ flex: '0 0 auto', padding: '0 0.8rem', fontSize: '0.8rem', borderRadius: '10px' }}
                           onClick={() => setOtherPrice1Unit(otherPrice1Unit === 'Million' ? 'None' : 'Million')}
                        >
                           Million
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ROW 2 */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                      <label>Item 2 (Optional)</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., fuel canister"
                        value={otherItem2}
                        onChange={(e) => setOtherItem2(e.target.value)}
                        list={otherItem2.length > 0 ? "otherItemsList" : ""}
                      />
                      {['engine tuning', 'transmission tuning', 'suspension tuning', 'brakes tuning', 'tires tuning'].includes(otherItem2.trim().toLowerCase()) && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High'].map(q => (
                              <button key={q} className={`action-btn ${otherItem2Quality === q ? 'active' : ''}`} onClick={() => setOtherItem2Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                      {otherItem2.trim().toLowerCase() === 'fishing rod' && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High', 'Max', 'Advanced'].map(q => (
                              <button key={q} className={`action-btn ${otherItem2Quality === q ? 'active' : ''}`} onClick={() => setOtherItem2Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                    </div>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>Qty 2</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., 10"
                        value={otherQty2}
                        onChange={(e) => setOtherQty2(e.target.value)}
                      />
                    </div>
                    {otherItem2.trim().toLowerCase() === 'luminous wheels' && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Type</label>
                        <input type="text" className="search-input" placeholder="e.g., 1, 2, Sport" value={otherItem2Type} onChange={(e) => setOtherItem2Type(e.target.value)} />
                      </div>
                    )}
                    {clothingItems.map(c => c.toLowerCase()).includes(otherItem2.trim().toLowerCase()) && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Color</label>
                        <input type="text" className="search-input" placeholder="e.g., red, neon" value={otherItem2Color} onChange={(e) => setOtherItem2Color(e.target.value)} />
                      </div>
                    )}
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>{formAction === 'Buy' ? 'Budget' : 'Price'} 2</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="$20.000"
                          value={otherPrice2}
                          onChange={(e) => setOtherPrice2(e.target.value)}
                        />
                        <button 
                           className={`action-btn ${otherPrice2Unit === 'Million' ? 'active' : ''}`}
                           style={{ flex: '0 0 auto', padding: '0 0.8rem', fontSize: '0.8rem', borderRadius: '10px' }}
                           onClick={() => setOtherPrice2Unit(otherPrice2Unit === 'Million' ? 'None' : 'Million')}
                        >
                           Million
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ROW 3 */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                      <label>Item 3 (Optional)</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., brakes tuning"
                        value={otherItem3}
                        onChange={(e) => setOtherItem3(e.target.value)}
                        list={otherItem3.length > 0 ? "otherItemsList" : ""}
                      />
                      {['engine tuning', 'transmission tuning', 'suspension tuning', 'brakes tuning', 'tires tuning'].includes(otherItem3.trim().toLowerCase()) && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High'].map(q => (
                              <button key={q} className={`action-btn ${otherItem3Quality === q ? 'active' : ''}`} onClick={() => setOtherItem3Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                      {otherItem3.trim().toLowerCase() === 'fishing rod' && (
                         <div className="action-toggles" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
                           {['Low', 'Medium', 'High', 'Max', 'Advanced'].map(q => (
                              <button key={q} className={`action-btn ${otherItem3Quality === q ? 'active' : ''}`} onClick={() => setOtherItem3Quality(q)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>{q} quality</button>
                           ))}
                         </div>
                      )}
                    </div>
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>Qty 3</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., 50"
                        value={otherQty3}
                        onChange={(e) => setOtherQty3(e.target.value)}
                      />
                    </div>
                    {otherItem3.trim().toLowerCase() === 'luminous wheels' && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Type</label>
                        <input type="text" className="search-input" placeholder="e.g., 1, 2, Sport" value={otherItem3Type} onChange={(e) => setOtherItem3Type(e.target.value)} />
                      </div>
                    )}
                    {clothingItems.map(c => c.toLowerCase()).includes(otherItem3.trim().toLowerCase()) && (
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <label>Color</label>
                        <input type="text" className="search-input" placeholder="e.g., red, neon" value={otherItem3Color} onChange={(e) => setOtherItem3Color(e.target.value)} />
                      </div>
                    )}
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>{formAction === 'Buy' ? 'Budget' : 'Price'} 3</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Negotiable"
                          value={otherPrice3}
                          onChange={(e) => setOtherPrice3(e.target.value)}
                        />
                        <button 
                           className={`action-btn ${otherPrice3Unit === 'Million' ? 'active' : ''}`}
                           style={{ flex: '0 0 auto', padding: '0 0.8rem', fontSize: '0.8rem', borderRadius: '10px' }}
                           onClick={() => setOtherPrice3Unit(otherPrice3Unit === 'Million' ? 'None' : 'Million')}
                        >
                           Million
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <datalist id="otherItemsList">
                  {otherItemsList.map(item => <option key={item} value={item} />)}
                </datalist>

                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="checkbox" 
                      id="beachMarket"
                      checked={otherBeachMarket}
                      onChange={(e) => setOtherBeachMarket(e.target.checked)}
                    />
                    <label htmlFor="beachMarket" style={{ marginBottom: 0 }}>Beach Market</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="checkbox" 
                      id="bulkCheck"
                      checked={otherBulk}
                      onChange={(e) => setOtherBulk(e.target.checked)}
                    />
                    <label htmlFor="bulkCheck" style={{ marginBottom: 0 }}>Bulk</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="checkbox" 
                      id="eachCheck"
                      checked={otherEach}
                      onChange={(e) => setOtherEach(e.target.checked)}
                    />
                    <label htmlFor="eachCheck" style={{ marginBottom: 0 }}>Each</label>
                  </div>
                  {(otherItem2.trim() !== '' || otherItem3.trim() !== '') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="checkbox" 
                        id="respCheck"
                        checked={otherRespectively}
                        onChange={(e) => setOtherRespectively(e.target.checked)}
                      />
                      <label htmlFor="respCheck" style={{ marginBottom: 0 }}>Respectively</label>
                    </div>
                  )}
                </div>

                {otherBeachMarket && (
                  <div className="form-group">
                    <label>Shop №</label>
                    <input
                      type="number"
                      className="search-input"
                      placeholder="e.g., 23"
                      value={otherBeachShop}
                      onChange={(e) => setOtherBeachShop(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            {otherType === 'Services' && (
              <>
                <div className="form-group">
                  <label>Service Type</label>
                  <select 
                    className="search-input" 
                    value={otherServiceType}
                    onChange={(e) => setOtherServiceType(e.target.value)}
                    style={{ padding: '0.8rem', backgroundColor: '#16161e', color: 'var(--text)', cursor: 'pointer' }}
                  >
                    {['Lawyer', 'Personal driver', 'Professional dancer', 'Professional singer', 'DJ', 'Alliance', 'Business owner'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {otherServiceType === 'Business owner' && (
                  <div className="form-group">
                    <label>Business Type</label>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="e.g., 24/7 Store"
                      value={otherBusinessOwner}
                      onChange={(e) => setOtherBusinessOwner(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            {otherType === 'Parties' && (
              <>
                <div className="form-group">
                  <label>Event Type</label>
                  <div className="action-toggles">
                    {['Party', 'Pool party', 'Wedding', 'Car meet'].map(type => (
                      <button
                        key={type}
                        className={`action-btn ${otherEventType === type ? 'active' : ''}`}
                        onClick={() => setOtherEventType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                {otherEventType === 'Wedding' && (
                  <>
                    <div className="form-group">
                      <label>Names (Optional)</label>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="e.g., John Smith and Susan Jones"
                        value={otherWeddingNames}
                        onChange={(e) => setOtherWeddingNames(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Time (Optional)</label>
                      <input
                        type="time"
                        className="search-input"
                        value={otherWeddingTime}
                        onChange={(e) => setOtherWeddingTime(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {otherEventType === 'Car meet' && (
                  <div className="form-group">
                    <label>Car Brand (Optional)</label>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="e.g., Truffade"
                      value={otherCarBrand}
                      onChange={(e) => setOtherCarBrand(e.target.value)}
                    />
                  </div>
                )}
                {otherEventType !== 'Wedding' && (
                  <>
                    <div className="form-group">
                      <label>Location</label>
                      <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', maxHeight: 'none', padding: '1rem', marginTop: 0 }}>
                        {partyLocations.map(loc => (
                          <label key={loc} className="check-item" style={{ minWidth: 0, alignItems: 'flex-start' }}>
                            <input 
                              type="checkbox" 
                              checked={otherEventLocation === loc}
                              onChange={() => setOtherEventLocation(otherEventLocation === loc ? '' : loc)}
                            /> 
                            <span style={{ fontSize: '0.75rem', lineHeight: '1.4', paddingTop: '0.15rem' }}>{loc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {(otherEventLocation.toLowerCase().includes('house') || otherEventLocation.toLowerCase().includes('apartment')) && (
                      <div className="form-group">
                        <label>House/Apartment №</label>
                        <input
                          type="text"
                          className="search-input"
                          placeholder="e.g., 49"
                          value={otherPartyHouseNum}
                          onChange={(e) => setOtherPartyHouseNum(e.target.value)}
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {otherType === 'Games' && (
              <>
                <div className="form-group">
                  <label>Game Type</label>
                  <div className="action-toggles">
                    {['Dice', 'Poker'].map(game => (
                      <button
                        key={game}
                        className={`action-btn ${otherGameType === game ? 'active' : ''}`}
                        onClick={() => setOtherGameType(game)}
                      >
                        {game}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Bet Amount (Max $10 Million)</label>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="e.g., 100000 or Negotiable"
                    value={otherGameBet}
                    onChange={(e) => setOtherGameBet(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        <div className="output-section">
          <div className="output-header">
            <label>Formatted Output</label>
            {category && <span className="badge">{category}</span>}
          </div>
          <textarea
            className="output-box"
            placeholder="Result will appear here..."
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>


        <div className="actions" style={{display: 'flex', gap: '1.5rem'}}>
          <button 
            className="btn-reset"
            onClick={handleReset}
            title="Reset"
          >
            <img src="/reset-icon.jpg" alt="Reset" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
          </button>
          <button 
            className={`btn ${copied ? 'success' : ''}`}
            onClick={handleCopy}
            disabled={!output}
            style={{flex: 1}}
          >
            {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
