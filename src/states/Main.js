/* jshint esversion: 6 */
import ExampleObject from 'objects/ExampleObject';

class Main extends Phaser.State {

  constructor () {
    super();

    (this.rankedMode) = true; this.rankedModeText = null;
    this.timerCircle = null;
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
    var questionY = 100;
    var answerY = 600;
    var answerPadding = 50;
    var questionStyle = {
      font: "56px Arial", fill: '#ffffff',
      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
      wordWrap: true, wordWrapWidth: 1000
    };
    var answerStyle = {
      font: "40px Arial", fill: '#000', align: 'center', wordWrap: true,
      boundsAlignH: 'center', boundsAlignV: "middle"
    };
    // question object
    var question = this.questions[this.currentIndex];

    var bar = this.game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, questionY, this.game.world.width, 300);

    var progressCounterStyle = {
      font: "44px Arial", fill: '#000', align: 'right', wordWrap: true,
      boundsAlignH: 'right', boundsAlignV: "middle", fontWeight: "bold"
    };

    var progressText = this.game.add.text(0, 0, this.currentIndex + 1 +"/"+this.questions.length, progressCounterStyle);
    progressText.setTextBounds(0, 0, this.game.world.width-20, questionY);

    var tween = this.game.add.tween(progressText);
    tween.to({ fontSize: 56 }, 400, 'Linear', true, 0, 0, true);
    this.screenElements.push(progressText);

    // question text
    var questionText = this.game.add.text(0, 0, question.pergunta,  questionStyle);
    questionText.setTextBounds(0, questionY, this.game.world.width, 300);
    this.screenElements.push(questionText);

    this.screenElements.push(bar);

    this.shuffleAnswers(question.respostas);

    // print alternatives on screen
    for (var i in question.respostas) {
      var obj = question.respostas[i];
      //Creates button sprites
      var answerButton = this.game.add.sprite(this.game.world.centerX, answerY, 'button');
      answerButton.anchor.set(0.5);

      var answerText = this.game.add.text(0, 0, obj.resposta,  answerStyle);
      answerText.wordWrapWidth = answerButton.width;
      answerText.anchor.set(0.5);

      var answerHeight = answerButton.height;
      // test if the height of the text is too close to the button Default height
      if(answerText.height > answerHeight - 20) {
        // adjusts the button positioning according to the button height
         answerButton.height = answerText.height + 20;
         answerButton.y = answerY + 0.5*(answerButton.height - answerHeight);
      }

      answerText.setScaleMinMax(1,1,1,1);
      answerButton.addChild(answerText);

      var callback = obj.certa ? this.correctAnswer : this.wrongAnswer;

      answerButton.inputEnabled = true;

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
    this.emptyScreen();

    var bar = this.game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, this.game.world.centerY - 300, this.game.world.width, 700);

    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 500, 'check');
	  logo.anchor.setTo(0.5);

    var feedbackStyle = {
      font: "88px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var counterStyle = {
      font: "88px Arial", fill: '#212121', fontWeight: 'bold',
      align: 'center', wordWrap: true, wordWrapWidth: 1000
    };

    var nextTextStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var feedBackMessage = "Parabéns !\nResposta Correta !"

    var feedBackText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, feedBackMessage,  feedbackStyle);
    feedBackText.anchor.set(0.5);

    var counterMessage = "Seu progresso: \n"+(this.currentIndex+1) + "/" + this.questions.length;
    var questionCounterText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, counterMessage,  counterStyle);
    questionCounterText.anchor.set(0.5);

    var nextButton = this.game.add.sprite(this.game.world.centerX,  this.game.world.centerY + 550, 'button');
    nextButton.anchor.set(0.5);

    var nextMessage = "Próxima pergunta";
    var nextText = this.game.add.text(0, 0, nextMessage,  nextTextStyle);
    nextText.wordWrapWidth = nextButton.width;
    nextText.anchor.set(0.5);

    nextButton.addChild(nextText);

    nextButton.inputEnabled = true;
    nextButton.events.onInputDown.add(this.showNextQuestion, this);

    this.screenElements.push(bar);
    this.screenElements.push(logo);
    this.screenElements.push(feedBackText);
    this.screenElements.push(questionCounterText);
    this.screenElements.push(nextButton);
    this.screenElements.push(nextText);

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

  drawTimerRank() {
    if (this.rankedModeText !== null) {
      this.rankedModeText.destroy();
      this.rankedModeText = null;
    }
    var x = this.game.world.centerX;
    var timerY = 1450;
    var timerStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold', align: 'centered', wordWrap: true, wordWrapWidth: 1000
    };

    this.rankedModeText = this.game.add.text(x, timerY + 100, this.rankedMode ? 'modo ranqueado' : 'modo relaxado',  timerStyle);
    this.rankedModeText.anchor.set(0.5);
    this.screenElements.push(this.rankedModeText);
  }

  setTimer () {
    const TIMER_COUNTER = 50;
    this.timer.loop(Phaser.Timer.SECOND * TIMER_COUNTER, this.timeOverAnswer, this);
    this.timer.start();
    this.timerCount = TIMER_COUNTER;


    var x = this.game.world.centerX;
    var timerY = 1450;
    var timerStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold', align: 'centered', wordWrap: true, wordWrapWidth: 1000
    };

    var count = Math.round(this.timer.duration / 1000);
    count = (count < 10) ? ("0" + count) : count;

    this.timerText = this.game.add.text(x, timerY, count,  timerStyle);
    this.timerText.anchor.set(0.5);

    this.timerCircle = this.game.add.graphics();
    this.timerCircle.beginFill(0xFFC107);
    this.timerCircle.drawCircle(this.game.world.centerX, timerY, 100);
    this.timerCircle.addChild(this.timerText);
    this.screenElements.push(this.timerText);
    this.screenElements.push(this.timerCircle);

    this.tweenTimer = this.game.add.tween(this.timerText);
    this.tweenTimer.to({ fontSize: 80 }, 500, "Linear", true, 0, 0, true);
    this.tweenTimer.loop(1000);

    this.drawTimerRank();
    if (this.rankedMode) this.timer.start();
    else this.timer.stop();

    this.timerText.inputEnabled = true;
    this.timerText.events.onInputDown.add(function (){
      this.rankedMode = !this.rankedMode;
      if (this.rankedMode) this.timer.start();
      else this.timer.stop();
      this.drawTimerRank();
    }, this);
  }

  updateTimerText() {
    var count = Math.round(this.timer.duration / 1000);
    count = (count < 10) ? ("0" + count) : count;
    if(this.timerCount != count) {
        this.timerCount = count;
        this.timerText.setText(this.timerCount);
    }
  }
}

export default Main;
