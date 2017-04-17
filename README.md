# node-red-contrib-initialstate

This [https://nodered.org/](Node-RED) node may be used for passing data
points to [https://initialstate.com](Initial State) for graphing and
analysis.

The node pushes an event to an Initial State bucket.

Simply, `msg.topic` is passed as the data event _key_, while `msg.payload`
is passed as the data event _value_ if it is a string or number.

Alternatively, `msg.payload` may be an object containing at least `value`,
and optionally `key`, and/or `date` to override the topic and the current
timestamp.

Error handling is rudimentary at this time.  The successful connection of
the node to Initial State should be handled, but failed data event pushes
are not detected.

# Installation

Change directory to your node red installation:
```
    npm install node-red-contrib-initialstate
```
or alternatively, use the Palette Manager in Node-RED.

# Configuration

Each node should be configured with a Bucket Key and an Access Key as
supplied by Initial State during the setup procedure for a Bucket.

There is no shared configuration node at this time.
