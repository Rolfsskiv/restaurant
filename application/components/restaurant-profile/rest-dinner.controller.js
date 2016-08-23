
RestDinnerController.$inject = ['$scope'];
function RestDinnerController($scope) {
    var vm = this;

    vm.dinners = [];
    vm.data = {
        images: []
    };
    vm.myCroppedImage = '';
    vm.myImage = '';

    vm.init = init;
    vm.add = add;
    vm.saveImage = saveImage;
    vm.handleFileSelect = handleFileSelect;
    vm.removeImage = removeImage;
    vm.removeDinner = removeDinner;
    vm.editDinner = editDinner;

    function editDinner(id) {
        vm.data = vm.dinners[id];
    }
    
    function removeDinner(id) {
        vm.dinners.splice(id, 1);
    }

    function removeImage(id) {
        vm.data.images.splice(id, 1);
    }

    function saveImage() {
        angular.element('.download-photo-modal-2').modal('hide');
        vm.data.images.push(vm.myCroppedImage);
    }

    function handleFileSelect(evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function () {
                vm.myImage = evt.target.result;
                angular.element('.download-photo-modal').modal('hide');
                angular.element('.download-photo-modal-2').modal('show');
            });
        };
        reader.readAsDataURL(file);
    }

    function init() {
        angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);
    }

    function add() {
        console.log(vm.data);
        vm.data = {images: []};
    }

}