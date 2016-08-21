
FilterService.$inject = ['$http', 'ls', '$q'];
function FilterService($http, ls, $q) {
    var service = this;

    service.getFilters = function () {
        if (ls.get('filters') == null) {
            return $http.get(API_URL + '/filters').then(function (response) {
                ls.set('filters', response.data);
                return response.data;
            });
        } else {
            var deferred = $q.defer();
            deferred.resolve(ls.get('filters'));
            return deferred.promise;
        }
    }
}