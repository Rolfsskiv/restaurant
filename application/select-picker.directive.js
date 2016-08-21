SelectPickerDirective.$inject = ['$parse'];
function SelectPickerDirective($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.selectpicker($parse(attrs.selectpicker)());
            element.selectpicker('refresh');
            element.hide();

            scope.$watch(function () {
                return attrs.change;
            }, function (newVal, oldVal) {
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