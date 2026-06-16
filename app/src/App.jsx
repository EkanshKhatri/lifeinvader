import { useState, useEffect } from 'react';
import { formatAd } from './utils/formatter';
import { carsList, allLocations, officialLocations, unofficialLocations, familyBusinesses, generalBusinesses, sharesBusinesses } from './data';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [category, setCategory] = useState('');
  const [manualCategory, setManualCategory] = useState('Auto-Detect');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  
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

  const categories = ['Auto-Detect', 'Auto', 'Real Estate', 'Business', 'Work', 'Dating', 'Other'];

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
        locStr = ` ${locPrefix} the ${formLocation.toLowerCase()}`;
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
    return ad;
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
    if (formLocation) {
      if (officialLocations.includes(formLocation)) {
        locStr = ` ${locPrefix} ${formLocation}`;
      } else {
        locStr = ` ${locPrefix} the ${formLocation.toLowerCase()}`;
      }
    }

    let objStr = '';
    if (businessModifier === 'Shares') {
       objStr = selectedBusiness !== 'None' ? selectedBusiness : 'business shares';
    } else {
       if (selectedBusiness === 'Plantation') {
          let crop = cropType.trim() ? (cropType.charAt(0).toUpperCase() + cropType.slice(1).toLowerCase() + ' p') : 'P';
          objStr = `${crop}lantation business`;
          if (plantationBeds.trim()) {
            objStr += ` with ${plantationBeds} beds`;
          }
       } else if (selectedBusiness !== 'None') {
          let busName = selectedBusiness === 'Drug lab' ? 'Burger shop' : selectedBusiness;
          
          if (formBusNum) {
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
    } else {
      ad = `Selling ${objStr}${locStr}. Price: ${priceStr}.`;
    }
    return ad;
  };

  useEffect(() => {
    if (manualCategory === 'Auto') {
      setOutput(generateAutoAd());
      setCategory('Auto');
    } else if (manualCategory === 'Real Estate') {
      setOutput(generateRealEstateAd());
      setCategory('Real Estate');
    } else if (manualCategory === 'Business') {
      setOutput(generateBusinessAd());
      setCategory('Business');
    } else if (manualCategory === 'Auto-Detect') {
      if (input.trim() === '') {
        setOutput('');
        setCategory('');
      }
    } else {
      if (input.trim() === '') {
        setOutput('');
      } else {
        setOutput(`${manualCategory} | ${input}`);
      }
      setCategory(manualCategory);
    }
  }, [
    input, manualCategory, 
    formAction, formCar1, formCar2, formMoney, formMoneyUnit, isNegotiable, 
    configLevel, hasVisuals, hasWheels, wheelType, hasInsurance, hasTurbo, hasDrift,
    propertyType, apartmentComplex, formHouseNum, houseQuantity, formLocation, locPrefix, hasGarden, garageSpaces, warehouses, customInterior,
    hasHelipad, hasPool, hasTennis, driveway, spaciousBackyard, views,
    businessCategory, selectedBusiness, formBusNum, businessModifier, cropType, plantationBeds
  ]);

  const handleFormat = async () => {
    if (!input.trim() || manualCategory !== 'Auto-Detect') return;
    
    setLoading(true);
    try {
      const result = await formatAd(input);
      setOutput(result.formattedAd);
      setCategory(result.category);
    } catch (error) {
      console.error(error);
      setOutput("Error formatting ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (manualCategory === 'Auto') {
      setFormAction('Buy');
      setFormCar1('');
      setFormCar2('');
      setFormMoney('');
      setFormMoneyUnit('None');
      setIsNegotiable(false);
      setConfigLevel('none');
      setHasVisuals(false);
      setHasWheels(false);
      setWheelType('');
      setHasInsurance(false);
      setHasTurbo(false);
      setHasDrift(false);
    } else if (manualCategory === 'Real Estate') {
      setFormAction('Buy');
      setPropertyType('House');
      setApartmentComplex('None');
      setFormHouseNum('');
      setHouseQuantity(1);
      setFormLocation('');
      setLocPrefix('in');
      setFormMoney('');
      setFormMoneyUnit('None');
      setIsNegotiable(false);
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
    } else if (manualCategory === 'Business') {
      setFormAction('Buy');
      setBusinessCategory('General');
      setSelectedBusiness('None');
      setFormBusNum('');
      setBusinessModifier('Standard');
      setCropType('');
      setPlantationBeds('');
      setFormLocation('');
      setLocPrefix('in');
      setFormMoney('');
      setFormMoneyUnit('None');
      setIsNegotiable(false);
    } else {
      setInput('');
    }
    setCopied(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="logo">
          GRAND <span className="logo-highlight">RP</span>
        </h1>
        <p className="subtitle">L.I. Ad Formatter AI</p>
      </div>

      <div className="card">
        <div className="category-selector">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${manualCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setManualCategory(cat);
                if (cat === 'Auto' || cat === 'Real Estate' || cat === 'Business') {
                  setFormAction('Buy');
                  setInput('');
                }
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
                      <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', maxHeight: '250px', overflowY: 'auto', padding: '1.2rem', marginTop: 0, alignContent: 'start' }}>
                        <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Locations</div>
                        {[...officialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                          <label key={loc} className="check-item">
                            <input 
                              type="checkbox" 
                              checked={formLocation === loc} 
                              onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                            /> 
                            <span style={{ fontSize: '0.85rem' }}>{loc}</span>
                          </label>
                        ))}
                        
                        <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Unofficial Locations</div>
                        {[...unofficialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                          <label key={loc} className="check-item">
                            <input 
                              type="checkbox" 
                              checked={formLocation === loc} 
                              onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                            /> 
                            <span style={{ fontSize: '0.85rem' }}>{loc}</span>
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
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>Garage Spaces</label>
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
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>Warehouses</label>
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
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>Driveway</label>
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
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', margin: 0 }}>Views</label>
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
                {businessCategory === 'General' && (
                  <button className={`action-btn ${formAction === 'Trade' ? 'active' : ''}`} onClick={() => setFormAction('Trade')}>🔄 Trade</button>
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
                    if (e.target.value === 'Family' && formAction === 'Trade') {
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
                    }} className="search-input">
                      <option value="Standard">Standard</option>
                      <option value="Shares">Shares</option>
                      <option value="Control">Control</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {businessModifier !== 'Shares' && (
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
                    /> 
                    {bus}
                  </label>
                ))}
              </div>
            </div>

            {selectedBusiness === 'Plantation' && (
              <div className="form-group">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 150px' }}>
                    <label>Crop Type</label>
                    <input 
                      type="text" 
                      className="search-input"
                      placeholder="e.g. Cabbage"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                    />
                  </div>
                  <div style={{ flex: '1 1 150px' }}>
                    <label>Beds</label>
                    <input 
                      type="text" 
                      className="search-input"
                      placeholder="e.g. 20"
                      value={plantationBeds}
                      onChange={(e) => setPlantationBeds(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
              </div>
            )}

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
                <div className="checklist" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', maxHeight: '250px', overflowY: 'auto', padding: '1.2rem', marginTop: 0, alignContent: 'start' }}>
                  <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Locations</div>
                  {[...officialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                    <label key={loc} className="check-item">
                      <input 
                        type="checkbox" 
                        checked={formLocation === loc} 
                        onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                      /> 
                      <span style={{ fontSize: '0.85rem' }}>{loc}</span>
                    </label>
                  ))}

                  <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1rem', marginBottom: '0.5rem' }}>Unofficial Locations</div>
                  {[...unofficialLocations].sort((a, b) => a.localeCompare(b)).map(loc => (
                    <label key={loc} className="check-item">
                      <input 
                        type="checkbox" 
                        checked={formLocation === loc} 
                        onChange={() => setFormLocation(formLocation === loc ? '' : loc)} 
                      /> 
                      <span style={{ fontSize: '0.85rem' }}>{loc}</span>
                    </label>
                  ))}
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

        {manualCategory !== 'Auto' && manualCategory !== 'Real Estate' && manualCategory !== 'Business' && (
          <div className="input-section">
            <div className="form-group">
              <label>Raw Player Advertisement</label>
              <textarea
                className="ad-input"
                placeholder="Paste the raw text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {manualCategory === 'Auto-Detect' && (
              <button 
                className="btn primary-btn" 
                onClick={handleFormat}
                disabled={!input.trim() || loading}
              >
                {loading ? 'Formatting...' : 'Format Ad'}
              </button>
            )}
          </div>
        )}

        <div className="output-section">
          <div className="output-header">
            <label>Formatted Output</label>
            {category && <span className="badge">{category}</span>}
          </div>
          <div className="output-box">
            {output || <span className="placeholder">Result will appear here...</span>}
          </div>
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
