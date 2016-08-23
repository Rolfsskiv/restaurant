
AuthService.$inject = ['$auth', '$location', 'ls', '$http', '$q'];
function AuthService($auth, $location, ls, $http, $q) {
    var service = this;

    service.ROLES = {
        SUPER_ADMIN: 1,
        ADMIN: 2,
        RESTAURANT: 3,
        USER: 4
    };

    service.getUser = function () {
        return ls.get('user');
    };

    service.isAuth = function () {
        return $auth.isAuthenticated();
    };

    service.getLink = function () {

        var link = 'my-profile';

        switch (ls.get('user').role.id) {
            case service.ROLES.ADMIN:
                link = 'rest-reservation';
                break;
            case service.ROLES.USER:
                link = 'my-profile';
                break;
        }

        return link;
    };

    service.logout = function () {
        $auth.logout();
        ls.rm('user');
        $location.path('/');
    }
}