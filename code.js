function tspHK(distanceMatrix) {
    if (distanceMatrix.length <= 1) {
        return 0;
    }
    
    const numCities = distanceMatrix.length;
    const memo = Array.from({ length: 1 << numCities }, () => Array(numCities).fill(-1));
    
    const calculateMinDistance = (visited, currentCity) => {
        if (visited === (1 << numCities) - 1) {
            return distanceMatrix[currentCity][0];
        }
        
        if (memo[visited][currentCity] !== -1) {
            return memo[visited][currentCity];
        }
        
        let minDist = Infinity;
        for (let nextCity = 0; nextCity < numCities; nextCity++) {
            const nextCityBit = 1 << nextCity;
            if (!(visited & nextCityBit)) {
                const newVisited = visited | nextCityBit;
                const newDistance = distanceMatrix[currentCity][nextCity] + calculateMinDistance(newVisited, nextCity);
                minDist = Math.min(minDist, newDistance);
            }
        }
        
        memo[visited][currentCity] = minDist;
        return minDist;
    };
    
    const initialVisited = 1; // Start from city 0
    const minDistance = calculateMinDistance(initialVisited, 0);
    
    return minDistance;
}
