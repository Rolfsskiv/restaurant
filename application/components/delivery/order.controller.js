
OrderController.$inject = ['ls', '$scope', '$routeParams', 'CartService', '$http', 'ProfileService'];
function OrderController(ls, $scope, $routeParams, CartService, $http, ProfileService) {
    var vm = this;

    vm.order = ls.get('order');
    vm.restaurantId = $routeParams.restaurantId;
    vm.cart = CartService;
    vm.phoneCode = '';
    vm.gifts = null;
    
    vm.send = send;
    vm.checkCode = checkCode;
    vm.init = init;

    vm.init();

    function init() {
        ProfileService.getBonusData().then(function (gifts) {
            vm.gifts = gifts;
        });
    }

    function checkCode(phoneCode) {
        if (vm.phoneCode == phoneCode) {
            angular.element('.successful-order2').modal('show');
        } else {
            angular.element('.uncorrect-number').modal('show');
        }
    }

    function send() {
        var cart = vm.cart.getCart(vm.restaurantId);

        console.log(cart);

        /*$http.post(API_URL + '/delivery/' + vm.restaurantId + '/order', {
            cart: cart,
            order: vm.order
        }).then(function (response) {
            if (response.status == 200) {
                console.log(response);
            }
        });*/
    }

    $scope.$watch(function () {
        return vm.order;
    }, function () {
        ls.set('order', vm.order);
    }, true);

    initOrderSelects();
    initModalCartCheckout();
}