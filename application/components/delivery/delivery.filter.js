
function DeliveryFilter() {
    return function (filters, deliveries, slider) {
        var strFilterFood = (typeof filters.foods == 'string') ? filters.foods : filters.foods.join();
        var strFilterType = (typeof filters.type_dinners == 'string') ? filters.type_dinners : filters.type_dinners.join();
        var data = [];

        angular.forEach(deliveries, function (value, key) {
            var strFoods = value.filters.foods.join();
            var strTypes = value.filters.types.join();

            if (value.filters.foods.length > 0 && value.filters.types.length > 0) {
                if (strFilterFood == strFoods || strFilterType == strTypes
                    && (value.min_price >= slider.min && value.max_price <= slider.max)) {
                    data.push(value);
                } else if (filters.foods.length == 1 && value.filters.foods.indexOf(parseInt(filters.foods[0])) != -1
                    || filters.type_dinners.length == 1 && value.filters.types.indexOf(parseInt(filters.type_dinners[0])) != -1
                || (value.min_price >= slider.min && value.max_price <= slider.max)) {
                    data.push(value);
                }
            }
        });

        return data;
    }
}