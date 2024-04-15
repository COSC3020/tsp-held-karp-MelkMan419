function tsp_hk(distance_matrix){
    def held_karp_dp(distance_matrix):
        n = len(distance_matrix)
        memo = {}
    
        def held_karp(cities, start):
            if (tuple(cities), start) in memo:
                return memo[(tuple(cities), start)]
    
            if len(cities) == 1:
                return distance_matrix[start][cities[0]]
    
            min_cost = float('inf')
            for city in cities:
                if city == start:
                    continue
                new_cities = tuple([c for c in cities if c != city])
                cost = held_karp(new_cities, city) + distance_matrix[start][city]
                min_cost = min(min_cost, cost)
    
            memo[(tuple(cities), start)] = min_cost
            return min_cost
    
        all_cities = tuple(range(1, n)) 
        return min(held_karp(all_cities, city) + distance_matrix[0][city] for city in all_cities)
}
