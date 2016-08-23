
DeliveryController.$inject = ['$controller', '$filter', 'Notification', '$scope', 'DeliveryService', 'FilterService', '$routeParams', 'CartService', 'ComplaintService'];
function DeliveryController($controller, $filter, Notification, $scope, DeliveryService, FilterService, $routeParams, CartService, ComplaintService) {

    angular.extend(this, $controller('BaseController', {$scope: $scope}));

    var vm = this;

    vm.menus = [];
    vm.cart = CartService;
    vm.deliveries = [];
    vm.backDeliveries = [];
    vm.deliveryComplaints = [];
    vm.daysName = [1470042010000,1470128410000,1470214810000,1470301210000,1470387610000,1470474010000,1470560410000];
    vm.filters = {};
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
    vm.currentFilters = {
        foods: [],
        type_dinners: []
    };
    vm.pagination = {
        currentPage: 0,
        pageSize: 10,
        na: function (number) {
            var indexes = [];
            for(var i = 0; i <= number; i++) {
                indexes.push(i);
            }

            if (vm.deliveries.length <= vm.pagination.pageSize) {
                return [0];
            } else return indexes;
        },
        getLastPage: function () {
            var pages = vm.pagination.na(vm.pagination.numberOfPages());
            return pages[pages.length - 1];
        },
        numberOfPages: function() {
            return Math.ceil(vm.deliveries.length / vm.pagination.pageSize) - 1;
        }
    };
    vm.rating = {
        general: 0,
        interior: 0,
        service: 0,
        dinner: 0
    };

    vm.init = init;
    vm.isArray = angular.isArray;
    vm.addComment = addComment;

    $scope.$watch(function () {
        return {rest: vm.currentFilters, slider: vm.sliderFood};
    }, function () {
        if (vm.currentFilters.foods.length > 0 || vm.currentFilters.type_dinners.length > 0 || vm.sliderRestaurant) {
            vm.backDeliveries = $filter('deliveryFilter')(
                vm.currentFilters, vm.deliveries,
                {
                    min: vm.sliderRestaurant.minValue,
                    max: vm.sliderRestaurant.maxValue
                });
        } else {
            vm.backDeliveries = vm.deliveries;
        }
    }, true);

    $scope.$on('LastRepeaterElement', function () {
        readMoreComments();
        setTimeout(function () {
            initIndexPage();
        }, 200);
    });

    function addComment(title, message, id) {
        ComplaintService.addComplaintDelivery({
            title: title,
            text: message,
            parent_id: null,
            rating: vm.rating
        }, id).then(function (response) {
            if (response.status == 200) {
                Notification.success(' Вы успешно оставили отзыв');
                vm.deliveryComplaints.push(response.data);
            }
        });
    }

    function init() {
        if ($routeParams.slug) {
            DeliveryService.getMenus($routeParams.slug).then(function (menus) {
                vm.menus = menus;

                ComplaintService.getComplaintsDelivery($routeParams.slug).then(function (complaints) {
                    vm.deliveryComplaints = complaints;
                });

                initModalCartCheckout();
                initListStructure();
            });
        } else {
            DeliveryService.getDeliveries().then(function (deliveries) {
                vm.deliveries = vm.backDeliveries = deliveries;
            });

            FilterService.getFilters().then(function (filters) {
                vm.filters = filters;
            });
        }
    }
}