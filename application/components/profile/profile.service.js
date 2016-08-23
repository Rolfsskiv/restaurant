ProfileService.$inject = ['$http', 'ls'];
function ProfileService($http, ls) {
    var service = this;

    service.getBonusData = function () {
        return $http.get(API_URL + '/user/bonus').then(function (response) {
            return response.data;
        });
    };

    service.getTestimonials = function () {
        return $http.get(API_URL + '/user/testimonials').then(function (response) {
            return response.data;
        });
    };

    service.getOrderFoods = function () {
        return $http.get(API_URL + '/user/order-food').then(function (response) {
            return response.data;
        });
    };

    service.getReservations = function () {
        return $http.get(API_URL + '/user/reservation').then(function (response) {
            return response.data;
        });
    };

    service.getProfile = function () {
        return $http.get(API_URL + '/events').then(function (response) {
            return response.data;
        });
    }
}