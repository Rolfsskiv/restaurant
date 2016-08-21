var SERVER_URL = 'http://rolfwork.xyz/';
var PREFIX = 'api/v1';
var API_URL = SERVER_URL + PREFIX;
var appComponents = 'application/components/';

angular.module('Location', [])
    .service('CountriesService', CountriesService)
    .filter('whereLocation', function () {
        return function (filters, restaurants) {
            var data = [];

            angular.forEach(restaurants, function (value, key) {
                if (filters[0] != '') {
                    if (value.country_id == filters[0]) data.push(value);
                } else if (filters[0] != '' && filters[1] != '') {
                    if (value.country_id == filters[0] && value.city_id == filters[1]) data.push(value);
                }
            });

            return data;
        }
    });

angular.module('CookingBoss', [])
    .controller('CookingBossController', CookingBossController)
    .service('CookingBossService', CookingBossService)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/cooking-boss', {
                templateUrl: appComponents + '/cooking-boss/cooking-boss.html',
                controller: CookingBossController,
                controllerAs: 'cook'
            });
    }]);

angular.module('Auth', ['Location'])
    .controller('LoginController', LoginController)
    .controller('RegistrationController', RegistrationController)
    .service('AuthService', AuthService)
    .config(['$routeProvider', '$authProvider', function ($routeProvider, $authProvider) {

        $authProvider.loginUrl = API_URL + '/signin';
        $authProvider.signupUrl = API_URL + '/signup';

        $authProvider.facebook({
            clientId: 'Facebook App ID'
        });
        $authProvider.google({
            clientId: 'Google Client ID'
        });
        $authProvider.twitter({
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            redirectUri: window.location.origin,
            oauthType: '1.0',
            popupOptions: { width: 495, height: 645 }
        });

        $authProvider.oauth2({
            name: 'vk',
            url: 'https://oauth.vk.com/access_token',
            clientId: '5239422',
            redirectUri: 'http://rolfwork.jashka/vk-code',
            authorizationEndpoint: 'http://oauth.vk.com/authorize',
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri', 'display', 'scope'],
            display: 'page',
            scope: 'friends',
            popupOptions: {
                width: 700,
                height: 500
            },
            responseType: 'code'
        });

        $routeProvider
            .when('/auth', {
                templateUrl: appComponents + '/auth/auth.html',
                controller: LoginController,
                controllerAs: 'auth'
            })
            .when('/vk-code', {
                template: '<div></div>',
                controller: function ($route) {
                    console.log($route);
                }
            })
            .when('/registration-user', {
                templateUrl: appComponents + '/auth/registration-user.html',
                controller: LoginController,
                controllerAs: 'register'
            })
            .when('/registration-restaurant', {
                templateUrl: appComponents + '/auth/registration-restaurant.html',
                controller: LoginController,
                controllerAs: 'register'
            });
    }]);

angular.module('Restaurant', [])
    .controller('RestaurantController', RestaurantController)
    .controller('TopRestaurantController', TopRestaurantController)
    .service('RestaurantsService', RestaurantsService)
    .filter('restaurantFilter', RestaurantFilter)
    .directive('person', PersonDirective)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/restaurant/:slug/', {
                templateUrl: appComponents + 'restaurant/restaurant.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/restaurant/:slug/description', {
                templateUrl: appComponents + '/restaurant/description.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/restaurant/:slug/complaints', {
                templateUrl: appComponents + '/restaurant/complaints.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/restaurant/card/:slug/menu', {
                templateUrl: appComponents + '/restaurant/menu.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/modal-order/:slug', {
                templateUrl: appComponents + '/restaurant/modal-order.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/modal-order-table-success', {
                templateUrl: appComponents + '/restaurant/modal-order-success.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/restaurants', {
                templateUrl: appComponents + '/restaurant/restaurants.html',
                controller: RestaurantController,
                controllerAs: 'rest'
            })
            .when('/top50', {
                templateUrl: appComponents + '/top/top.html',
                controller: TopRestaurantController,
                controllerAs: 'top'
            })
            .when('/modal-restaurant-menu', {
                templateUrl: appComponents + '/dinner/card-modal.html',
                controller: DinnerController,
                controllerAs: 'dinner'
            });
    }]);

angular.module('SpecialProposal', [])
    .controller('SpecialController', SpecialProposalController)
    .service('SpecialProposalService', SpecialProposalService)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/special-proposal', {
                templateUrl: appComponents + '/special-proposal/special-proposal.html',
                controller: SpecialProposalController,
                controllerAs: 'special'
            })
            .when('/special-proposal/:id/card', {
                templateUrl: appComponents + '/special-proposal/card.html',
                controller: SpecialProposalController,
                controllerAs: 'special'
            });
    }]);

