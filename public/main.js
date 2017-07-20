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


var dataTable = require( 'datatables.net' )();
$.DataTable = dataTable;
$.extend( $.fn.dataTable.defaults, {
    autoWidth: false,
    sort : false,
    responsive: true,
    columnDefs: [{
        orderable: false,
        width: '100px',
        targets: [ 5 ]
    }],
    dom: '<"datatable-header"fl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
    language: {
        search: '<span></span> _INPUT_',
        lengthMenu: '<span></span> _MENU_',
        paginate: { 'first': '首页', 'last': '末页', 'next': '&rarr;', 'previous': '&larr;' },
        zeroRecords: "没有满足条件的内容",
        infoEmpty: "没有满足条件的内容",
        emptyTable: "当前没有满足条件的内容",
        info: "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
        infoFiltered: "(当前共有 _MAX_ 条记录)"
    },
    drawCallback: function () {
        $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
    },
    preDrawCallback: function() {
        $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
    }
});


require( './assets/js/plugins/loaders/pace.min' );
require( './assets/js/core/libraries/bootstrap.min' );
require( './assets/js/plugins/loaders/blockui.min.js' );
require( './assets/js/plugins/ui/nicescroll.min.js' );
require( './assets/js/plugins/ui/drilldown.js' );

require( './assets/js/core/libraries/jquery_ui/core.min' );
require( './assets/js/plugins/forms/styling/uniform.min.js' );

require( './assets/js/plugins/backstretch/jquery.backstretch.min' );
require( './assets/js/plugins/jquery-validation/js/jquery.validate' );

require( './assets/js/plugins/forms/selects/bootstrap_multiselect' );


require( './assets/js/plugins/forms/selects/select2.min' );

require( './assets/js/plugins/forms/selects/selectboxit.min' );
require( './assets/js/plugins/forms/selects/bootstrap_select.min' );
require( './assets/js/plugins/notifications/sweet_alert.min' );
require( 'pnotify' );
require( './assets/js/plugins/pickers/datepicker' );


require( './assets/js/plugins/pickers/pickadate/picker' );
require( './assets/js/plugins/pickers/pickadate/picker.date' );
require( './assets/js/plugins/pickers/pickadate/translations/zh_CN' );

require( './assets/js/pages/colors_brown' );


$.fn.DataTable = dataTable;

$( document ).ready( function () {
    "use strict";
    $(document).ajaxError(function (event, xhr) {
        if (xhr.status === 401)
            console.log( 'ajaxError' );
            window.location = '#login';
    });

    App.start();
    //global.window.app.start();
    require( './assets/js/core/app' );

} );
