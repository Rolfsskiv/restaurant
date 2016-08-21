$(function() {
    $('.modal').on('shown.bs.modal', function () {
        $(window).trigger('resize');
    });
    $('.top-menu .left-button').click(function() {
        $('.top-menu .left-button').toggleClass('active');
    });

    $('.top-menu .registration').click(function() {
        $('.top-menu .registration').removeClass('btn');
    });

    $(".close-menu").click(function() {
        $('.bottom-menu .navbar-collapse').removeClass('in');
        $('.top-menu button').removeClass('active');
    });
    if($('#subjects-restaraunt').length) {
        $('#subjects-restaraunt').multiselect({
            nonSelectedText: 'Выберите тематику'
        });
    }
    $('.select-subject label').append('<span></span>')
    if($('#type-restaraunt').length) {
        $('#type-restaraunt').multiselect({
            nonSelectedText: 'Выберите кухню'
        });
    }
    $('.select-type label').append('<span></span>');
    
    /*if($(window).width() > 767) {
            $('.statistics-block .drop-holder').removeClass('dropdown-menu');
        } else if($(window).width() < 767) {
            $('.statistics-block .drop-holder').addClass('dropdown-menu');
        }
    $(window).resize(function() {
        if($(window).width() > 767) {
            $('.statistics-block .drop-holder').removeClass('dropdown-menu');
        } else if($(window).width() < 767) {
            $('.statistics-block .drop-holder').addClass('dropdown-menu');
        }
    });*/


    if($(window).width() < 767) {
            $('#restaurants-compl3aints .write-complaints').text('СОХРАНИТЬ');
        }
    if($('#features-restaraunt').length) {
        $('#features-restaraunt').multiselect({
            nonSelectedText: 'Выберите особенности'
        });
    }
    $('.select-features label').append('<span></span>');

    if($('#change-kitchen').length) {
        $('#change-kitchen').multiselect({
            nonSelectedText: 'Выберите кухню'
        });
    }
    $('.select-kitchen label').append('<span></span>');
    if($('#change-food').length) {
        $('#change-food').multiselect({
            nonSelectedText: 'Выберите блюдо'
        });
    }
    $('.select-food label').append('<span></span>');

    if($('#oclock-single').length) {
        $('#oclock-single').selectpicker();
    }
    if($('.selectpicker').length) {
        $('.selectpicker').selectpicker();
    }
    if($('.selectpicker-person').length) {
        $('.selectpicker-person').selectpicker();
    }


    if($('#datepicker').length) {
        var active_dates = ["21/5/2014","25/5/2014"];

        $("#datepicker").datepicker({
            weekStart: 1,
             format: "dd/mm/yyyy",
             todayHighlight: true,
             beforeShowDay: function(date){
                 var d = date;
                 var curr_date = d.getDate();
                 var curr_month = d.getMonth() + 1; //Months are zero based
                 var curr_year = d.getFullYear();
                 var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                   if ($.inArray(formattedDate, active_dates) != -1){
                       return {
                          classes: 'active day'
                       };
                   }
                  return;
              }
          }).datepicker('setDate', new Date());   
    }
    if($('#datepicker-2').length) {
        var active_dates = ["21/5/2014","25/5/2014"];

        $("#datepicker-2").datepicker({
            weekStart: 1,
             format: "dd/mm/yyyy",
             todayHighlight: true,
             beforeShowDay: function(date){
                 var d = date;
                 var curr_date = d.getDate();
                 var curr_month = d.getMonth() + 1; //Months are zero based
                 var curr_year = d.getFullYear();
                 var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                   if ($.inArray(formattedDate, active_dates) != -1){
                       return {
                          classes: 'active day'
                       };
                   }
                  return;
              }
          }).datepicker('setDate', new Date());   
    }

    
    if($('#datetimepicker').length) {
        var active_dates = ["21/5/2014","25/5/2014"];

        $("#datetimepicker").datepicker({
            weekStart: 1,
            inline: true,
            sideBySide: true,
             format: "dd/mm/yyyy",
             todayHighlight: true,
             beforeShowDay: function(date){
                 var d = date;
                 var curr_date = d.getDate();
                 var curr_month = d.getMonth() + 1; //Months are zero based
                 var curr_year = d.getFullYear();
                 var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                   if ($.inArray(formattedDate, active_dates) != -1){
                       return {
                          classes: 'active day'
                       };
                   }
                  return;
              }
          }).datepicker('setDate', new Date());
    }
    if($('.datepicker-sale').length) {
        var active_dates = ["21/5/2014","25/5/2014"];

        $(".datepicker-sale").datepicker({
            weekStart: 1,
             format: "dd/mm/yyyy",
             todayHighlight: true,
             beforeShowDay: function(date){
                 var d = date;
                 var curr_date = d.getDate();
                 var curr_month = d.getMonth() + 1; //Months are zero based
                 var curr_year = d.getFullYear();
                 var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                   if ($.inArray(formattedDate, active_dates) != -1){
                       return {
                          classes: 'active day'
                       };
                   }
                  return;
              }
          }); 
    }
    if($('.datepicker-sale-2').length) {
        var active_dates = ["21/5/2014","25/5/2014"];

        $(".datepicker-sale-2").datepicker({
            weekStart: 1,
             format: "dd/mm/yyyy",
             todayHighlight: true,
             beforeShowDay: function(date){
                 var d = date;
                 var curr_date = d.getDate();
                 var curr_month = d.getMonth() + 1; //Months are zero based
                 var curr_year = d.getFullYear();
                 var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                   if ($.inArray(formattedDate, active_dates) != -1){
                       return {
                          classes: 'active day'
                       };
                   }
                  return;
              }
          }); 
    }
    $('.tootlip-block').hover(function(event) {
        console.log('span');
        $('#promo').blur();
    });


    $('.filter-hide').click(function(event) {
        event.preventDefault();
        var $this = $(this);
        $this.toggleClass('see');
        if ($this.hasClass('see')) {
            $this.text('Развернуть фильтр');
        } else {
            $this.text('Свернуть фильтр');
        }
        $('.select-component.first-list').slideToggle(500);
    });

    if($('#timepicker1').length) {
        $('#timepicker1').timepicker({
            showMeridian: false
        });
    }
    if($('#timepicker2').length) {
        $('#timepicker2').timepicker({
            showMeridian: false
        });
    }
    $('.multiselect-container').addClass('content-scrollable');
    $('.dropdown-menu.inner').addClass('content-scrollable');
    /*if($('.content-scrollable').length) {
        $('.content-scrollable').mCustomScrollbar({
            setTop: 0
        });
    }*/

    $('.change-item .show-content').click(function() {
        $(this).toggleClass('active');
        $(this).closest('.dropdown').find('.see-more').show(400);
    });
    $('.change-item .hide-content').click(function() {
        $(this).closest('.dropdown').find('.show-content').removeClass('active');
        $(this).closest('.see-more').hide(500);
    });


    $('.hide-list .show-content').click(function() {
        $(this).hide();
        $(this).siblings('.dropdown').show(400);
        $(this).siblings('.hide-content').show(400);
    });
    $('.hide-list .hide-content').click(function() {
        $(this).hide();
        $(this).siblings('.dropdown').hide(400);
        $(this).siblings('.show-content').show(400);
    });

    //Sliders
    if($('#slider-snap').length) {
        var filterSlider = document.getElementById('slider-snap');
        noUiSlider.create(filterSlider, {
            start: [25, 70],
            step: 5,
            snap: true,
            tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
            connect: true,
            range: {
                'min': 0,
                '5%': 5,
                '10%': 10,
                '15%': 15,
                '20%': 20,
                '25%': 25,
                '30%': 30,
                '35%': 30,
                '40%': 40,
                '45%': 45,
                '55%': 55,
                '65%': 65,
                '70%': 70,
                '75%': 75,
                '80%': 80,
                '85%': 85,
                '90%': 90,
                '95%': 95,
                'max': 100
            }
        });
    }
    if($('#slider-snap-delivery').length) {
        var filterSlider = document.getElementById('slider-snap-delivery');
        noUiSlider.create(filterSlider, {
            start: [25, 70],
            step: 5,
            snap: true,
            tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
            connect: true,
            range: {
                'min': 0,
                '5%': 5,
                '10%': 10,
                '15%': 15,
                '20%': 20,
                '25%': 25,
                '30%': 30,
                '35%': 30,
                '40%': 40,
                '45%': 45,
                '55%': 55,
                '65%': 65,
                '70%': 70,
                '75%': 75,
                '80%': 80,
                '85%': 85,
                '90%': 90,
                '95%': 95,
                'max': 100
            }
        });
    }
    if($('#slider-filter').length) {
        var modalSlider = document.getElementById('slider-filter');
        noUiSlider.create(modalSlider, {
            start: [25, 70],
            step: 5,
            snap: true,
            tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
            connect: true,
            range: {
                'min': 0,
                '5%': 5,
                '10%': 10,
                '15%': 15,
                '20%': 20,
                '25%': 25,
                '30%': 30,
                '35%': 30,
                '40%': 40,
                '45%': 45,
                '55%': 55,
                '65%': 65,
                '70%': 70,
                '75%': 75,
                '80%': 80,
                '85%': 85,
                '90%': 90,
                '95%': 95,
                'max': 100
            }
        });
    }
    if($('#slider-price').length) {
        var priceSlider = document.getElementById('slider-price');
        noUiSlider.create(priceSlider, {
            start: [ 20, 80 ],
            margin: 30,
            step: 5,
            tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
            range: {
                'min': 0,
                'max': 100
            }
        });
        var priceMin = document.getElementById('slider-price-value-min'),
        priceMax = document.getElementById('slider-price-value-max');

        priceSlider.noUiSlider.on('update', function ( values, handle ) {
            if ( handle ) {
                priceMax.innerHTML = Number(values[handle]);
            } else {
                priceMin.innerHTML = Number(values[handle]);
            }
        });
    }
    if($('#slider-price-several').length) {
        var priceSeveralSlider = document.getElementById('slider-price-several');

        noUiSlider.create(priceSeveralSlider, {
            start: [ 0, 80 ],
            margin: 30,
            step: 5,
            tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
            range: {
                'min': 0,
                'max': 100
            }
        });
        var priceMin = document.getElementById('slider-several-price-min'),
            priceMax = document.getElementById('slider-several-price-max');

        priceSeveralSlider.noUiSlider.on('update', function ( values, handle ) {
            if ( handle ) {
                priceMax.innerHTML = Number(values[handle]);
            } else {
                priceMin.innerHTML = Number(values[handle]);
            }
        });
    }

    $(window).load(function() {
        getModalWindow();
    }); 
    $(window).resize(function() {
        getModalWindow();
    });




    /*$('#restaurants-complaints .text .read-all').click(function() {
        $(this).closest('.text').find('.wrapper-text p').show();
        $(this).closest('.text').find('.wrapper-text').show().css('height', 'auto');
        $(this).hide();
    });*/



    

    $('#catalog-bonus .menu-structure').click(function() {
        $('.dropdown-toggle').dropdown();
    });
    $('textarea.title').val('Заглавие');
    $('textarea.message').val('Ирина Констатиновна,').css('color', '#4d688f');
    $('textarea.message-testimonial').val('Ваш коментарий');
    $('textarea.title').focus(function() {
        $(this).val('');
    });
    $('textarea.message-testimonial').focus(function() {
        $(this).val('');
    });




    /**/








    /**/
    if($('#countdown').length) {
        $('#countdown').FlipClock(7200, {
            countdown: true,
            language:'ru-ru'
        });
    }
    if($('#countdown-2').length) {
        $('#countdown-2').FlipClock(7200, {
            countdown: true,
            language:'ru-ru'
        });
    }

    /*$('#delivery-card .list-structure .dropdown').click(function() {
       $(this).find('.dropdown-menu.subcategory').stop(true, true).delay(2000).fadeIn(2000);
    }, function() {
      $(this).find('.dropdown-menu.subcategory').stop(true, true).delay(2000).fadeOut(2000);
    });*/
    $('.personal-restaurant .hide-order').click(function(event) {
        event.preventDefault();
        $(this).closest('.content-rest').find('.reservation-block-holder').toggle(300);
        $(this).text(function(i, v){
            return v === '-' ? '+' : '-'
        });
    });
    $('.personal-restaurant .hide-order-approve').click(function(event) {
        event.preventDefault();
        $(this).closest('.content-rest').find('.approve-application').toggle(300);
        $(this).text(function(i, v){
            return v === '-' ? '+' : '-'
        });
    });

    /*users*/


    /*restaurant*/
    $('#rest-discount input[type="checkbox"]').click(function() {
        if($(this).is(":checked")) {
        $(this).closest('.choose-day').find('.add-time-block').addClass('active');
        } else {
            $(this).closest('.choose-day').find('.add-time-block').removeClass('active');
        }
    });
    $('.add-time-block .close').click(function(e) {
        e.preventDefault();
        var notCheck = $(this).closest('.choose-day').find('input[type="checkbox"]').prop('checked');
        $(this).closest('.choose-day').find('input').prop('checked', !notCheck);
        console.log(notCheck);
        $(this).closest('.add-time-block').removeClass('active');
    });
    
    $('.personal-restaurant .add-section').click(function(event) {
       $(this).next('.make-section-block').show();
    });
    $('.personal-restaurant .make-section-block .cancel').click(function(event) {
       $(this).closest('.make-section-block').hide();
    });

    $('.personal-restaurant .make-section .add-subsection').click(function(event) {
       $(this).closest('.content-rest').find('.make-subsection').show();
    });
    $('.personal-restaurant .make-section .cancel-ser').click(function(event) {
         event.preventDefault();
       $(this).find('.make-subsection').hide();
    });

    $('.personal-restaurant .add-dish-subcategory').click(function(event) {
        event.preventDefault();
       $(this).closest('form').find('.fon-border-block-inner').find('.description-dish').show();
    });
    $('.personal-restaurant .description-dish .cancel').click(function(event) {
        event.preventDefault();
       $(this).closest('.description-dish').hide();
    });

    $('.personal-restaurant .button-holder .blue').click(function(event) {
        event.preventDefault();
       $(this).closest('.description-holder').find('.description-dish').show();
    });

    $('.personal-restaurant .make-section').click(function(event) {
        event.preventDefault();
       $(this).next('.add-dish-holder-inner').find('.make-dish').toggle();
       $(this).next('.add-dish-holder-inner').toggleClass('active');
        $(this).next('.add-dish-holder-inner').find('.fon-border-block').toggleClass('active');
        $(this).next('.add-dish-holder-inner').find('.fon-border-block-inner').toggleClass('active-one');



       
    }).children().click(function(e) {
      return false;
    });
    $('.personal-restaurant .make-dish .cancel').click(function(event) {
        event.preventDefault();
       $(this).closest('.make-dish').hide();
       $(this).closest('.fon-border-block').removeClass('active');

    });

    $('.personal-restaurant .fon-border-block .make-dish').click(function(event) {
        event.preventDefault();
       $(this).closest('.add-dish-holder-inner').find('.description-holder').toggle();
       $(this).closest('.add-dish-holder-inner').find('.fon-border-block-inner').toggleClass('active');
       console.log('.add-dish-holder-inner');
    }).children().click(function(e) {
      return false;
    }); 
    $('.personal-restaurant .description-holder .cancel').click(function(event) {
        event.preventDefault();
       $(this).closest('.description-holder').hide();
       $(this).closest('.description-holder').prev('.fon-border-block-inner').removeClass('active');
       console.log('.add-dish-holder-inner');
    });

    $('#rest-cook-boss .add-dish').click(function(event) {
        event.preventDefault();
       $(this).closest('.content-rest').find('.add-dish-holder').show();
    });
    $('#rest-cook-boss .add-dish-holder .white').click(function(event) {
        event.preventDefault();
       $(this).closest('.add-dish-holder').hide();
    });

     $('#rest-special-proposal .add-dish').click(function(event) {
        event.preventDefault();
       $(this).closest('.content-rest').find('.add-dish-holder').show();
    });
    $('#rest-special-proposal .add-dish-holder .white').click(function(event) {
        event.preventDefault();
       $(this).closest('.add-dish-holder').hide();
    });

});

