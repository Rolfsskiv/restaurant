ComplaintController.$inject = ['ComplaintService', '$scope', 'Notification'];
function ComplaintController(ComplaintService, $scope, Notification) {
    var vm = this;

    vm.complaints = [];
    vm.myCroppedImage = '';
    vm.myImage = '';
    vm.myCroppedImages = [];
    vm.myImages = [];
    vm.slickConfig = {
        initOnLoad: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 1020,
            settings: {
                slidesToShow: 2,
                arrows: false,
                slidesToScroll: 1
            }
        }]
    };
    vm.pagination = {
        currentPage: 0,
        pageSize: 5,
        na: function (number) {
            var indexes = [];
            for (var i = 0; i <= number; i++) {
                indexes.push(i);
            }

            if (vm.complaints.length <= vm.pagination.pageSize) {
                return [0];
            } else return indexes;
        },
        getLastPage: function () {
            var pages = vm.pagination.na(vm.pagination.numberOfPages());
            return pages[pages.length - 1];
        },
        numberOfPages: function () {
            return Math.ceil(vm.complaints.length / vm.pagination.pageSize) - 1;
        }
    };

    vm.saveImage = saveImage;
    vm.handleFileSelect = handleFileSelect;
    vm.addComment = addComment;

    init();

    $scope.$on('LastRepeaterElement', function () {
        setTimeout(function () {
            readMoreComments();
        }, 200);
    });

    function addComment(title, message, parentId) {
        console.log(vm.myCroppedImages);
        ComplaintService.addComplaint({
            title: title,
            text: message,
            parent_id: parentId,
            image: vm.myCroppedImages
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
        ComplaintService.getComplaints().then(function (complaints) {
            vm.complaints = complaints;
        });
    }

    angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);
}