
DinnerController.$inject = ['DinnerService', 'ls', '$location'];
function DinnerController(DinnerService, ls, $location) {
    var vm = this;

    vm.dinner = ls.get('currentDinner');
    vm.dinners = [];
    vm.pagination = {
        currentPage: 0,
        pageSize: 10,
        na: function (number) {
            var indexes = [];
            for(var i = 0; i <= number; i++) {
                indexes.push(i);
            }

            if (vm.dinners.length <= vm.pagination.pageSize) {
                return [0];
            } else return indexes;
        },
        getLastPage: function () {
            var pages = vm.pagination.na(vm.pagination.numberOfPages());
            return pages[pages.length - 1];
        },
        numberOfPages: function() {
            return Math.ceil(vm.dinners.length / vm.pagination.pageSize) - 1;
        }
    };

    vm.init = init;
    vm.goToModal = goToModal;
    vm.getCurrent = getCurrent;
    vm.closeModal = closeModal;

    function closeModal() {
        ls.rm('currentDinner');
    }

    function getCurrent() {
        if (ls.get('currentDinner') == null) {
            $location.path('dinner');
        } else {
            vm.dinner = ls.get('currentDinner');
        }
    }

    function goToModal(index) {
        ls.set('currentDinner', vm.dinners[index]);
        $location.path('/modal-restaurant-menu');
    }
    
    function init() {
        DinnerService.getDinners().then(function (dinners) {
            vm.dinners = dinners;
            initDinnerModal();
        });
    }
}