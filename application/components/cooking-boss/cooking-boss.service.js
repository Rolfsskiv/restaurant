
CookingBossService.$inject = ['$http'];
function CookingBossService($http) {
    var service = this;

    service.getCookingBoss = function () {
        return $http.get(API_URL + '/cooking-boss').then(function (response) {
            return response.data;
        });
    }
}