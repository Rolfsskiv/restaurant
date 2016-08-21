
ProfileController.$inject = ['ProfileService', '$route', 'ComplaintService'];
function ProfileController(ProfileService, $route, ComplaintService) {
    var vm = this;
    
    vm.ps = ProfileService;
    vm.user = {};
    vm.myCroppedImage = '';
    vm.myImage = '';
    vm.routeName = null;
    vm.bonus = {};
    vm.reservations = [];
    vm.orderFoods = [];
    vm.testimonials = [];
    vm.rating = {
        general: 0,
        interior: 0,
        service: 0,
        dinner: 0
    };
    
    vm.init = init;
    vm.saveImage = saveImage;
    vm.handleFileSelect = handleFileSelect;
    vm.userUpdate = userUpdate;
    vm.orderFoodProblem = orderFoodProblem;
    vm.orderFoodReceived = orderFoodReceived;
    vm.cancelReserveRestaurant = cancelReserveRestaurant;
    
    function cancelReserveRestaurant() {
        
    }

    function orderFoodReceived() {
        
    }
    
    function orderFoodProblem(id) {

    }

    function userUpdate() {

    }

    function saveImage() {
        angular.element('.download-photo-modal-2').modal('hide');
        vm.myCroppedImages.push(vm.myCroppedImage);
    }

    function handleFileSelect(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function () {
                vm.myImages.push(evt.target.result);
                vm.myImage = evt.target.result;
                angular.element('.download-photo-modal').modal('hide');
                angular.element('.download-photo-modal-2').modal('show');
            });
        };
        reader.readAsDataURL(file);
    }

    function init() {
        vm.routeName = $route.current.name;
        /*vm.ps.getUser().then(function (user) {
            vm.user = user;
        });*/

        switch ($route.current.name) {
            case 'profile':

                break;

            case 'information':

                break;

            case 'bonus':

                break;

            case 'reservation':

                break;

            case 'order-food':

                break;

            case 'testimonials':
                userProfileInitComplaints();
                break;
        }
    }

    angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);
}