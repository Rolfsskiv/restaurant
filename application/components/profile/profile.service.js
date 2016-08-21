
ProfileService.$inject = ['$http', 'ls'];
function ProfileService($http, ls) {
    var service = this;

    service.getCountBonuses = function () {

    };

    service.getBonusData = function () {

    };

    service.getTestimonials = function () {

    };

    service.getOrderFoods = function () {

    };

    service.getReservations = function () {

    };

    service.getUser = function () {
        if (ls.get('user') == null) {
            //return $http
        } else {
            var deferred = $q.defer();
            deferred.resolve(ls.get('user'));
            return deferred.promise;
        }
    }
}