

TriviaConfig.loadAccountId();

$(document).ready(function () {
    if ('onhashchange' in window) {
        window.addEventListener('hashchange', getHashValue, false);
        function getHashValue() {
            if (window.location.hash.indexOf('#game/') > -1) {
                this.continueInterval;

                this.duelIndex = 0;
                this.isDuel = false;

                this.fnContinue = function () {
                    var button = $('button span[data-abjson="continue_"]').closest('button');
                    if (button.length > 0) {
                        button.bind("click", function () {
                            button.unbind('click');

                            TriviaGameController.fnUnHookEvents.bind(this)();
                            TriviaGameController.fnHookEvents.bind(this)();
                            TriviaGameViewController.destroy();

                            setTimeout(function () {
                                this.continueInterval = setInterval(this.fnContinue, 100);
                            }, 500);

                            if (this.isDuel) {
                                //NEXT ANWSER
                                this.duelIndex = this.duelIndex + 1;
                                TriviaGameController.nextDuelAnwser.bind(this)(this.duelIndex);

                                if (this.duelIndex == 5) {
                                    this.duelIndex = 0;
                                    this.isDuel = false;
                                }
                            }
                        }.bind(this));
                        clearInterval(this.continueInterval);
                    }
                }
                this.continueInterval = setInterval(this.fnContinue, 100);
                TriviaGameController.fnHookEvents.bind(this)();

                $.getJSON("http://api.preguntados.com/api/users/" + TriviaConfig.getAccountId() + "/games/" + TriviaConfig.getGameId(), function (json) {
                    console.log(json);
                });
            }


        }
    }
});