function userProfileInitComplaints() {
    $('.personal-user .my-complaints').click(function() {
        $(this).closest('.testimonial-holder').next('.personal-user #restaurants-complaints').toggle();
    });
}

function initInlineDateTimePicker() {
    if($('#datetimepicker2').length) {
        var active_dates = ["21/5/2014","25/5/2014"];
        //var nowDate = new Date();
        //var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $("#datetimepicker2").datepicker({
            //startDate: today,
            weekStart: 1,
            inline: true,
            sideBySide: true,
            format: "dd/mm/yyyy",
            todayHighlight: true,
            beforeShowDay: function(date){
                var d = date;
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();
                var formattedDate = curr_date + "/" + curr_month + "/" + curr_year

                if ($.inArray(formattedDate, active_dates) != -1){
                    return {
                        classes: 'active day'
                    };
                }
                return;
            }
        }).datepicker('setDate', new Date());
    }
}

function initOrderSelects() {
    $('.selectpicker-person').selectpicker('refresh');
    $('.selectpicker').selectpicker('refresh');
}

function getModalWindow() {
    if(  $(window).width() < 1024) {
        $('button.multiselect').click(function() {
            $(this).removeAttr('data-toggle').removeClass().addClass('btn-primary').addClass('btn').attr("data-toggle", "modal").attr("data-target", ".bs-example-modal-lg").attr("data-role", "modal-button");
        });
        $('.modal').click(function() {
            $(".btn-group button[data-role='modal-button']").removeAttr("data-toggle").removeAttr("data-target").removeClass().addClass('multiselect').addClass('dropdown-toggle').addClass('btn-default').addClass('btn').attr("data-toggle", "dropdown");
        });
        $( '.select-component .dropdown a' ).click(function( event ) {
            event.preventDefault();
        });
        $('.select-component .dropdown').click(function() {
            $('.select-component .dropdown a').removeAttr("data-toggle");
            $(this).removeClass('.dropdown').addClass('btn-primary').addClass('btn').attr("data-toggle", "modal").attr("data-target", ".bs-example-modal-lg").attr("data-role", "modal-drop");
        });
        $('.modal').click(function() {
            $(".select-component button[data-role='modal-drop']").removeClass('btn-primary').removeClass('btn').removeAttr("data-toggle").removeAttr("data-target").addClass('dropdown');
            $('.select-component .dropdown a').attr("data-toggle");
        });
    }
}

