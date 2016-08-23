
RestaurantProfileService.$inject = ['$http'];
function RestaurantProfileService($http) {
    var service = this;

    service.api = API_URL + '/restaurant';

    service.getReservations = function () {
        return $http.get(service.api).then(function (response) {
            return response.data;
        });
    };

    service.setReservationStatus = function (id) {
        return $http.put(service.api + '/reservation/status/' + id).then(function (response) {
            return response.data;
        });
    };

    service.getInformation = function () {
        return $http.get(service.api + '/information').then(function (response) {
            return response.data;
        });
    };

    service.setInformation = function () {
        return $http.put(service.api + '/information').then(function (response) {
            return response.data;
        });
    };

    service.getDeliveryFood = function () {
        return $http.get(service.api + '/delivery-food').then(function (response) {
            return response.data;
        });
    };

    service.setDeliveryFoodStatus = function (id) {
        return $http.get(service.api + '/delivery-food/status/' + id).then(function (response) {
            return response.data;
        });
    };

    service.getMap = function () {
        return $http.get(service.api + '/map').then(function (response) {
            return response.data;
        });
    };

    service.getPhotos = function () {
        return $http.get(service.api + '/photo').then(function (response) {
            return response.data;
        });
    };

    service.uploadPhotos = function () {
        return $http.get(service.api + '/photo/upload').then(function (response) {
            return response.data;
        });
    };
}