/**
 * Created by Administrator on 2017/4/14.
 */
var
    Base = require( '../../../utils/modelview' ),
    LoginAccount = require( '../models/loginaccount' ),
    UserSession = require( '../models/usersession' ),

    LoginOAuth = require( '../models/loginoauth' ),
    LoginSession = require( '../../login/models/loginsession' ),

    fs = require( 'fs' ),
    template = fs.readFileSync( __dirname + '/templates/login.html', 'utf8' ),
    userSession = new UserSession(),
    jqueryMap, setJqueryMap;

setJqueryMap = function (  ) {
    "use strict";
    jqueryMap = {
       /* $menu : $( '.tjx-top-first-menu' ),
        $booter : $( '.tjx-bottom-booter' ),
        $main_container : $( '#tjx-shell-main' )*/
    }
};
setJqueryMap();

module.exports = Base.extend( {
    template :  template  ,
    initialize : function () {
        "use strict";

      /*  jqueryMap.$menu.hide();
        jqueryMap.$booter.hide();
        jqueryMap.$main_container.hide();*/

        this.model = userSession;
       /* if ( userSession.authenticated() ) {
            this.viewModel = userSession;
        }else {
            this.viewModel = {};
        }*/

    },
    render : function () {
        "use strict";
        var result = Base.prototype.render.call( this );
        this.initUI();
        return result;
    },
    initUI : function () {
        "use strict";

        $('.forget-form').hide();
        $('.login-bg').backstretch([
                "assets/apps/images/login/bg1.jpg",
                "assets/apps/images/login/bg2.jpg",
                "assets/apps/images/login/bg3.jpg"
            ], {
                fade: 1000,
                duration: 8000
            }
        );

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
           /* errorClass: 'help-block', // default input error message class*/

            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "用户名不能为空."
                },
                password: {
                    required: "密码不能为空."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                $('.alert-danger span.text-semibold', $('.login-form')).html('请输入用户名和密码');
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element, errorClass) {

                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass('has-error');
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
               /* error.insertAfter(element.closest('.input-icon'));*/
                error.insertAfter(element);
            }
        });
    },
    events : {
        'click .ok' : 'login',
        'click #forget-password' : 'forgetpassword',
        'click #back-btn' : 'forgetpasswordback'

    },
    forgetpasswordback : function () {
        "use strict";
        $('.login-form').show();
        $('.forget-form').hide();
    },
    forgetpassword : function () {
    "use strict";
        $('.login-form').hide();
        $('.forget-form').show();
    },
    login : function () {
        "use strict";


        if ( ! $('.login-form').validate().form()) {
            return;
        }



        var name = this.$( '.name' ).val(),
            pw = this.$( '.pw' ).val(),
            /*user = new LoginAccount( { name : name, pw : pw } ),*/
            userOauth = new LoginOAuth( { username : name, password : pw } ),
            chk = this.$( '.remember-password' ).prop("checked"),
            $error = this.$( '.error' );

        userOauth.login( function ( auth ) {
             if ( auth.error )
             {
                 $('.alert-danger span.text-semibold', $('.login-form')).html( auth.error.message );
                 $('.alert-danger', $('.login-form')).show();
             }
             else
             {
                 if (  auth.status === 'online' ) {
                     /*var accessToken = response.access_token;
                     var tokenType = response.token_type;

                     App.saveAuth(tokenType, accessToken);*/

                     var accessToken = auth.access_token,
                         tokenType = auth.token_type;
                     LoginSession.saveAuth( tokenType, accessToken );

                    /* if ( chk ) {
                         userSession.save( { name : name, accessToken : pw } );
                     }else {
                         userSession.destory( );
                     }*/
                     window.app.router.navigate('projects', {trigger: true});
                 }
                 else {
                     $('.alert-danger span.text-semibold', $('.login-form')).html('用户名或者密码错误');
                     $('.alert-danger', $('.login-form')).show();
                 }
             }

        } );
    }
} );


