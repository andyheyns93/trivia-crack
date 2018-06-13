var TriviaProcessorController = (function () {
    var me = {};
    var internal = {};

    me.processGame = function (gameData,isCrown,category,index) {
        var game = new Game(gameData);
        if(gameData.length == 2){
            if(isCrown){
                return game.getCrownAnwser(category);
            }
            return game.getDuelAnwser(index);
        }else{
            return game.getNormalAnwser();
        }
    };

    return me;
})();