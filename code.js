function tsp_hk(distance_matrix) {
    var NUMCities = distance_matrix.length;

    // Check for trivial cases with empty or singular matrix
    if (NUMCities === 0 || distance_matrix[0].length === 0) {
        return 0;
    }
    
    var shortestLengthTour = Infinity;
    var cache = {};

    for (var startCity = 0; startCity < NUMCities; startCity++) {
        var currentTourLength = tsp_hk_rec(Array.from(Array(NUMCities).keys()).filter(city => city !== startCity), startCity, startCity);
        shortestLengthTour = Math.min(shortestLengthTour, currentTourLength);
    }

    function tsp_hk_rec(cities, currentCity, startCity) {
        if (cities.length === 0) {
            return distance_matrix[currentCity][startCity];  // Complete the cycle
        }
        
        var key = cities.join(',') + ',' + currentCity;
        if (cache[key] !== undefined) {
            return cache[key];
        }

        var minLengthTour = Infinity;
        cities.forEach(nextCity => {
            var remainingCities = cities.filter(city => city !== nextCity);
            var currentTourLength = distance_matrix[currentCity][nextCity] + tsp_hk_rec(remainingCities, nextCity, startCity);
            minLengthTour = Math.min(minLengthTour, currentTourLength);
        });

        cache[key] = minLengthTour;
        return minLengthTour;
    }

    return shortestLengthTour;
}
