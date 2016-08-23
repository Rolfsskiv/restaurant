
IndexController.$inject = ['$controller', 'DinnerService', 'DeliveryService', 'ls', '$filter', 'FilterService', 'RestaurantsService', 'CountriesService', '$scope', 'ComplaintService', 'SpecialProposalService'];
function IndexController($controller, DinnerService, DeliveryService, ls, $filter, FilterService, RestaurantsService, CountriesService, $scope, ComplaintService, SpecialProposalService) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));
    var vm = this;

    vm.countries = [];
    vm.currentCountry = '';
    vm.currentCity = '';
    vm.cities = [];
    vm.dinners = [];
    vm.restaurants = [];
    vm.complaints = [];
    vm.specialProposal = [];
    vm.deliveries = [];
    vm.backDeliveries = [];
    vm.filters = {};
    vm.backRestaurants = [];
    vm.sliderRestaurant = {
        minValue: 20,
        maxValue: 80,
        options: {
            floor: 0,
            ceil: 100,
            translate: function (value) {
                return value + ' €';
            }
        }
    };
    vm.sliderFood = {
        minValue: 20,
        maxValue: 80,
        options: {
            floor: 0,
            ceil: 100,
            translate: function (value) {
                return value + ' €';
            }
        }
    };
    vm.slickConfig = {
        data: vm.complaints,
        initOnLoad: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 1020,
            settings: {
                slidesToShow: 2,
                arrows: false,
                slidesToScroll: 1
            }
        }]
    };
    vm.currentFilters = {
        foods: [],
        features: [],
        types: []
    };
    vm.currentFiltersDinner = {
        foods: [],
        type_dinners: []
    };
    vm.filterDatePerson = {
        countPersons: ls.get('countPerson') == null ? 2 : ls.get('countPerson'),
        date: getDate(),
        time: ''
    };

    vm.init = init;

    $scope.$watch(function () {
        return vm.currentCountry;
    }, function (newValue) {
        if (newValue !== '') {
            angular.forEach(vm.countries, function (val, key) {
               if (newValue == val.id) vm.cities = vm.countries[key].cities;
            });
        }
    });

    $scope.$watchGroup([
        function () {return vm.currentCountry;},
        function () {return vm.currentCity;}
    ], function (newValues) {
        if (newValues[0] != '' || (newValues[0] != '' && newValues[1] != '')) {
            vm.backRestaurants = $filter('whereLocation')(newValues, vm.restaurants);
        }
    });

    $scope.$watch(function () {
        return vm.filterDatePerson.countPersons
    }, function (newValue) {
        if (newValue != null) {
            ls.set('countPerson', newValue);
        }
    });

    $scope.$watch(function () {
        return vm.filterDatePerson;
    }, function (newValues) {
        if (newValues.date !== '' && newValues.time) {
            ls.set('find', {date: newValues.date});
            RestaurantsService.getRestaurantWhereDate({
                date: newValues.date,
                time: newValues.time
            }).then(function (restaurants) {
                vm.backRestaurants = restaurants;
            });
        }
    }, true);

    $scope.$watch(function () {
        return {rest: vm.currentFiltersDinner, slider: vm.sliderFood};
    }, function () {
        if (vm.currentFiltersDinner.foods.length > 0 || vm.currentFiltersDinner.type_dinners.length > 0 || vm.sliderFood) {
            vm.backDeliveries = $filter('deliveryFilter')(
                vm.currentFiltersDinner, vm.deliveries,
                {
                    min: vm.sliderFood.minValue,
                    max: vm.sliderFood.maxValue
                });
        } else {
            vm.backDeliveries = vm.deliveries;
        }
    }, true);

    $scope.$watch(function () {
        return {rest: vm.sliderRestaurant, slider: vm.currentFilters};
    }, function () {
        if (vm.currentFilters.foods.length !== 0 || vm.currentFilters.features.length !== 0 || vm.currentFilters.types.length !== 0 || vm.sliderRestaurant ) {
            vm.backRestaurants = $filter('restaurantFilter')(
                vm.currentFilters, vm.restaurants,
                {
                    min: vm.sliderRestaurant.minValue,
                    max: vm.sliderRestaurant.maxValue
                }
            );
        } else {
            vm.backRestaurants = vm.restaurants;
        }
    }, true);

    function getDate() {
        var date = new Date();

        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1; //Months are zero based

        if (curr_month.toString().length == 1) curr_month = '0' + curr_month.toString();

        var curr_year = date.getFullYear();
        return curr_date + "." + curr_month + "." + curr_year;
    }

    function init() {

        CountriesService.getCountries().then(function (countries) {
            vm.countries = countries;
        });

        RestaurantsService.getRestaurants({date: ls.get('find') == null ? getDate() : ls.get('find').date.replaceAll('/', '.'), time: '00:45'}).then(function (restaurants) {
            vm.restaurants = vm.backRestaurants = restaurants;
        });

        ComplaintService.getComplaints().then(function (complaints) {
            vm.complaints = complaints;
        });

        SpecialProposalService.getSpecialProposal().then(function (specialProposal) {
            vm.specialProposal = specialProposal;
        });

        FilterService.getFilters().then(function (filters) {
            vm.filters = filters;
        });

        DinnerService.getDinners().then(function (dinners) {
            vm.dinners = dinners;
        });

        DeliveryService.getDeliveries().then(function (deliveries) {
            vm.deliveries = vm.backDeliveries = deliveries;
        });

        initIndexPage();
    }
}