function initModalCartCheckout() {
    $('.order-modal-lg .checkout').click(function() {
        setTimeout(function(){
            $('body').addClass('modal-open');
        }, 500);
    });
    $('#bytime').click(function() {
        $('.checkout-modal .select-oclock').addClass('active');
    });
    $('#fast').click(function() {
        $('.checkout-modal .select-oclock').removeClass('active');
    });

    $('#delivery-card .common-basket .busket').click(function() {
        $('#delivery-card .common-basket .text-block').toggleClass('active');
    });
    $('#delivery-card .common-basket .close').click(function() {
        $('#delivery-card .common-basket .text-block').removeClass('active');
    });
}

function readMoreComments() {

    $('.text-bottom .turn').click(function() {
        $(this).closest('.text-bottom').find('.wrapper-text').removeClass('active');
        $(this).hide();
        $(this).siblings('.read-all').show();
    });
    $('.text-bottom .read-all').click(function() {
        $(this).closest('.text-bottom').find('.wrapper-text').addClass('active');
        $(this).hide();
        $(this).siblings('.turn').show();
    });


    $('.item-topic.answer .turn').click(function() {
        $(this).closest('.text').find('.wrapper-text-answer').removeClass('active');
        $(this).hide();
        $(this).siblings('.read-all').show();
    });
    $('.item-topic.answer .read-all').click(function() {
        $(this).closest('.text').find('.wrapper-text-answer').addClass('active');
        $(this).hide();
        $(this).siblings('.turn').show();
    });

    $('.bottom-features .hide-comment').click(function() {
        $(this).text(function(i, v){
            return v === 'Читать полностью' ? 'Скрыть' : 'Читать полностью'
        });
        $(this).closest('.item-topic-block').find('.read-all').toggle();
        $(this).closest('.item-topic-block').find('.wrapper-text').toggleClass('active');
        $(this).closest('.bottom-features').css('margin-top', '-1px');

    });

    $('#cooking-boss .write-testimonial').click(function() {
        $('#cooking-boss .write-recal').show();
    });

    $('.text .turn').click(function() {
        $(this).closest('.text').find('.wrapper-text').removeClass('active read-all-active');
        $(this).hide();
        $(this).siblings('.read-all').show();
    });
    $('.text .read-all').click(function(event) {
        event.preventDefault();
        var text = $(this).closest('.text').find('.wrapper-text');
        if(text.hasClass('active')) return;
        text.addClass('active read-all-active');
        $(this).hide();
        $(this).siblings('.turn').show();
    });
    /*if($('input[type=file]').length) {
        $('input[type=file]').fileinput();
    }*/

    $('#complaints .img-wrapper img').click(function() {
        $(this).toggleClass('active-img');
    });

    $('.function-user .ask').click(function() {
        var msgBlock = $(this).closest('.item-topic-block')
        if(msgBlock.find('.answer-user-block-show').length){
            msgBlock.find('.answer-user-block-show').show();
        } else {
            msgBlock.append($('.features-block-wrapper > .answer-user-block-show').clone(true).show());
        }
    });

    $('.answer-user-block-show .cansel').on('click',function(event) {
        $(event.currentTarget).closest('.answer-user-block-show').hide();
        console.log('.cansel');
    });

    $('.function-user > .write-comment').click(function () {
        $(this).closest('.start-content').find('.childrens').find('.item-topic.answer').toggle()
    });

    $('.item-topic-block .write-comment').click(function() {
        $(this).closest('.item-topic-block').next().find('.item-topic.answer').toggle();
    });
    $('.item-topic-block .write-comment').click(function() {
        $(this).closest('.item-topic-block').next('.item-topic-block.answer').toggle(300);
    });

    $('.complains-block .write-comment').click(function() {
        $(this).closest('.complains-block').siblings('.item-topic-block').toggle();
    });

    $('#complaints .write-testimonial').click(function() {
        $('.write-recal').show(400);
        $('.write-recal').insertBefore('#complaints .start-content');
    });
    $('#complaints .write-recal button[type="reset"]').click(function() {
        $('.write-recal').hide(400);
    });

    $('#complaints .function-user .read-more').click(function(event) {
        console.log('read more');
        event.preventDefault();
        var text = $(this).closest('.right-block').find('.text .wrapper-text');
        if(text.hasClass('read-all-active')) return;
        $(this).text(function(i, v){
            return v === 'Читать полностью' ? 'Скрыть' : 'Читать полностью'
        });
        $(this).closest('.right-block').find('.read-all').toggle();
        text.toggleClass('active');
        // $(this).closest('.right-block').find('.read-all').toggle();
    });
}

