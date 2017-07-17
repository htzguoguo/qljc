/**
 * Created by Administrator on 2017/5/26.
 */

var PNotify = require( 'pnotify' );


module.exports = {
    askConfirmation : function (message, isAutoClose, callback) {
    var options = {
        title: "提示：",
        // Show the warning icon
        type: 'warning',
        text: message,
        // By default the cancel button is not shown
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        // Overwrite the default button color
        confirmButtonColor: '#5cb85c',
        closeOnConfirm: isAutoClose,
        closeOnCancel: true
    };
    // Show the message
    swal(options, function(isConfirm) {
        callback(isConfirm);
    });
},

    successMessage : function(message) {
        swal({
            title: "提示：",
            text: message,
            confirmButtonColor: "#66BB6A",
            type: "success"
        });
    },

    errorMessage : function(message) {
        swal({
            title: "提示：",
            text: message,
            confirmButtonColor: "#EF5350",
            type: "warning"
        });
    },

    notifyProgress : function ( message ) {
        var notice = new PNotify({
            text: "Please wait",
            addclass: 'bg-primary',
            type: 'info',
            icon: 'icon-spinner4 spinner',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            opacity: .9,
            width: "170px"
        });
    },

  notifySuccess : function  (message) {
      var notice = new PNotify({
          title: "提示：",
          text: message,
          addclass: 'alert alert-styled-left alert-arrow-left',
          type: 'info',
          buttons: {
              closer_hover: false

          }
      });
      notice.get().click(function() {
          notice.remove();
      });

},

  notifyError : function (message) {
      var notice = new PNotify({
          title: "提示：",
          text: message,
          addclass: 'alert alert-styled-left alert-arrow-left',
          type: 'error',
          buttons: {
              closer_hover: false

          }
      });
      notice.get().click(function() {
          notice.remove();
      });
}
};