function tsp_hk(distance_matrix) {
    var numberOfCities = distance_matrix.length;

    if (numberOfCities == 0 || distance_matrix[0].length == 0) {
        return 0;
    }

    var shortestLengthTour = Infinity;
    var cache = {};

    for (var startCity = 0; startCity < numberOfCities; startCity++) {
        var currentTourLength = tsp_hk_rec(Array.from(Array(numberOfCities).keys()).filter(city => city !== startCity), startCity);
        shortestLengthTour = Math.min(shortestLengthTour, currentTourLength);
    }

    function tsp_hk_rec(cities, start) {
        if (cities.length === 1) {
            return distance_matrix[start][cities[0]];
        } else {
            var key = cities.join(',') + ',' + start;
            if (cache[key] !== undefined) {
                return cache[key];
            }

            var minLengthTour = Infinity;
            var newCities = cities.filter(city => city !== start);

            newCities.forEach(city => {
                var currentTourLength = tsp_hk_rec(newCities, city) + distance_matrix[start][city];
                minLengthTour = Math.min(minLengthTour, currentTourLength);
            });

            cache[key] = minLengthTour;
            return minLengthTour;
        }
    }

    return shortestLengthTour;
}