angular.module('Delivery', [])
    .controller('DeliveryController', DeliveryController)
    .service('DeliveryService', DeliveryService)
    .controller('CartController', CartController)
    .controller('OrderController', OrderController)
    .service('CartService', CartService)
    .filter('deliveryFilter', DeliveryFilter)
    .directive('cart', function () {
        return {
            templateUrl: 'application/components/delivery/cart.html',
            controller: CartController,
            controllerAs: 'cart'
        }
    })
    .directive('checkout', function () {
        return {
            restrict: 'E',
            scope: {
                restaurantid: '='
            },
            templateUrl: 'application/components/delivery/modals/checkout.html',
            controller: OrderController,
            controllerAs: 'order',
            link: function (scope, el, attrs) {
                scope.$watch(function () {
                    return scope.restaurantid;
                }, function (n) {
                    if (n !== undefined)
                        scope.order.restaurantId = scope.restaurantid;
                });
            }
        }
    })
    .directive('confirmNumber', function () {
        return {
            templateUrl: 'application/components/delivery/modals/confirm.html',
            controller: OrderController,
            controllerAs: 'order'
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/delivery', {
                templateUrl: appComponents + '/delivery/delivery-all.html',
                controller: DeliveryController,
                controllerAs: 'ctrl'
            })
            .when('/delivery/card/:slug/', {
                templateUrl: appComponents + '/delivery/card.html',
                controller: DeliveryController,
                controllerAs: 'card'
            })
            .when('/delivery/card/:slug/description/', {
                templateUrl: appComponents + '/delivery/description.html',
                controller: DeliveryController,
                controllerAs: 'card'
            })
            .when('/delivery/card/:slug/complaints/', {
                templateUrl: appComponents + '/delivery/complaints.html',
                controller: DeliveryController,
                controllerAs: 'card'
            })
            .when('/modal-order/:restaurantId', {
                templateUrl: 'application/components/delivery/modals/card.html'
            })
            .when('/modal-checkout/:restaurantId', {
                templateUrl: 'application/components/delivery/modals/checkout-modal.html'
            })
            .when('/confirm-number/:restaurantId', {
                templateUrl: 'application/components/delivery/modals/confirm-modal.html'
            })
            .when('/successful-order', {
                templateUrl: 'application/components/delivery/modals/successful.html'
            });
    }]);

angular.module('Dinner', [])
    .controller('DinnerController', DinnerController)
    .service('DinnerService', DinnerService)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/dinner', {
                templateUrl: appComponents + '/dinner/dinner.html',
                controller: DinnerController,
                controllerAs: 'dinner'
            });
    }]);

angular.module('Complaint', [])
    .controller('ComplaintController', ComplaintController)
    .service('ComplaintService', ComplaintService)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/complaints', {
                templateUrl: appComponents + '/complaint/complaint.html',
                controller: ComplaintController,
                controllerAs: 'ctrl'
            });
    }]);

angular.module('Index', [])
    .controller('IndexController', IndexController)
    .service('FilterService', FilterService)
    .directive('footerComponent', function () {
        return {
            templateUrl: 'application/directives/footer.html',
            link: function (scope, element, attrs) {
                $('.menu-top button').click(function() {
                    $(".menu-list").toggle();
                });

                $('footer .menu-top button').click(function() {
                    $('footer .menu-top button').toggleClass('active-block');
                });
            }
        }
    })
    .directive('headComponent', ['LangService', 'AuthService', function (LangService, AuthService) {
        return {
            templateUrl: 'application/directives/head.html',
            controller: function () {
                var vm = this;

                vm.langs = [];
                vm.auth = AuthService;

                vm.init = init;

                vm.init();

                function init() {
                    LangService.getLanguages().then(function (langs) {
                        vm.langs = langs;
                    });
                }
            },
            controllerAs: 'head'
        };
    }])
    .directive('navbar', function () {
        return {
            templateUrl: 'application/directives/navbar.html'
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: appComponents + 'index/index.html',
                controller: IndexController,
                controllerAs: 'ctrl'
            });
    }]);

