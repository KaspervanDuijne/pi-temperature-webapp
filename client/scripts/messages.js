(function(exports){

    exports.T_DATA = "data";
    exports.O_DATA = {
        type : exports.T_DATA,
        cpu: null,
        gpu: null,
    };
    exports.T_RUN = "run";
    exports.O_RUN = {
        type:exports.T_RUN,
        length:0
    }

    //client to server
    // exports.makeMove
})(typeof exports ==="undefined" ? (this.Messages = {}) : exports);