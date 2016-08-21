
RegistrationController.$inject = ['CountriesService', '$scope', '$auth'];
function RegistrationController(CountriesService, $scope, $auth) {
    var vm = this;

    vm.currentCity = '';
    vm.cities = [];
    vm.countries = [];
    
    vm.data = {
        user: 'user'
    };

    vm.init = init;
    vm.newRestaurant = newRestaurant;
    vm.newUser = newUser;
    vm.setType = setType;
    vm.newData = newData;

    $scope.$watch(function () {
        return vm.data.country_id;
    }, function (newValue) {
        if (newValue !== '') {
            angular.forEach(vm.countries, function (val, key) {
                if (newValue == val.id) {
                    vm.cities = vm.countries[key].cities;
                }
            });
        }
    });

    function newData() {
        if (vm.data.user == 'user') {
            vm.newUser();
        } else {
            vm.newRestaurant();
        }
    }

    function setType(type) {
        vm.data.user = type;
    }

    function newUser() {
        $auth.signup(vm.data).then(function (response) {
            console.log(response);
        });
    }

    function newRestaurant() {
        $auth.signup(vm.data).then(function (response) {
            console.log(response);
        });
    }
    
    function init() {
        CountriesService.getCountries().then(function (countries) {
            vm.countries = countries;
        });
    }
}