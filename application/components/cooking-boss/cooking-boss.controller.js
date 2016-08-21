CookingBossController.$inject = ['CookingBossService', '$scope'];
function CookingBossController(CookingBossService, $scope) {
    var vm = this;

    vm.data = [];
    vm.complaints = [];
    vm.myCroppedImage = '';
    vm.myImage = '';
    vm.myCroppedImages = [];
    vm.myImages = [];

    vm.init = init;

    vm.saveImage = saveImage;
    vm.handleFileSelect = handleFileSelect;
    vm.addComment = addComment;

    init();

    function addComment(title, message, parentId, restaurantId) {
        ComplaintService.addComplaintCookBoss({
            title: title,
            text: message,
            parent_id: parentId,
            restaurant_id: restaurantId,
            image: vm.myCroppedImage
        }).then(function () {
            vm.myCroppedImages = [];
            vm.myCroppedImages = [];
            vm.myImage = '';
            vm.myCroppedImage = '';
            if (parentId) {
                Notification.success('Ваш комментарий учтен');
            } else {
                Notification.success(' Вы успешно оставили отзыв')
            }
        });
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

    function saveImage() {
        angular.element('.download-photo-modal-2').modal('hide');
        vm.myCroppedImages.push(vm.myCroppedImage);
    }

    $scope.$on('LastRepeaterElement', function () {
        readMoreComments();
    });

    function init() {
        CookingBossService.getCookingBoss().then(function (data) {
            vm.data = data;
        });
    }

    angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);
}