angular.module('Profile', [])
    .controller('ProfileController', ProfileController)
    .service('ProfileService', ProfileService)
    .directive('profile', function () {
        return {
            restrict: 'E',
            scope: {
                profile: '=profile',
                routeName: '=routeName'
            },
            templateUrl: appComponents + 'profile/templates/profile.html'
        }
    })
    .directive('head-profile', function () {
        return {
            restrict: 'E',
            scope: {
                image: '=image'
            },
            templateUrl: appComponents + 'profile/templates/head.html'
        }
    })
    .directive('head-menu', function () {
        return {
            restrict: 'E',
            scope: {
                name: '=name'
            },
            templateUrl: appComponents + 'profile/templates/menu.html'
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/my-profile', {
                templateUrl: appComponents + 'profile/profile.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'profile',
                authorize: true
            })
            .when('/my-information', {
                templateUrl: appComponents + 'profile/information.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'information',
                authorize: true
            })
            .when('/my-bonus', {
                templateUrl: appComponents + 'profile/bonus.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'bonus',
                authorize: true
            })
            .when('/my-reservation', {
                templateUrl: appComponents + 'profile/reservation.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'reservation',
                authorize: true
            })
            .when('/my-order-food', {
                templateUrl: appComponents + 'profile/order-food.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'order-food',
                authorize: true
            })
            .when('/my-testimonials', {
                templateUrl: appComponents + 'profile/testimonials.html',
                controller: ProfileController,
                controllerAs: 'profile',
                name: 'testimonials',
                authorize: true
            });
    }])
    .run(['AuthService', '$rootScope', 'Notification', '$location', function (AuthService, $rootScope, Notification, $location) {
        $rootScope.$on('$routeChangeStart', function (event, to, from) {
            if (to.authorize && to.authorize == true) {
                if ( !AuthService.isAuth()) {
                    Notification.error('Вы не авторизованы, пожалуйста авторизуйтесь!');
                    $location.path('/');
                }
            }
        })
    }]);

/*angular.module('RestaurantProfile', [])
    .controller('RestaurantProfileController', RestaurantProfileController)
    .service('RestaurantProfileService', RestaurantProfileService)
    .config(['$routeProvider', function ($routeProvider) {

    }]);*/

var app = angular.module('Application', [
    'ngRoute',
    'ui-notification',
    'rzModule',
    'slick',
    'ngScrollbars',
    '720kb.socialshare',
    'checklist-model',
    'satellizer',
    'ngImgCrop',

    'Location',
    'Auth',
    'Index',
    'CookingBoss',
    'Restaurant',
    'SpecialProposal',
    'Delivery',
    'Dinner',
    'Complaint',

    'Profile',
    //'RestaurantProfile'
])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$authProvider', function ($routeProvider, $locationProvider, $httpProvider, $authProvider) {

        $routeProvider
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $httpProvider.interceptors.push('errorHttpInterceptor');
    }])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on( '$viewContentLoaded', function(event, next, current) {
            rebuildMultiSelect();
        });
    }])
    .service('ls', LocalStorageService)
    .service('LangService', LangService)
    .factory('errorHttpInterceptor', ['$injector', '$q', '$location', function ($injector, $q, $location) {

        var notification = null;
        var getNotification = function () {
            if (!notification) {
                notification = $injector.get('Notification');
            }
            return notification;
        };

        return {
            'responseError': handleErrorResponse,
            'response': success
        };

        function handleErrorResponse(response) {

            if (response.status === 400 && response.data.error == 'token_not_provided') {
                getNotification().error('Вы не авторизованы, пожалуйста авторизуйтесь!');
            }

            if (response.status === 401) {
                getNotification().error('Вы не авторизованы, пожалуйста авторизуйтесь!');
            }
            if (response.status === 404) {
                getNotification().error('Не найдено');
                $location.path('/');
            }

            if (response.status === 500) {
                getNotification().error(response.data);
            }

            if (response.status === 403) {
                getNotification().error(response.data.message);
            }

            $q.defer().resolve();

            return $q.reject(response);
        }

        function success(response) {
            return response;
        }
    }])
    .filter('startFrom', function () {
        return function (input, start) {
            if (input.length > 0) {
                start = +start;
                return input.slice(start);
            }
        }
    })
    .directive('emitLastRepeaterElement', function() {
        return function(scope) {
            if (scope.$last){
                scope.$emit('LastRepeaterElement');
            }
        };
    })
    .directive('parseStyle', ['$interpolate', function($interpolate) {
        return function(scope, elem) {
            var exp = $interpolate(elem.html()),
                watchFunc = function () { return exp(scope); };

            scope.$watch(watchFunc, function (html) {
                elem.html(html);
            });
        };
    }])
    .directive('ngInitial', function ($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var initialValue = $attrs.value || $element.val();
                return {
                    pre: function ($scope, $element, $attrs) {
                        $parse($attrs.ngModel).assign($scope, initialValue);
                    }
                }
            }
        }
    })
    .directive('selectpicker', SelectPickerDirective);

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    _token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
                ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
    return str;
};