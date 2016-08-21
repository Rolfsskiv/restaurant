
DeliveryService.$inject = ['$http'];
function DeliveryService($http) {
    var service = this;

    service.getDeliveries = function () {
        return $http.get(API_URL + '/delivery').then(function (response) {
            return response.data;
        });
    };

    service.getMenus = function (slug) {
        return $http.get(API_URL + '/delivery/' + slug).then(function (response) {
            return response.data;
        });
    }
}