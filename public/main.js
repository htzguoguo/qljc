/**
 * Created by Administrator on 2017/4/13.
 */

var $ = require( 'jquery' ),
    _ = require( 'underscore' ),
    BackBone = require( 'backbone' ),
    App = require( './app' );

global.$ = $;
global.jQuery = $;
BackBone.$ = $;

require( './assets/js/plugins/loaders/pace.min' );
require( './assets/js/core/libraries/bootstrap.min' );
require( './assets/js/plugins/loaders/blockui.min.js' );
require( './assets/js/plugins/ui/nicescroll.min.js' );
require( './assets/js/plugins/ui/drilldown.js' );

require( './assets/js/core/libraries/jquery_ui/core.min' );
require( './assets/js/plugins/forms/styling/uniform.min.js' );

require( './assets/js/plugins/backstretch/jquery.backstretch.min' );
require( './assets/js/plugins/jquery-validation/js/jquery.validate' );
require( './assets/js/plugins/forms/selects/select2.min' );
require( './assets/js/plugins/forms/selects/bootstrap_multiselect' );


require( './assets/js/plugins/forms/selects/selectboxit.min' );
require( './assets/js/plugins/forms/selects/bootstrap_select.min' );
require( './assets/js/plugins/notifications/sweet_alert.min' );
require( 'pnotify' );
require( './assets/js/plugins/pickers/datepicker' );
require( './assets/js/core/app' );
require( './assets/js/pages/colors_brown' );
 /*
    &lt;!&ndash; /core JS files &ndash;&gt;

&lt;!&ndash; Theme JS files &ndash;&gt;
<script type="text/javascript" src="assets/js/core/libraries/jquery_ui/core.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/forms/styling/uniform.min.js"></script>

    &lt;!&ndash;  <script type="text/javascript" src="../assets/js/plugins/forms/styling/switchery.min.js"></script>&ndash;&gt;

<script type="text/javascript" src="assets/js/plugins/forms/selects/select2.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
    <script type="text/javascript" src="assets/js/plugins/forms/selects/selectboxit.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/forms/selects/bootstrap_select.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notifications/pnotify.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notifications/noty.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/notifications/jgrowl.min.js"></script>

    <script type="text/javascript" src="assets/js/plugins/backstretch/jquery.backstretch.min.js"></script>
    <script src="assets/js/plugins/jquery-validation/js/jquery.validate.js" type="text/javascript"></script>

    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/interactions.min.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/widgets.min.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/effects.min.js"></script>
    <script type="text/javascript" src="assets/js/plugins/extensions/mousewheel.min.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/globalize/globalize.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/globalize/cultures/globalize.culture.de-DE.js"></script>
    <script type="text/javascript" src="assets/js/core/libraries/jquery_ui/globalize/cultures/globalize.culture.ja-JP.js"></script> */

$( document ).ready( function () {
    "use strict";
    $(document).ajaxError(function (event, xhr) {
        if (xhr.status === 401)
            console.log( 'ajaxError' );
            window.location = '#login';
    });

    App.start();
    //global.window.app.start();
} );
