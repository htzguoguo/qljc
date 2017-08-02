/**
 * Created by Administrator on 2017/7/18.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Project;

Project = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/projects',
        idAttribute: 'projectname',
        brs : {},
        bridges : [],
        defaults : {
            createtime : (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate(),
            bridges : []
        },
        initialize : function () {
            this.bridges = this.get( 'bridges' );
            this.brs = {};
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            if ( ! _.isEmpty( this.get( 'createtime' ) ) ) {
             var  dt = new Date(Date.parse(this.get( 'createtime' ))) ;
                if ( dt && _.isDate( dt ) ) {
                    result.createtime = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
                }
            }
            return result;
        },
        setDefaultBridges : function ( bridges )  {
            var   units = [], custodyunit, bm, me = this, i, checked = false;
                _.each(bridges, function( bridge ) {
                custodyunit = bridge['custodyunit'];
                if (  custodyunit ) {
                    checked = false
                    for ( i = 0; i < me.bridges.length; i++ ) {
                        if ( bridge[ 'id'] === me.bridges[i]['id']  ) {
                            checked = true;
                            break;
                        }
                    }
                    bm = { id : bridge['id'], bridgename : bridge['bridgename'], custodyunit : bridge['custodyunit'], checked : checked };
                    if ( units.indexOf( custodyunit ) === -1 ) {
                        units.push( custodyunit );
                        me.brs[ custodyunit ] = [ bm ];
                    }else {
                        me.brs[ custodyunit ].push( bm );
                    }
                }
            } );
            this.set( 'units', units );
        },
        selectBridges : function ( unit ,items ) {
            var i1, len1 = items.length, items2, i2, len2;
            items2 = this.brs[ unit ];
            len2 = items2.length;
            for ( i1 = 0; i1 < len1; i1++ ) {
                for ( i2 = 0; i2 < len2; i2++ ) {
                    if ( items[i1].id === items2[ i2 ].id ) {
                        items2[ i2 ].checked = true;
                        break;
                    }
                }
            }
        },
        unselectBridges : function ( unit ,items ) {
            var i1, len1 = items.length, items2, i2, len2;
            items2 = this.brs[ unit ];
            len2 = items2.length;
            for ( i1 = 0; i1 < len1; i1++ ) {

                for ( i2 = 0; i2 < len2; i2++ ) {
                    if ( items[i1].id === items2[ i2 ].id ) {
                        items2[ i2 ].checked = false;
                        break;
                    }
                }
            }
        },
        addDefaultBridges : function ( items ) {
            var i1, len1 = items.length, i2, len2, found =false;
            for ( i1 = 0; i1 < len1; i1++ ) {
                len2 = this.bridges.length;
                found = false;
                for ( i2 = 0; i2 < len2; i2++ ) {
                    if ( items[i1].id === this.bridges[ i2 ].id ) {
                         found = true;
                        break;
                    }
                }
                if ( ! found ) {
                    this.bridges.push( items[ i1 ] );
                }
            }
        },
        removeDefaultBridges : function ( items ) {
            var i1, len1 = items.length, i2, len2;
            for ( i1 = 0; i1 < len1; i1++ ) {
                len2 = this.bridges.length;
                for ( i2 = 0; i2 < len2; i2++ ) {
                    if ( items[i1].id === this.bridges[ i2 ].id ) {
                        this.bridges.splice( i2, 1 ) ;
                        break;
                    }
                }
            }
        },
        validation : {
            projectname : {
                required : true,
                msg: '检测项目名称不能为空'
            },
            projectnumber : {
                required : true,
                msg: '项目编号不能为空'
            }
        }
    }
);