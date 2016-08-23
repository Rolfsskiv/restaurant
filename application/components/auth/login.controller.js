LoginController.$inject = ['$auth', 'ls', 'AuthService'];
function LoginController($auth, ls, AuthService) {
    var vm = this;

    vm.user = {
        email: null,
        password: null
    };

    vm.auth = auth;

    function auth(provider) {

        if (provider) {
            /*if (provider == 'vk') {
                var vkWindow = window.open("https://oauth.vk.com/authorize?client_id=5239422&display=page&redirect_uri=http://rolfwork.jashka/vk-code&scope=photos&response_type=token",
                    "_blank",
                    "toolbar=yes,scrollbars=yes,resizable=yes,top=350,left=350,width=400,height=400");
                vkWindow.onload = function () {
                    vkWindow.document.write('<script>setTimeout(function() { if (window.location.hash.includes(\'access_token\')) window.opener.userData(window.location.hash)  }, 100)</script>')
                };
                window.userData = function (data) {

                    vkWindow.close();
                };
            } else {
                $auth.authenticate(provider)
                    .then(function () {
                        console.log('You have successfully signed in with ' + provider + '!');
                    })
                    .catch(function (error) {
                        if (error.message) {
                            console.log('error message: ', error.message);
                        } else if (error.data) {
                            console.log('error data: ', error.data);
                        } else {
                            console.log('error: ', error);
                        }
                    });
            }*/

            $auth.authenticate(provider)
                .then(function () {
                    console.log('You have successfully signed in with ' + provider + '!');
                })
                .catch(function (error) {
                    if (error.message) {
                        console.log('error message: ', error.message);
                    } else if (error.data) {
                        console.log('error data: ', error.data);
                    } else {
                        console.log('error: ', error);
                    }
                });

        } else {
            $auth.login(vm.user).then(function (response) {
                if (response.status == 200) {
                    ls.set('user', response.data.user);
                    angular.element('.enter-modal').modal('hide');
                } else {
                    console.log(response);
                }
            });
        }
    }
}