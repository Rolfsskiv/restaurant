
InformationController.$inject = ['RestaurantProfileService'];
function InformationController(Rest) {
    var vm = this;

    vm.data = {};

    vm.save = save;

    function save() {
        console.log(vm.data);
    }
}