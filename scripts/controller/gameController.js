var TriviaGameController = (function () {
    var me = {};

    var internal = {
        isCrown: false,
        category: undefined
    };

    internal.setNormal = function () {
        internal.isCrown = false;
        internal.category = undefined;
    }
    internal.setCrown = function (category) {
        internal.isCrown = true;
        internal.category = category;
    }

    internal.setDuel = function (index) {
        internal.isCrown = false;
        internal.index = index;
    }

    internal.fnAnwsers = function () {
        $.getJSON("http://api.preguntados.com/api/users/" + TriviaConfig.getAccountId() + "/games/" + TriviaConfig.getGameId(), function (json) {
            TriviaGameViewController.destroy();
            TriviaGameViewController.create();
            var anwser = TriviaProcessorController.processGame(json.spins_data.spins, internal.isCrown, internal.category, internal.index);
            TriviaGameViewController.process(anwser);
        });
    }


    me.fnUnHookEvents = function () {
        var normalButton = $('.modal-container > .container > .row > div > button span[data-abjson="play"]').closest('button');
        var crownButton = $('form.select-category-form > button > span[data-abjson="play"]').closest('button');
        var duelButton = $('form.form-duel > button > span[data-abjson="play"]').closest('button');

        normalButton.unbind('click');
        crownButton.unbind('click');
        duelButton.unbind('click');
    }

    me.fnHookEvents = function () {

        var normalComponentInterval;
        var crownComponentInterval;
        var duelComponentInterval;

        normalComponentInterval = setInterval(function () {
            var button = $('.modal-container > .container > .row > div > button span[data-abjson="play"]').closest('button');
            if (button.length == 1) {
                button.bind("click", function () {
                    //NORMAL
                    button.unbind('click');
                    internal.setNormal();
                    internal.fnAnwsers();
                });
                clearInterval(normalComponentInterval)
            }
        }, 200);

        crownComponentInterval = setInterval(function () {
            var button = $('form.select-category-form > button > span[data-abjson="play"]').closest('button');
            if (button.length == 1) {
                button.bind("click", function () {
                    //IS CROWN
                    button.unbind('click');
                    var category = $("form.select-category-form").serialize().split('=')[1].toUpperCase();
                    internal.setCrown(category);
                    internal.fnAnwsers();
                });
                clearInterval(crownComponentInterval)
            }
        }, 200);

        duelComponentInterval = setInterval(function () {
            var button = $('form.form-duel > button > span[data-abjson="play"]').closest('button');
            if (button.length == 1) {
                button.bind("click", function () {
                    //IS DUEL
                    button.unbind('click');

                    this.isDuel = true;
                    internal.setDuel(this.duelIndex);
                    internal.fnAnwsers();
                }.bind(this));
                clearInterval(duelComponentInterval)
            }
        }, 200);
    }

    me.nextDuelAnwser = function (index) {
        internal.setDuel(index);
        internal.fnAnwsers();
    }

    return me;
})();