
AuthService.$inject = ['$auth', '$location', 'ls'];
function AuthService($auth, $location, ls) {
    var service = this;

    service.isAuth = function () {
        return $auth.isAuthenticated();
    };

    service.getLink = function () {
        var link = '';
        if (ls.get('user').user == 'user') {
            link = 'my-profile';
        } else if (ls.get('user').user == 'rest') {
            link = 'rest-reservation';
        }

        return link;
    };

    service.logout = function () {
        $auth.logout();
        $location.path('/');
    }
}