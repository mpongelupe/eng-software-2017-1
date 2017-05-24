/* jshint esversion: 6 */
import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

  constructor () {
    super();
  }

	create() {
		this.game.stage.backgroundColor = '#03A9F4';
    this.timer = this.game.time.create(true);
    this.getQuestions();
    this.currentIndex = 0;
    this.screenElements = []; // so that they can be removed when changing questions
    this.showCurrentQuestion();
    this.setTimer();
	}

	update() {
    this.updateTimerText();
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
      font: "56px Arial", fill: '#ffffff', backgroundColor: '#0288D1',
      align: 'left', wordWrap: true, wordWrapWidth: 1000
    }
    var answerStyle = {
      font: "40px Arial", fill: '#000', align: 'center', wordWrap: true
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
      //Creates button sprites
      var answerButton = this.game.add.sprite(this.game.world.centerX, answerY, 'button');
      answerButton.anchor.set(0.5);

      var answerText = this.game.add.text(0, answerY, obj.resposta,  answerStyle);
      answerText.wordWrapWidth = answerButton.width - 20;
      answerText.anchor.set(0.5);

      var answerHeight = answerButton.height;
      // test if the height of the text is too close to the button Default height
      if(answerText.height > answerHeight - 20) {
        // adjusts the button positioning according to the button height
        answerButton.height = answerText.height + 20;
        answerButton.y = answerY + 0.5*(answerButton.height - answerHeight);

        answerText.setTextBounds( undefined, undefined, answerButton.width-20, answerButton.height);
        answerText.alignTo(answerButton, Phaser.MIDDLE_CENTER);

        answerText.y = answerY + 0.5*(answerButton.height - answerHeight);

      } else {

        answerText.setTextBounds( undefined, undefined, answerButton.width-20, answerButton.height);
        answerText.alignTo(answerButton, Phaser.MIDDLE_CENTER);

        answerText.y = answerY;
      }

      answerText.x = answerText.x + 20;
      answerText.useAdvancedWrap = true;

      var callback = obj.certa ? this.correctAnswer : this.wrongAnswer;

      answerText.inputEnabled = true;
      answerButton.inputEnabled = true;

      answerText.events.onInputDown.add(callback, this);
      answerButton.events.onInputDown.add(callback, this);

      this.screenElements.push(answerText);
      this.screenElements.push(answerButton);

      answerY += answerPadding + answerButton.height;
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

  timeOverAnswer () {
    alert('O seu tempo acabou... :(');
    this.game.state.start("GameOver");
  }

  showNextQuestion () {
    this.currentIndex++;
    this.timer.destroy();
    if (this.currentIndex >= this.questions.length) {
      this.game.state.start("GameOver");
    } else {
      this.showCurrentQuestion();
      this.setTimer();
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

  setTimer () {
    const TIMER_COUNTER = 50;
    this.timer.loop(Phaser.Timer.SECOND * TIMER_COUNTER, this.timeOverAnswer, this);
    this.timer.start();

    var x = this.game.world.centerX - 52;
    var timerY = 1350;
    var timerStyle = {
      font: "96px Arial", fill: '#212121', fontWeight: 'bold',
      backgroundColor: '#FFC107', align: 'centered', wordWrap: true, wordWrapWidth: 1000
    }

    var count = Math.round(this.timer.duration / 1000);
    count = (count < 10) ? ("0" + count) : count;

    this.timerText = this.game.add.text(x, timerY, count,  timerStyle);
    this.screenElements.push(this.timerText);

  }

  updateTimerText() {
    var count = Math.round(this.timer.duration / 1000);
    count = (count < 10) ? ("0" + count) : count;
    this.timerText.setText(count);
  }
}

export default Main;
