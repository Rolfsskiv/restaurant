
PersonDirective.$inject = ['$parse'];
function PersonDirective($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.selectpicker($parse(attrs.selectpicker)());
            element.selectpicker('refresh');

            scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                $('.count-people-table table td').removeClass();
                $(".count-people-table table td[data-value='" + newVal + "']").toggleClass('active');
                scope.$parent[attrs.ngModel] = newVal;
                scope.$evalAsync(function () {
                    if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
                    element.selectpicker('refresh');
                });
            });

            scope.$on('$destroy', function () {
                scope.$evalAsync(function () {
                    element.selectpicker('destroy');
                });
            });
        }
    };
}