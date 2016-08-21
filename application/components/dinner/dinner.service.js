
DinnerService.$inject = ['$http'];
function DinnerService($http) {
    var service = this;

    service.getDinners = function () {
        return $http.get(API_URL + '/dinner').then(function (response) {
            return response.data;
        });
    }
}