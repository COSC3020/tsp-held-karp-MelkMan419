function tsp_hk(distance_matrix) {
    if (distance_matrix == null || distance_matrix.length === 0) {
        return 0;
    }

    const n = distance_matrix.length;
    const memo = new Map();

    function heldKarp(cities, start) {
        if (memo.has(cities.toString())) {
            return memo.get(cities.toString());
        }

        if (cities.length === 2) {
            const otherCity = cities.find(city => city !== start);
            return distance_matrix[start][otherCity];
        }

        let minDist = Infinity;
        for (let city of cities) {
            if (city !== start) {
                const newCities = cities.filter(c => c !== start);
                const dist = heldKarp(newCities, city) + distance_matrix[start][city];
                minDist = Math.min(minDist, dist);
            }
        }

        memo.set(cities.toString(), minDist);
        return minDist;
    }

    let cities = [];
    for (let i = 0; i < n; i++) {
        cities.push(i);
    }

    let minTourLength = Infinity;
    for (let startCity of cities) {
        const newCities = cities.filter(city => city !== startCity);
        const tourLength = heldKarp(newCities, startCity);
        minTourLength = Math.min(minTourLength, tourLength);
    }

    return minTourLength;
}