function rebuildMultiSelect() {
    setTimeout(function () {
        $('[multiple]').each(function(indx, element){
            $(element).multiselect({nonSelectedText: $(element).attr('data-text')});
            $(element).parent().find('ul li').each(function(index,elm){
                $(elm).find('label').append('<span></span>');
            });
        });
    }, 200);
}

function initSetTypeRegister() {
    $('.button-block > button').click(function(event) {
        event.preventDefault();
        var $this = $(this);
        $('.button-block > button').removeClass('active');
        $this.addClass('active');
        if ($(this).hasClass('for-user')) {
            $('.conditions > a').text('Пользовательского соглашения').attr("href", "contract");
            $('.registration-modal .registration-number').hide();
            $('.registration-modal .promo-item').show();

        }  else if ($(this).hasClass('for-restaurant')) {
            $('.conditions > a').text('Оферты').attr("href", "oferta");
            $('.registration-modal .promo-item').hide();
            $('.registration-modal .registration-number').show();
        }
    });
}

function initDinnerModal() {
    setTimeout(function () {
        $('.restaurant-menu .see-more').click(function(e) {
            e.preventDefault();
            $(this).closest('.restaurant-menu-block').siblings('.modal-restaurant-menu').modal();
        });
    }, 200);
}

function initIndexPage() {

    initSetTypeRegister();

    $('.menu-toggle').click(function() {
        $('.mobile-show').toggle();
    });

    setTimeout(function () {
        $('.restaurants-block .parametrs.one').click(function() {
            $('button.parametrs.one').toggleClass('active-block');
            $('.select-mobile.one').toggleClass('active-block');
            $('.search-block').removeClass('active-block');
            $('.search').removeClass('active-block');
        });
        $('.select-mobile .close-menu').click(function() {
            $('.restaurants-block .parametrs.one').removeClass('active-block');
            $('.select-mobile.one').removeClass('active-block');

        });

        $('.search-block .close-menu').click(function() {
            $('.search-block').removeClass('active-block');
            $('.search').removeClass('active-block');
        });

        $('button.parametrs.two').click(function () {
            $('div.select-mobile.two').show(200);
        });

        $('.restaurants-block .parametrs.two').click(function() {
            $('.delivery button.parametrs.two').toggleClass('active-block');
            $('.select-mobile.two').toggleClass('active-block');
        });
        $('.select-mobile.two .close-menu').click(function() {
            $('.restaurants-block .parametrs.two').removeClass('active-block');
            $('.select-mobile.two').removeClass('active-block');
        });

        $('.search').click(function() {
            $('.search').toggleClass('active-block');
            $('.search-block').toggleClass('active-block');
            $('.restaurants-block .parametrs.one').removeClass('active-block');
            $('.select-mobile.one').removeClass('active-block');
        });
    }, 200);
}

