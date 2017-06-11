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

    var score;
    this.score = 0;
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

    this.updateScore();

    this.timer.destroy();
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
    this.timer.destroy();
    this.emptyScreen();

    var bar = this.game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, this.game.world.centerY - 300, this.game.world.width, 700);

    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 500, 'error');
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

    var feedBackMessage = "Oops !\nResposta Incorreta !"

    var feedBackText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, feedBackMessage,  feedbackStyle);
    feedBackText.anchor.set(0.5);

    var counterMessage = "Seus acertos: \n"+(this.currentIndex) + "/" + this.questions.length;
    var questionCounterText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, counterMessage,  counterStyle);
    questionCounterText.anchor.set(0.5);

    var nextButton = this.game.add.sprite(this.game.world.centerX,  this.game.world.centerY + 550, 'button');
    nextButton.anchor.set(0.5);

    var nextMessage = "Fim de Jogo";
    var nextText = this.game.add.text(0, 0, nextMessage,  nextTextStyle);
    nextText.wordWrapWidth = nextButton.width;
    nextText.anchor.set(0.5);

    nextButton.addChild(nextText);

    nextButton.inputEnabled = true;
    nextButton.events.onInputDown.add(this.gameOver, this);

    this.screenElements.push(bar);
    this.screenElements.push(logo);
    this.screenElements.push(feedBackText);
    this.screenElements.push(questionCounterText);
    this.screenElements.push(nextButton);
    this.screenElements.push(nextText);

  }

  timeOverAnswer () {
    this.timer.destroy();
    this.emptyScreen();

    var bar = this.game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, this.game.world.centerY - 300, this.game.world.width, 700);

    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 500, 'time');
    logo.anchor.setTo(0.5);
    logo.scale.setTo(0.55,0.55);

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

    var feedBackMessage = "Oops !\nSeu tempo expirou !"

    var feedBackText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, feedBackMessage,  feedbackStyle);
    feedBackText.anchor.set(0.5);

    var counterMessage = "Seus acertos: \n"+(this.currentIndex) + "/" + this.questions.length;
    var questionCounterText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, counterMessage,  counterStyle);
    questionCounterText.anchor.set(0.5);

    var nextButton = this.game.add.sprite(this.game.world.centerX,  this.game.world.centerY + 550, 'button');
    nextButton.anchor.set(0.5);

    var nextMessage = "Fim de Jogo";
    var nextText = this.game.add.text(0, 0, nextMessage,  nextTextStyle);
    nextText.wordWrapWidth = nextButton.width;
    nextText.anchor.set(0.5);

    nextButton.addChild(nextText);

    nextButton.inputEnabled = true;
    nextButton.events.onInputDown.add(this.gameOver, this);

    this.screenElements.push(bar);
    this.screenElements.push(logo);
    this.screenElements.push(feedBackText);
    this.screenElements.push(questionCounterText);
    this.screenElements.push(nextButton);
    this.screenElements.push(nextText);
  }

  gameOver () {

    //TODO
    // Determinar qual tela sera aberta dependendo da pontuacao.

    // Se a pontuacao não é suficiente para entrar no rank, mostramos apenas a pontuação e as opções
    // para ver o rank e reiniciar o jogo.

      // Se não for ranqueado, devemos abrir essa tela.
      this.showScoreScreen();

    // Se a pontuação for suficiente para entrar no rank, mostramos a tela para adiconar 
    // a nova pontuação.
    //this.showNewScoreRecordScreen();

    //this.game.state.start("GameOver"); <- Não esta sendo mais utilizada
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
    const TIMER_COUNTER = 30;
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

  // Atualiza a pontuacao. A cada questao correta, é somado 100 pontos.
  // O tempo de resposta tbm influencia no valor final dos pontos.
  // Quanto mais rapido a resposta for respondida, mais ponto sera recebido.
  updateScore()
  {
     this.score = 100*(this.currentIndex+1) + this.timerCount;
     console.log("update score = " + this.score);
  }

  getScore()
  {
    console.log("get score = " + this.score);

    return this.score;
  }

  showScoreScreen()
  {
    this.emptyScreen();

    var topMargin = this.game.world.height*0.25;

    var yScoreTextContainer = this.game.world.height*0.45; 
    var scoreTextContainerHeight = this.game.world.height*0.25;

    var ySeeRankButton = this.game.world.height*0.65;
    var yRestartGameButton = this.game.world.height*0.80; 

    var achievementImg = this.game.add.sprite(this.game.world.centerX, topMargin, 'achievement');
    achievementImg.anchor.setTo(0.5);
    this.screenElements.push(achievementImg);

    var scoreTextStyle = {
      font: "80px Arial", fill: '#ffffff', fontWeight: 'bold',
      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
      wordWrap: true, wordWrapWidth: 1000
    };

    var scoreTextContainer  = this.game.add.graphics();
    scoreTextContainer .beginFill(0x000000, 0.2);
    scoreTextContainer .drawRect(0, topMargin, this.game.world.width, scoreTextContainerHeight);
    this.screenElements.push(scoreTextContainer);

    if(this.rankedMode)
    {
      var scoreText  = this.game.add.text(0, 0, "Sua pontuação foi \r\n " + this.getScore(),  scoreTextStyle);
    }
    else
    {
      var scoreText  = this.game.add.text(0, 0, "Fim de jogo!",  scoreTextStyle);
    }

    scoreText .setTextBounds(0, topMargin, this.game.world.width, scoreTextContainerHeight);
    this.screenElements.push(scoreText);

    var seeRankButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var seeRankButton = this.game.add.sprite(this.game.world.centerX,  ySeeRankButton, 'button');
    seeRankButton.anchor.set(0.5);
    this.screenElements.push(seeRankButton);

    var seeRankButtonText = this.game.add.text(0, 0, "Ver rank",  seeRankButtonStyle);
    seeRankButtonText.wordWrapWidth = seeRankButton.width;
    seeRankButtonText.anchor.set(0.5);
    this.screenElements.push(seeRankButtonText);

    seeRankButton.addChild(seeRankButtonText);

    seeRankButton.inputEnabled = true;
    seeRankButton.events.onInputDown.add(this.showRank, this);

    var restartGameButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var restartGameButton = this.game.add.sprite(this.game.world.centerX,  yRestartGameButton, 'button');
    restartGameButton.anchor.set(0.5);
    this.screenElements.push(restartGameButton);

    var restartGameButtonText = this.game.add.text(0, 0, "Jogar novamente",  restartGameButtonStyle);
    restartGameButtonText.wordWrapWidth = restartGameButton.width;
    restartGameButtonText.anchor.set(0.5);
    this.screenElements.push(restartGameButtonText);

    restartGameButton.addChild(restartGameButtonText);

    restartGameButton.inputEnabled = true;
    restartGameButton.events.onInputDown.add(this.restartGame, this);

  }

  restartGame() {
    this.game.state.start("GameTitle");
  }

  showNewScoreRecordScreen()
  {
    this.emptyScreen();

    var topMargin = this.game.world.height*0.10;

    var yNewScoreTextContainer = this.game.world.height*0.18; 
    var newNewScoreTextContainerHeight = this.game.world.height*0.38;

    var ySaveButton = this.game.world.height*0.75;
    var yRestartGameButton = this.game.world.height*0.90; 

    var newScoreImg = this.game.add.sprite(this.game.world.centerX, topMargin, 'newScore');
    newScoreImg.anchor.setTo(0.5);
    this.screenElements.push(newScoreImg);

    var newNewScoreTextStyle = {
      font: "72px Arial", fill: '#ffffff', fontWeight: 'bold',
      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
      wordWrap: true, wordWrapWidth: 1000
    };

    var newNewScoreTextContainer  = this.game.add.graphics();
    newNewScoreTextContainer .beginFill(0x000000, 0.2);
    newNewScoreTextContainer .drawRect(0, yNewScoreTextContainer, this.game.world.width, newNewScoreTextContainerHeight);
    this.screenElements.push(newNewScoreTextContainer);

    var newNewScoreText  = this.game.add.text(0, 0, "Parabéns! \r\n Agora você ocupa a posição x do rank =) \r\n Digite seu nome no campo abaixo.",  newNewScoreTextStyle);
    newNewScoreText .setTextBounds(0, yNewScoreTextContainer, this.game.world.width, newNewScoreTextContainerHeight);
    this.screenElements.push(newNewScoreText);

    var saveButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var saveButton = this.game.add.sprite(this.game.world.centerX,  ySaveButton, 'button');
    saveButton.anchor.set(0.5);
    this.screenElements.push(saveButton);

    var saveButtonText = this.game.add.text(0, 0, "Salvar",  saveButtonStyle);
    saveButtonText.wordWrapWidth = saveButton.width;
    saveButtonText.anchor.set(0.5);
    this.screenElements.push(saveButtonText);

    saveButton.addChild(saveButtonText);

    //saveButton.inputEnabled = true;
    //saveButton.events.onInputDown.add(this.save, this);

    var restartGameButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var restartGameButton = this.game.add.sprite(this.game.world.centerX,  yRestartGameButton, 'button');
    restartGameButton.anchor.set(0.5);
    this.screenElements.push(restartGameButton);

    var restartGameButtonText = this.game.add.text(0, 0, "Jogar novamente",  restartGameButtonStyle);
    restartGameButtonText.wordWrapWidth = restartGameButton.width;
    restartGameButtonText.anchor.set(0.5);
    this.screenElements.push(restartGameButtonText);

    restartGameButton.addChild(restartGameButtonText);

    restartGameButton.inputEnabled = true;
    restartGameButton.events.onInputDown.add(this.restartGame, this);
  }

  showRank()
  {
    this.game.state.start("Rank");
  }
}

export default Main;
