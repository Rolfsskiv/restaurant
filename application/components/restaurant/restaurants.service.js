
RestaurantsService.$inject = ['$http'];
function RestaurantsService($http) {
    var service = this;

    service.getRestaurants = function (datetime) {
        return $http.post(API_URL + '/rest', datetime).then(function (response) {
            var data = response.data;
            return Object.keys(data).map(function (x) {
                return data[x];
            });
        });
    };

    service.getRestaurant = function (slug) {
        return $http.get(API_URL + '/rest/' + slug).then(function (response) {
            return response.data;
        });
    };

    service.reserveRestaurant = function (data, id) {
        return $http.post(API_URL + '/rest/' + id + '/book', data).then(function (response) {
              return response.data;
          });
    };

    service.getRestaurantWhereDate = function (data) {
        return $http.post(API_URL + '/rest', data).then(function (response) {
            return response.data;
        });
    };
    
    service.getRestaurantTime = function (slug, date) {
        return $http.post(API_URL + '/rest-info', {
            slug: slug,
            date: date
        }).then(function (response) {
            return response.data;
        });
    };

    service.getTopRestaurants = function () {
        return $http.get(API_URL + '/top50').then(function (response) {
            var data = response.data;
            return Object.keys(data).map(function (x) {
                return data[x];
            });
        });
    }
}