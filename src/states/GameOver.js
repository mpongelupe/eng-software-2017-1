/* jshint esversion: 6 */
class GameOver extends Phaser.State {

	create() {
    this.title_one = this.game.add.text(this.game.world.centerX, 750, "Fim do jogo", { font: "62px Arial Black", fill: "#000aff" });
    this.title_one.anchor.setTo(0.5);
    this.title_one.stroke = "#8877de";
    this.title_one.strokeThickness = 16;

    this.title_two = this.game.add.text(this.game.world.centerX, 1100, "Recomeçar?", { font: "62px Arial Black", fill: "#000aff" });
    this.title_two.anchor.setTo(0.5);
    this.title_two.stroke = "#8877de";
    this.title_two.strokeThickness = 16;

    this.title_two.inputEnabled = true; 
    this.title_two.events.onInputDown.add(this.restartGame, this);
	}

	restartGame() {
		this.game.state.start("GameTitle");
	}

}

export default GameOver;
