/**
 * Created by Administrator on 2017/4/10.
 */

var http = require( 'http' ),
    httpModule = require( './modules/http_module' ),
    port = process.env.PORT || 8180 ;



/*http.createServer(httpModule.Handle_request).listen( port, '127.0.0.1' );*/

http.createServer( httpModule.Handle_request ).listen( port );

console.log( 'Started Node.js http server at http://127.0.0.1:' + port  );


