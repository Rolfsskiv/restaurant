
SpecialProposalService.$inject = ['$http'];
function SpecialProposalService($http) {
    var service = this;

    service.getSpecialProposal = function () {
        return $http.get(API_URL + '/special-proposal').then(function (response) {
            return response.data;
        });
    };

    service.getSpecial = function (id) {
        return $http.get(API_URL + '/special-proposal/' + id).then(function (response) {
            return response.data;
        });
    }
}