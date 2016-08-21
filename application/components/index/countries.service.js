
CountriesService.$inject = ['$http'];
function CountriesService($http) {
    var service = this;

    service.getCountries = function () {
        return $http.get(API_URL + '/countries').then(function (responseLang) {
            return responseLang.data;
        });
    }
}