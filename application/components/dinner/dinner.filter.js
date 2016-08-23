
function DinnerFilter() {
    return function (filter, dinners) {
        var data = [];
        var nowDate = new Date();

        angular.forEach(dinners, function (dinner, index) {
            var dinnerDate = new Date(dinner.dinner_date);
            switch (filter) {
                case 'day':
                    if (dinnerDate.getYear() == nowDate.getYear()
                        && dinnerDate.getDate() == nowDate.getDate()
                        && dinnerDate.getMonth() == nowDate.getMonth()) {
                    data.push(dinner);
                    }
                    break;
                case 'week':
                    if (dinnerDate > nowDate && dinnerDate < nowDate.getDate() + 7) {
                        data.push(dinner);
                    }
                    break;

                default:
                    var pDate = filter.replaceAll('.', '/').split('/');
                    var selectedDate = new Date(pDate[1] + '/' + pDate[0] + '/' + pDate[2]);
                    if (dinnerDate.getYear() == selectedDate.getYear()
                        && dinnerDate.getDate() == selectedDate.getDate()
                        && dinnerDate.getMonth() == selectedDate.getMonth()) {
                        data.push(dinner);
                    }
                    break;
            }
        });

        return data;
    }
}