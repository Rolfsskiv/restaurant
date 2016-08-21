
CartController.$inject = ['CartService', '$routeParams'];
function CartController(CartService, $routeParams) {
    var vm = this;

    vm.cart = CartService;
    vm.restaurantId = ($routeParams.restaurantId) ? $routeParams.restaurantId : null;
}