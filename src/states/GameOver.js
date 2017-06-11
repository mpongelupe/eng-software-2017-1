/* jshint esversion: 6 */
class GameOver extends Phaser.State {

	create() {

    // Esta tela nao esta sendo utilizada. Parte do codigo foi transferido para a Main.js

    /*
    var verticalSpacing = this.game.world.height*0.02;
    //var topMargin = this.game.world.width*0.25;

    var titleOneStyle = {font: "72px Arial Black", fill: "#000aff"};

    var topMargin = this.game.world.height*0.25;

    var yScoreTextContainer = this.game.world.height*0.45; 
    var scoreTextContainerHeight = this.game.world.height*0.25;

    var ySeeRankButton = this.game.world.height*0.65;
    var yRestartGameButton = this.game.world.height*0.80; 

    var achievementImg = this.game.add.sprite(this.game.world.centerX, topMargin, 'achievement');
    achievementImg.anchor.setTo(0.5);

    var scoreTextStyle = {
      font: "80px Arial", fill: '#ffffff', fontWeight: 'bold',
      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
      wordWrap: true, wordWrapWidth: 1000
    };

    var scoreTextContainer  = this.game.add.graphics();
    scoreTextContainer .beginFill(0x000000, 0.2);
    scoreTextContainer .drawRect(0, topMargin, this.game.world.width, scoreTextContainerHeight);

    var score = 10;

    var scoreText  = this.game.add.text(0, 0, "Sua pontuação foi \r\n " + score.toString(),  scoreTextStyle);
    scoreText .setTextBounds(0, topMargin, this.game.world.width, scoreTextContainerHeight);

    // Ver raking button

    var seeRankButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var seeRankButton = this.game.add.sprite(this.game.world.centerX,  ySeeRankButton, 'button');
    seeRankButton.anchor.set(0.5);

    var seeRankButtonText = this.game.add.text(0, 0, "Ver rank",  seeRankButtonStyle);
    seeRankButtonText.wordWrapWidth = seeRankButton.width;
    seeRankButtonText.anchor.set(0.5);

    seeRankButton.addChild(seeRankButtonText);

    seeRankButton.inputEnabled = true;
    seeRankButton.events.onInputDown.add(this.rank, this);

    // Restart game button

    var restartGameButtonStyle = {
      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
       align: 'center', wordWrap: true, wordWrapWidth: 1000,
       boundsAlignH: 'middle', boundsAlignV: "middle"
    };

    var restartGameButton = this.game.add.sprite(this.game.world.centerX,  yRestartGameButton, 'button');
    restartGameButton.anchor.set(0.5);

    var restartGameButtonText = this.game.add.text(0, 0, "Jogar novamente",  restartGameButtonStyle);
    restartGameButtonText.wordWrapWidth = restartGameButton.width;
    restartGameButtonText.anchor.set(0.5);

    restartGameButton.addChild(restartGameButtonText);

    restartGameButton.inputEnabled = true;
    restartGameButton.events.onInputDown.add(this.restartGame, this);
    */

	}

	restartGame() {
		this.game.state.start("GameTitle");
	}

    rank()
    {
        this.game.state.start("Rank");
    }

}

export default GameOver;
