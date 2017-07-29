/**
 * Created by Administrator on 2017/7/21.
 */

var Backbone = require( 'backbone' ),
    _ = require( 'underscore' ),
    Bridge;

Bridge = module.exports = Backbone.Model.extend(
    {
        urlRoot : 'api/v1/bridges',
        idAttribute: 'bridgename',
        defaults : {
            filldate : (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
        },
        toJSON : function () {
            var result = Backbone.Model.prototype.toJSON.call( this );
            this.initFillDate( result );
            this.initStructures( result );
            this.initBridgeRating( result );
            return result;
        },
        initBridgeRating : function ( result ) {
            var rat = this.get( 'technicalstatusassessment' );
            if (  _.isArray( rat ) && rat.length > 0 ) {
                console.log( rat );
                result.bridgerating = rat[ rat.length - 1 ].bridgerating;
            }
        },
        initFillDate : function ( result ) {
            if ( ! _.isEmpty( this.get( 'filldate' ) ) ) {
                var  dt = new Date(Date.parse(this.get( 'filldate' ))) ;
                if ( dt && _.isDate( dt ) ) {
                    result.filldate = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
                }
            }
        },
        initStructures : function ( result ) {
            var above = this.get( 'superstructure' ) || [];
            var blower = this.get( 'lowerstructure' ) || [];
            var i, len, data;
            if ( above.length > blower.length ) {
                len = above.length;
            }else {
                len = blower.length;
            }
            result.structures = [];
            for ( i = 0 ; i < len; i++ ) {
                data = {
                    holenumber : '',
                    /* 跨径(m)*/
                    span : '',
                    /* 形式*/
                    form1 : '',
                    /* 材料*/
                    material1 : '',

                    piers : '',
                    /* 形式(m)*/
                    form2 : '',
                    /* 材料*/
                    material2 : '',
                    /* 基础形式*/
                    basicform : ''
                };
                if ( i < above.length ) {
                    data.holenumber = above[ i ].holenumber;
                    data.span = above[ i ].span;
                    data.form1 = above[ i ].form;
                    data.material1 = above[ i ].material;
                }
                if ( i < blower.length ) {
                    data.piers = blower[ i ].piers;
                    data.form2 = blower[ i ].form;
                    data.material2 = blower[ i ].material;
                    data.basicform = blower[ i ].basicform;
                }
                result.structures[ i ] = data;
            }
        },
        validation : {
            bridgename : {
                required : true,
                msg: '桥梁名称不能为空'
            },
            bridgenumber : {
                required : true,
                msg: '桥梁编号不能为空'
            },
            routename : {
                required : true,
                msg: '线路名称不能为空'
            },
            routenumber : {
                required : true,
                msg: '线路编号不能为空'
            }
        }
    }
);
