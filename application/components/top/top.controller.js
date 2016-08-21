
TopRestaurantController.$inject = ['RestaurantsService', 'ComplaintService'];
function TopRestaurantController(RestaurantsService, ComplaintService) {
    var vm = this;

    vm.restaurants = [];

    vm.init = init;
    vm.style = style;

    vm.init();

    function style(url) {
        return 'background: url(' + url + ') no-repeat center center;background-size: cover;';
    }

    function init() {
        RestaurantsService.getTopRestaurants().then(function (tops) {
            vm.restaurants = tops;
        });
    }
}