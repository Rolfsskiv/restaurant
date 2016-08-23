
function RestaurantFilter() {
    return function (filters, restaurants, slider) {

        var strFilterFood = (typeof filters.foods == 'string') ? filters.foods : filters.foods.join();
        var strFilterType = (typeof filters.types == 'string') ? filters.types : filters.types.join();
        var strFilterFeatures = (typeof filters.features == 'string') ? filters.features : filters.features.join();
        var data = [];

        angular.forEach(restaurants, function (value, key) {
            var strFoods = value.filters.foods.join();
            var strTypes = value.filters.types.join();
            var strFeatures = value.filters.features.join();

            if (value.filters.foods.length > 0 && value.filters.features.length > 0 && value.filters.types.length > 0) {
                if (strFilterFood == strFoods && strFilterFeatures == strFeatures && strFilterType == strTypes
                    && (value.min_price >= slider.min && value.max_price <= slider.max)) {
                    data.push(value);
                } else if (filters.foods.length == 1 && value.filters.foods.indexOf(parseInt(filters.foods[0])) != -1
                    || filters.types.length == 1 && value.filters.types.indexOf(parseInt(filters.types[0])) != -1
                    || filters.features.length == 1 && value.filters.features.indexOf(parseInt(filters.features[0])) != -1
                    || (value.min_price >= slider.min && value.max_price <= slider.max)) {
                    data.push(value);
                }
            }
        });

        return data;
    }
}