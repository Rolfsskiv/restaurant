
PhotoController.$inject = ['$scope'];
function PhotoController($scope) {
    var vm = this;

    vm.imagesRestaurant = {
        mainPhoto: '',
        mainPhotoCropped: '',
        images: []
    };

    vm.saveRestaurantImage = saveRestaurantImage;
    vm.handleFileSelect = handleFileSelect;
    vm.init = init;

    function init() {
        angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);
        angular.element(document.querySelector('#fileInput1')).on('change', vm.handleFileSelect);
    }

    function saveRestaurantImage() {
        angular.element('.download-photo-modal-2').modal('hide');
        vm.data.images.push(vm.myCroppedImage);
    }

    function handleFileSelect(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function () {
                switch (evt.currentTarget.id) {
                    case 'fileInput':

                        break;

                    case 'fileInput1':

                        break;
                }

                vm.myImage = evt.target.result;
                angular.element('.download-photo-modal').modal('hide');
                angular.element('.download-photo-modal-2').modal('show');
            });
        };
        reader.readAsDataURL(file);
    }
}