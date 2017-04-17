module.exports = function (RED) {
    'use strict';

    RED.nodes.registerType(
        'initialstate',

        function (config) {

            RED.nodes.createNode(this, config);

            var node = this;

            node.credentials = {
                bucketKey: {type: 'text'},
                accessKey: {type: 'text'}
            };

            var IS = require('initial-state');

            var bucket =
                IS
                .bucket(config.bucketKey, config.accessKey)
                .on('error', function (e) {
                    node.status({fill:"red", shape:"dot", text:e.message});
                })
                .on('ready', function (e) {
                    node.status({fill:"green", shape:"dot", text:'Connected'});
                });

            node.on('input', function (msg) {
                var key = msg.topic;
                var date = undefined;
                var type = typeof msg.payload;
                var value;

                if ('object' === type) {
                    if ( undefined !== msg.payload['key'] ) {
                        key = msg.payload['key'];
                    }
                    if ( undefined !== msg.payload['value'] ) {
                        value = msg.payload['value'];
                    }
                    if ( undefined !== msg.payload['date'] ) {
                        date = msg.payload['date'];
                    }
                }
                else if ('string' === type || 'number' === type) {
                    value = msg.payload;
                }

                if (undefined === value) {
                    node.error("Bad payload type");
                }
                else {
                    bucket.push(key, value, date);
                }
            });
        },

        {
            credentials: {
                bucketKey: {type: 'text'},
                accessKey: {type: 'text'}
            }
        }
    );
};
