
CartService.$inject = ['$http', 'ls', 'Notification'];
function CartService($http, ls, Notification) {
    var service = this;
    service.cart = [];

    service.init = function () {
        service.cart = (ls.get('cart') == null) ? [] : ls.get('cart');
    };

    service.getCart = function (slug) {
        var currentRestaurantCart = [];

        service.cart.forEach(function (value, index) {
            if (slug == value.slug) {
                currentRestaurantCart.push(value);
            }
        });

        return currentRestaurantCart;
    };
    
    service.getTotal = function (slug, id) {
        var total = 0;

        if (id) {

            service.cart.forEach(function (value, index) {
                if (slug == value.slug && id == index) {
                    total = value.total;
                }
            });

            return total;
        } else {
            service.cart.forEach(function (value, index) {
                if (slug == value.slug) {
                    total = value.total;
                }
            });
        }

        return total;
    };
    
    service.add = function (slug, item, count) {
        var total = item.price * count;

        if (service.cart.length > 0) {
            service.cart.forEach(function (value, index) {
                if (slug == value.slug && value.menu.id == item.id) {
                    value.count += count;
                    value.total += count * value.menu.price;
                }
            });
        } else {
            service.cart.push({
                slug: slug,
                menu: item,
                count: count,
                total: total
            });
        }

        ls.set('cart', service.cart);

        Notification.info('Блюдо ' + item.names + ' добавлено в корзину');
    };

    service.remove = function (slug, id) {
        service.cart.forEach(function (value, index) {
           if (slug == value.slug && id == index) {
               service.cart.splice(index, 1);
           }
        });

        ls.set('cart', service.cart);

    };
    
    service.setCount = function (slug, id, count) {
        var _count = null;

        service.cart.forEach(function (value, index) {
            if (slug == value.slug && id == index) {
                _count = parseInt(count);
                value.total = value.menu.price * _count;
                value.count = _count;
            }
        });

        ls.set('cart', service.cart);
        
        return _count;

    };

    service.clear = function () {
        service.cart = [];
        ls.rm('cart');
    };

    service.init();
}