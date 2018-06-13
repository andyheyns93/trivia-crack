var TriviaConfig = (function () {
    var me = {};
    var internal = {
        AccountId: undefined,
        isAccountLoaded : false
    };
    //INITIAL LOAD ACCOUNT ID
    me.loadAccountId = function () {
        if (!internal.isAccountLoaded) {
            chrome.storage.sync.get("accountId", function (items) {
                internal.AccountId = items.accountId;
                internal.isAccountLoaded = true;

                //cb(items.accountId);
            });
        }
    };

    me.getAccountId = function () {
        return internal.AccountId;
    };

    me.getGameId = function(){
        return window.location.hash.split('/')[1];
    }

    return me;
})();