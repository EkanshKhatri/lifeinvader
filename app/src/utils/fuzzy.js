export function levenshteinDistance(a, b) {
    const matrix = [];
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            let cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // insertion
                matrix[i][j - 1] + 1, // deletion
                matrix[i - 1][j - 1] + cost // substitution
            );
            
            // Transposition
            if (i > 1 && j > 1 && b.charAt(i - 1) === a.charAt(j - 2) && b.charAt(i - 2) === a.charAt(j - 1)) {
                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
            }
        }
    }
    return matrix[b.length][a.length];
}

function tokenDistance(userToken, itemToken) {
    if (userToken === itemToken) return 0;
    
    let dist = levenshteinDistance(userToken, itemToken);
    
    // Strict threshold: short words must be exact.
    // 1-4 chars: 0 typos
    // 5-7 chars: 1 typo
    // 8+ chars: 2 typos
    let maxAllowed = itemToken.length <= 4 ? 0 : (itemToken.length <= 7 ? 1 : 2);
    
    if (dist <= maxAllowed) {
        // Strong heuristic: Most typos preserve the first letter. 
        if (userToken[0] !== itemToken[0]) {
            if (itemToken.length < 6 || dist > 1) return Infinity;
        }
        return dist;
    }
    
    return Infinity;
}

export function findFuzzyMatchInText(text, list) {
    let textTokens = text.toLowerCase().split(/[\s,.-]+/);
    let bestMatch = null;
    let bestDistance = Infinity;
    let bestOriginalText = "";

    for (let item of list) {
        // Strip parentheses from item for fuzzy matching (e.g. "Ubermacht M3 (G80)" -> "Ubermacht M3 G80")
        let cleanItem = item.toLowerCase().replace(/[()]/g, '');
        let itemTokens = cleanItem.split(/[\s,.-]+/);
        
        // Sliding window over text tokens
        for (let i = 0; i <= textTokens.length - itemTokens.length; i++) {
            let currentDist = 0;
            let valid = true;
            
            for (let j = 0; j < itemTokens.length; j++) {
                let uToken = textTokens[i + j];
                let iToken = itemTokens[j];
                
                let dist = tokenDistance(uToken, iToken);
                if (dist === Infinity) {
                    valid = false;
                    break;
                }
                currentDist += dist;
            }
            
            if (valid && currentDist < bestDistance) {
                bestDistance = currentDist;
                bestMatch = item;
                // Reconstruct the matched string from the original text (approximate)
                bestOriginalText = textTokens.slice(i, i + itemTokens.length).join(' ');
            }
        }
    }
    
    if (bestMatch) {
        return { item: bestMatch, matchedTokens: bestOriginalText };
    }
    return null;
}

export function fuzzyReplaceAll(text, list, wrapInQuotes = false, dangerousWords = []) {
    let replacedText = text;
    let textTokens = replacedText.toLowerCase().split(/([\s,.-]+)/);

    for (let item of list) {
        if (!item || typeof item !== 'string') continue;
        let cleanItem = item.toLowerCase().replace(/[()"]/g, '');
        let itemTokens = cleanItem.split(/[\s,.-]+/).filter(t => t.length > 0);
        
        if (itemTokens.length === 0) continue;

        let matchStartIndex = -1;
        let matchTokensCount = 0;
        
        for (let i = 0; i <= textTokens.length - (itemTokens.length * 2 - 1); i += 2) {
            let valid = true;
            
            for (let j = 0; j < itemTokens.length; j++) {
                let uToken = textTokens[i + (j * 2)];
                let iToken = itemTokens[j];
                
                if (dangerousWords.includes(uToken)) {
                    valid = false;
                    break;
                }
                
                let dist = tokenDistance(uToken, iToken);
                if (dist === Infinity) {
                    valid = false;
                    break;
                }
            }
            
            if (valid) {
                matchStartIndex = i;
                matchTokensCount = itemTokens.length * 2 - 1;
                break;
            }
        }
        
        if (matchStartIndex !== -1) {
            let replacement = wrapInQuotes ? `"${item}"` : item;
            textTokens.splice(matchStartIndex, matchTokensCount, replacement);
            replacedText = textTokens.join('');
        }
    }
    return replacedText;
}
