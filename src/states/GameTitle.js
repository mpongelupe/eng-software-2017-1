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

		this.game.input.onTap.add(this.tap, this);
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
		
	}

}

export default GameTitle;
