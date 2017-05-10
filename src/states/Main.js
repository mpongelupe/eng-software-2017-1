/* jshint esversion: 6 */
import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

  constructor () {
    super();
  }

	create() {
		this.game.stage.backgroundColor = '#cecece';
    this.getQuestions();
    this.currentIndex = 0;
    this.screenElements = []; // so that they can be removed when changing questions
    this.showCurrentQuestion();
	}

	update() {

	}

  // create boxes and texts
  showCurrentQuestion () {
    
    // clear screen from previous answer texts
    this.emptyScreen();

    var x = 20;
    var questionY = 40;
    var answerY = 400;
    var answerPadding = 50;
    var questionStyle = {
      font: "56px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)',
      align: 'left', wordWrap: true, wordWrapWidth: 1000      
    }
    var answerStyle = {
      font: "56px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)',
      align: 'left', wordWrap: true, wordWrapWidth: 1000       
    }

    // question object
    var question = this.questions[this.currentIndex];

    // question text
    var questionText = this.game.add.text(x, questionY, question.pergunta,  questionStyle);
    this.screenElements.push(questionText);

    this.shuffleAnswers(question.respostas);

    // print alternatives on screen
    for (var i in question.respostas) {
      var obj = question.respostas[i];
      var answerText = this.game.add.text(x, answerY, obj.resposta,  answerStyle);
      var callback = obj.certa ? this.correctAnswer : this.wrongAnswer;
      answerText.inputEnabled = true; 
      answerText.events.onInputDown.add(callback, this);
      this.screenElements.push(answerText);

      // adjust height of next alternative
      answerY += answerPadding + answerText.height;
    }
  }

  shuffleAnswers (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // clear screen
  emptyScreen () {
    for (var i in this.screenElements) {
      this.screenElements[i].destroy();
    }
    this.screenElements = [];
  }

  correctAnswer () {
    alert('Resposta correta! :D');
    this.showNextQuestion();
  }

  wrongAnswer () {
    alert('Resposta errada... :(');
    this.game.state.start("GameOver");
  }

  showNextQuestion () {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.game.state.start("GameOver");
    } else {
      this.showCurrentQuestion();
    }
  }

  getQuestions () {
    this.questions = this.game.cache.getJSON('questions').perguntas;
    this.questions.sort(function (a, b) {
      if (a.dificuldade > b.dificuldade) return 1;
      if (a.dificuldade < b.dificuldade) return -1;
      if (a.dificuldade == b.dificuldade) return 0;
    });
  }

}

export default Main;