function initRestaurantCard() {
    setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
    }, 200);
    $('.statistics-block .title').click(function(event) {
        $(this).next('.dropdown-menu').toggle();
        $(this).closest('.dropdown').toggleClass('open');
    });
    
    $('footer .menu-top button').click(function() {
        $('footer .menu-top button').toggleClass('active-block');
    });

    loadScript('js/flipclock.min.js', function () {
        if ($('#countdown').length) {
            $('#countdown').FlipClock(7200, {
                countdown: true,
                language: 'ru-ru'
            });
        }
        if ($('#countdown-2').length) {
            $('#countdown-2').FlipClock(7200, {
                countdown: true,
                language: 'ru-ru'
            });
        }
    });
}

function initListStructure() {
    if ($(window).width() > 1200) {
        $('.list-structure .dropdown').click(function(event) {
            setTimeout(function(){
                if($('.list-structure .dropdown-menu.active-open').length) {
                    $('.empty-block').fadeIn(700);
                } else {
                    $('.empty-block').fadeOut(700);
                }
            }, 100);

        });
    }
    $('.list-structure .dropdown a ').click(function (event) {
        event.preventDefault();
    });

    $('.list-structure .dropdown').click(function () {
        /*
        event.preventDefault;
        $('.list-structure .dropdown .dropdown-menu').removeClass('active-open');

         if($(this).find('.dropdown-menu.active-open').length) {
         $(this).find('.dropdown-menu').removeClass('active-open');
         }
         $(this).find('.dropdown-menu').addClass('active-open');*/
        $('.list-structure .dropdown > ul').not($(this).children("ul").toggleClass('active-open').toggle(600)).hide().removeClass('active-open');

    });

    if (  767 < $(window).width() < 1200) {
        $('.list-structure .dropdown a').click(function(event) {
            setTimeout(function(){
                if($('.list-structure .dropdown.open').length) {
                    $('.empty-block.tablets').show();
                } else {
                    $('.empty-block.tablets').hide();
                }
            }, 100);
        });
        $('.btn-danger').popover();
    }

    $('#delivery-card .count button').click(function (e) {
        e.preventDefault;
        $(this).siblings('#delivery-card .dropdown-order').toggle();
        $('.basket-backdrop').show();
    });
    $('.basket-backdrop').click(function () {
        $('#delivery-card .dropdown-order').hide();
        $('.basket-backdrop').hide();
    });
    
    $('#delivery-card .selection-dish-inner img').hover(function() {
        var currentBlock = $(this).closest('.selection-dish-inner');
        var detailsBlock = $(this).siblings('.details');
        var distanceRight = $(window).outerWidth();
        var rightX = currentBlock.offset().left + currentBlock.outerWidth();
        var defineDistance = distanceRight - rightX;
        var widthHoverBlock = detailsBlock.outerWidth();

        if (widthHoverBlock > defineDistance) {
            detailsBlock.addClass('left');
        }
        detailsBlock.show();
    });
    $('#delivery-card .selection-dish-inner img').mouseleave(function() {
        $(this).siblings('.details').removeClass('left').hide();
    });
}