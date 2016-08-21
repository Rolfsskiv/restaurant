
LangService.$inject = ['$http'];
function LangService($http) {
    var sr = this;

    sr.getLanguages = function () {
        return $http.get(API_URL + '/languages').then(function (responseLang) {
            return responseLang.data;
        });
    }
}