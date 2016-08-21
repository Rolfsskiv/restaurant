
SpecialProposalController.$inject = ['SpecialProposalService', '$routeParams'];
function SpecialProposalController(SpecialProposalService, $routeParams) {
    var vm = this;

    vm.special = {};
    vm.specials = [];
    vm.slickConfig = {
        data: vm.special,
        initOnLoad: true,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
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
            for(var i = 0; i <= number; i++) {
                indexes.push(i);
            }

            if (vm.specials.length <= vm.pagination.pageSize) {
                return [0];
            } else return indexes;
        },
        getLastPage: function () {
            var pages = vm.pagination.na(vm.pagination.numberOfPages());
            return pages[pages.length - 1];
        },
        numberOfPages: function() {
            return Math.ceil(vm.specials.length / vm.pagination.pageSize) - 1;
        }
    };
    
    vm.init = init;
    vm.numberOfPages = numberOfPages;

    function numberOfPages() {
        return Math.ceil(vm.specials.length / vm.pagination.pageSize);
    }
    
    function init() {
        if ($routeParams.id) {
            SpecialProposalService.getSpecial($routeParams.id).then(function (special) {
                vm.special = special;
            });
        } else {
            SpecialProposalService.getSpecialProposal().then(function (specials) {
                vm.specials = specials;
            });
        }
    }
}