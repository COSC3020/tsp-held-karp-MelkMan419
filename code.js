function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    const ALL_SET_MASK = (1 << n) - 1;
    const memo = new Array(n).fill(null).map(() => new Array(1 << n).fill(-1));

    function heldKarp(city, visited) {
        if (visited === ALL_SET_MASK) {
            return distance_matrix[city][0];
        }

        if (memo[city][visited] !== -1) {
            return memo[city][visited];
        }

        let minCost = Infinity;
        for (let nextCity = 0; nextCity < n; nextCity++) {
            if ((visited & (1 << nextCity)) === 0) {
                const newCost = distance_matrix[city][nextCity] + heldKarp(nextCity, visited | (1 << nextCity));
                minCost = Math.min(minCost, newCost);
            }
        }

        memo[city][visited] = minCost;
        return minCost;
    }

    let result = heldKarp(0, 1); // Start with city 0 (assuming city 0 is the start city)
    return isFinite(result) ? result : Infinity;
}
