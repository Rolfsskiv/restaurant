
function PaginationService() {
    var service = this;

    service.init = function (dataLength, pageSize) {
        return {
            currentPage: 0,
            na: function (number) {
                var indexes = [];
                for(var i = 0; i <= number; i++) {
                    indexes.push(i);
                }

                if (dataLength <= pageSize) {
                    return [0];
                } else return indexes;
            },
            getLastPage: function () {
                var pages = vm.pagination.na(vm.pagination.numberOfPages());
                return pages[pages.length - 1];
            },
            numberOfPages: function() {
                return Math.ceil(vm.complaints.length / vm.pagination.pageSize) - 1;
            }
        }
    };
}