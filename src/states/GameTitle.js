/* jshint esversion: 6 */
class GameTitle extends Phaser.State {
	constructor() {
		super();

		this.logo = null;
		this.title_one = null;
		this.title_two = null;
		this.hint = null;
	}

	create() {
		this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, 'logo');
		this.logo.anchor.setTo(0.5);

    this.title_one = this.game.add.text(this.game.world.centerX, 1000, "CHOW DO MILHÃO", { font: "62px Arial Black", fill: "#000aff" });
		this.title_one.anchor.setTo(0.5);
    this.title_one.stroke = "#8877de";
    this.title_one.strokeThickness = 16;

		this.title_two = this.game.add.text(this.game.world.centerX, 1100, "MELHORADO", { font: "62px Arial Black", fill: "#000aff" });
		this.title_two.anchor.setTo(0.5);
    this.title_two.stroke = "#8877de";
    this.title_two.strokeThickness = 16;

		this.hint = this.game.add.text(this.game.world.centerX, 1250, "clique duas vezes para começar", { font: "62px Arial Black", fill: "#ffffff" });
		this.hint.anchor.setTo(0.5);
		this.hint.visible = false;

		//this.game.input.onTap.add(this.tap, this);

   		var ySeeRankButton = this.game.world.height*0.88;
   		var yStartGameButton = this.game.world.height*0.75; 

   		var startGameButtonStyle = {
	      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
	       align: 'center', wordWrap: true, wordWrapWidth: 1000,
	       boundsAlignH: 'middle', boundsAlignV: "middle"
	    };

	    var startGameButton = this.game.add.sprite(this.game.world.centerX,  yStartGameButton, 'button');
	    startGameButton.anchor.set(0.5);
	    //this.screenElements.push(startGameButton);

	    var startGameButtonText = this.game.add.text(0, 0, "Iniciar jogo",  startGameButtonStyle);
	    startGameButtonText.wordWrapWidth = startGameButton.width;
	    startGameButtonText.anchor.set(0.5);
	    //this.screenElements.push(startGameButtonText);

	    startGameButton.addChild(startGameButtonText);

	    startGameButton.inputEnabled = true;
	    startGameButton.events.onInputDown.add(this.startGame, this);

		var seeRankButtonStyle = {
	      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
	       align: 'center', wordWrap: true, wordWrapWidth: 1000,
	       boundsAlignH: 'middle', boundsAlignV: "middle"
	    };

	    var seeRankButton = this.game.add.sprite(this.game.world.centerX,  ySeeRankButton, 'button');
	    seeRankButton.anchor.set(0.5);
	    //this.screenElements.push(seeRankButton);

	    var seeRankButtonText = this.game.add.text(0, 0, "Ver rank",  seeRankButtonStyle);
	    seeRankButtonText.wordWrapWidth = seeRankButton.width;
	    seeRankButtonText.anchor.set(0.5);
	    //this.screenElements.push(seeRankButtonText);

	    seeRankButton.addChild(seeRankButtonText);

	    seeRankButton.inputEnabled = true;
	    seeRankButton.events.onInputDown.add(this.showRank, this);
	}

	tap(tap, doubletap) {
		if (tap)
			this.hint.visible = true;
		if (doubletap)
			this.game.state.start("Main");
	}

	update() {
		this.logo.rotation += 0.05;
	}

	startGame() {
		this.game.state.start("Main");
	}

	showRank()
	{
		this.game.state.start("Rank");
	}

}

export default GameTitle;
