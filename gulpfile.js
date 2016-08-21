var gulp        = require('gulp'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    notify          = require("gulp-notify"),
    uglify          = require('gulp-uglify'),
    minifyCss       = require('gulp-minify-css'),
    watch           = require('gulp-watch');

var application = 'application/';
var js = 'js/';
var css = 'css/';
var bower = 'bower_components/';
var node_modules = 'node_modules/';
var components = 'components/';
var build = 'build';

gulp.task('jquery-vendor', function () {
    return gulp.src([
        bower + 'jquery/dist/jquery.min.js',
        bower + 'bootstrap/dist/js/bootstrap.min.js',
        js + 'bootstrap-select.min.js',
        js + 'bootstrap-multiselect.js',
        js + 'bootstrap-datepicker.js',
        js + 'bootstrap-timepicker.min.js',
        js + 'jquery.mCustomScrollbar.concat.min.js',
        js + 'wNumb.js',
        js + 'nouislider.min.js'
    ])
        .pipe(concat('jquery-vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(build))
        .pipe(notify({message: 'Finished minifying Angular Vendor JavaScript'}));
});

gulp.task('angular-vendor', function () {
    return gulp.src([
        bower + 'angular/angular.min.js',
        bower + 'angular-route/angular-route.min.js',
        bower + 'angular-ui-notification/dist/angular-ui-notification.min.js',
        bower + 'angularjs-slider/dist/rzslider.min.js',
        bower + 'slick-carousel/slick/slick.min.js',
        bower + 'angular-slick/dist/slick.min.js',
        node_modules      + 'node_modules/angular-checkboxes/angular-checkboxes.js',
        bower + 'angular-slick/dist/slick.min.js',
        bower + 'ng-scrollbars/dist/scrollbars.min.js',
        bower + 'angular-socialshare/dist/angular-socialshare.min.js',
        bower + 'satellizer/dist/satellizer.min.js'
    ])
        .pipe(concat('angular-vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(build))
        .pipe(notify({message: 'Finished minifying Angular Vendor JavaScript'}));
});

gulp.task('components', function () {
    return gulp.src([
        application + 'httpInterceptor.js',

        application + components + 'local-storage.service.js',

        application + components + 'index/index.controller.js',
        application + components + 'index/countries.service.js',
        application + components + 'index/lang.service.js',

        application + 'select-picker.directive.js',

        application + components + 'auth/registration.controller.js',
        application + components + 'auth/login.controller.js',
        application + components + 'auth/auth.service.js',

        application + components + 'complaint/complaint.controller.js',
        application + components + 'complaint/complaint.service.js',

        application + components + 'dinner/dinner.controller.js',
        application + components + 'dinner/dinner.service.js',

        application + components + 'top/top.controller.js',

        application + components + 'cooking-boss/cooking-boss.controller.js',
        application + components + 'cooking-boss/cooking-boss.service.js',

        application + components + 'special-proposal/special-proposal.controller.js',
        application + components + 'special-proposal/special-proposal.service.js',

        application + components + 'delivery/delivery.controller.js',
        application + components + 'delivery/order.controller.js',
        application + components + 'delivery/cart.controller.js',
        application + components + 'delivery/cart.service.js',
        application + components + 'delivery/delivery.service.js',

        application + components + 'restaurant/restaurant.controller.js',
        application + components + 'restaurant/restaurants.service.js',
        application + components + 'restaurant/filter.service.js',
        application + components + 'restaurant/restaurant.filter.js',
        application + components + 'restaurant/person.directive.js',

        application + 'application.js'
    ])
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(build))
        .pipe(notify({message: 'Finished minifying app vendor JavaScript'}));
});

gulp.task('app-scripts', function () {
    return gulp.src([
        build + '/jquery-vendor.min.js',
        build + '/angular-vendor.min.js',
        build + '/application.min.js'
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(build))
        .pipe(notify({message: 'Create js vendor file'}));
});

gulp.task('styles', function () {
    return gulp.src([
        bower + 'bootstrap/dist/css/bootstrap.min.css',
        css + 'bootstrap-select.min.css',
        css + 'bootstrap-multiselect.css',
        css + 'font-awesome.min.css',
        css + 'slick.css',
        css + 'slick-theme.css',
        css + 'bootstrap-timepicker.min.css',
        css + 'bootstrap-datepicker.css',
        css + 'slick-theme.css',
        css + 'styles.css',
        css + 'jquery.mCustomScrollbar.css',
        css + 'nouislider.min.css,',
        bower + 'angular-notify/dist/angular-notify.min.css,',
        bower + 'angularjs-slider/dist/rzslider.min.css'
    ])
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(build))
        .pipe(notify({message: 'Finished minifying css'}));
});

gulp.task('default', [
    'jquery-vendor',
    'angular-vendor',
    'components',
    'app-scripts',

    'styles'
], function () {

});

gulp.task('watch', function() {
    gulp.watch(application + '**/*.js', ['components', 'app-scripts']);
});
