
function LocalStorageService() {
    var service = this;

    service.get = function (key) {
        var data = localStorage.getItem(key);

        if (data) {
            try {
                data = JSON.parse(data);
            } catch (e) {}

            return data;
        } else {
            return null;
        }
    };

    service.set = function (key, value) {
        var data = (typeof value == 'object') ? JSON.stringify(value) : value;
        localStorage.setItem(key, data);
    };

    service.rm = function (key) {
        localStorage.removeItem(key);
    }
}