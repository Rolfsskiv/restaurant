RestaurantController.$inject = ['$controller', 'ComplaintService', '$routeParams', 'RestaurantsService', 'ls', '$scope', '$filter', 'FilterService', 'Notification'];
function RestaurantController($controller, ComplaintService, $routeParams, RestaurantsService, ls, $scope, $filter, FilterService, Notification) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    var vm = this;

    vm.restaurant = null;
    vm.restaurantTimes = [];
    vm.restaurants = [];
    vm.restaurantComplaints = [];
    vm.backRestaurants = [];
    vm.filters = {};
    vm.currentFilters = {
        foods: [],
        features: [],
        types: []
    };
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
    vm.daysName = [1470042010000,1470128410000,1470214810000,1470301210000,1470387610000,1470474010000,1470560410000];
    vm.find = {
        time: ls.get('find') == null ? null : ls.get('find').time,
        date: ls.get('find') == null ? null : ls.get('find').date.replaceAll('/', '.'),
        count_person: ls.get('find') == null ? null : ls.get('find').count_person,
        discount: ls.get('find') == null ? null : ls.get('find').discount,
        restaurantId: null
    };
    vm.pagination = {
        currentPage: 0,
        pageSize: 5,
        na: function (number) {
            var indexes = [];
            for(var i = 0; i <= number; i++) {
                indexes.push(i);
            }

            if (vm.restaurants.length <= vm.pagination.pageSize) {
                return [0];
            } else return indexes;
        },
        getLastPage: function () {
            var pages = vm.pagination.na(vm.pagination.numberOfPages());
            return pages[pages.length - 1];
        },
        numberOfPages: function() {
            return Math.ceil(vm.restaurants.length / vm.pagination.pageSize) - 1;
        }
    };
    vm.timeInit = false;

    vm.reserveRestaurant = reserveRestaurant;
    vm.personChange = personChange;
    vm.getDate = getDate;
    vm.setTime = setTime;
    vm.addComment = addComment;
    vm.inlineDatePicker = inlineDatePicker;

    init();

    $scope.$on('LastRepeaterElement', function () {
        vm.timeInit = true;
        initRestaurantCard();
    });

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

    $scope.$watch(function () {
        return vm.find.date;
    }, function (newVal) {
        if (vm.restaurant != null) {
            RestaurantsService.getRestaurantTime(vm.restaurant.slug, newVal.replaceAll('/', '.')).then(function (times) {
                vm.restaurantTimes = times;
            });
        }
    });

    $scope.$watch(function () {
        return {find: vm.find, time: vm.restaurantTimes, timeInit: vm.timeInit};
    }, function (newValue) {
        if (newValue.find.time != '' && vm.restaurantTimes.length > 0 && vm.timeInit) {
            angular.forEach(vm.restaurantTimes, function (time, index) {
                if (newValue.find.time == time.time) {
                   vm.setTime(null, index);
                }
            });
        }
        vm.find.time = newValue.find.time;
        ls.set('find', vm.find);
        vm.personChange(newValue.find.count_person);
    }, true);

    function inlineDatePicker() {
        initInlineDateTimePicker();
    }

    function addComment(title, message, id) {
        ComplaintService.addComplaintRestaurant({
            title: title,
            text: message,
            parent_id: null,
            rating: vm.rating
        }, id).then(function (response) {
            if (response.status == 200) {
                Notification.success(' Вы успешно оставили отзыв');
                vm.restaurantComplaints.push(response.data);
            }
        });
    }

    function setTime(event, ind) {
        angular.forEach(document.querySelectorAll('.row-sh > .cell-sh'), function (value, index) {
            value.classList.remove('active-cell-sh')
        });
        if (event) {
            event.currentTarget.classList.add('active-cell-sh');
        } else {
            if (document.querySelector('.active-cell-sh')) {
                document.querySelector('.active-cell-sh').classList.remove('active-cell-sh')
            } else {
                document.querySelector('[data-time="' + ind + '"]').classList.add('active-cell-sh');
            }
        }
        vm.find.time = vm.restaurantTimes[ind].time;
        vm.find.discount = vm.restaurantTimes[ind].value;
    }

    function getDate() {
        var date = new Date();

        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1; //Months are zero based

        if (curr_month.toString().length == 1) curr_month = '0' + curr_month.toString();

        var curr_year = date.getFullYear();
        return curr_date + "." + curr_month + "." + curr_year;
    }

    function personChange(countPerson) {
        vm.find.count_person = countPerson;
    }

    function reserveRestaurant() {
        ls.set('find', vm.find);

        RestaurantsService.reserveRestaurant(ls.get('find'), vm.restaurant.id).then(function (message) {
            Notification.success(message);
            ls.rm('find');
        });
    }

    function init() {
        if ($routeParams.slug) {
            RestaurantsService.getRestaurant($routeParams.slug).then(function (restaurant) {
                vm.restaurant = restaurant;
                vm.find.restaurantId = vm.restaurant.id;

                RestaurantsService.getRestaurantTime(vm.restaurant.slug, ls.get('find').date.replaceAll('/', '.')).then(function (times) {
                    vm.restaurantTimes = times;
                });

                ComplaintService.getComplaintsRestaurant($routeParams.slug).then(function (complaints) {
                   vm.restaurantComplaints = complaints;
                });

                ls.set('find', {
                    time: null,
                    date: getDate(),
                    count_person: ls.get('find').count_person
                });

                initRestaurantCard();
                readMoreComments();
            });

        } else {
            RestaurantsService.getRestaurants({date: ls.get('find') == null ? getDate() : ls.get('find').date.replaceAll('/', '.'), time: '00:45'}).then(function (restaurants) {
                vm.restaurants = vm.backRestaurants = Object.keys(restaurants).map(function (x) {
                    return restaurants[x];
                });
            });

            FilterService.getFilters().then(function (filters) {
                vm.filters = filters;
            });
        }

        initIndexPage();
    }

}