function Game(json) {
    this.game = json;
}

Game.prototype.getNormalAnwser = function () {
    var questionObj = this.game[0].questions[0]
    return questionObj.question.answers[questionObj.question.correct_answer];
};

Game.prototype.getCrownAnwser = function (category) {
    var questionObj = this.game[0].questions.find(x => x.question.category == category && x.powerup_question.category == category && x.second_chance_question.category == category)
    return questionObj.question.answers[questionObj.question.correct_answer];
};

Game.prototype.getDuelAnwser = function (index) {
    var questionObj = this.game[1].questions[index];
    return questionObj.question.answers[questionObj.question.correct_answer];
};