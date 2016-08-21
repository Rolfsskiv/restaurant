
ComplaintService.$inject = ['$http'];
function ComplaintService($http) {
    var service = this;

    service.getComplaints = function () {
        return $http.get(API_URL + '/complaints').then(function (response) {
            return response.data;
        });
    };

    service.getComplaintsRestaurant = function (slug) {
        return $http.get(API_URL + '/rest/' + slug + '/complaints').then(function (response) {
            return response.data;
        });
    };

    service.getComplaintsDelivery = function (slug) {
        return $http.get(API_URL + '/delivery/' + slug + '/complaints').then(function (response) {
            return response.data;
        });
    };

    service.getComplaintsCookBoss = function (slug) {
        return $http.get(API_URL + '/rest/' + slug + '/complaints').then(function (response) {
            return response.data;
        });
    };

    service.addComplaint = function (data) {
        return $http.post(API_URL + '/complaints', data).then(function (response) {
            return response.data;
        });
    };

    service.addComplaintDelivery = function (data, id) {
        return $http.post(API_URL + '/complaint-delivery/' + id, data).then(function (response) {
            return response;
        });
    };

    service.addComplaintRestaurant = function (data, id) {
        return $http.post(API_URL + '/complaint-rest/' + id, data).then(function (response) {
            return response;
        });
    };

    service.addComplaintCookBoss = function (data, id) {
        return $http.post(API_URL + '/complaint-cookboss/' + id, data).then(function (response) {
            return response;
        });
    };
}