/* jshint esversion: 6 */
class GameOver extends Phaser.State {

	create() {

	}

	restartGame() {
		this.game.state.start("Main");
	}

}

export default GameOver;
