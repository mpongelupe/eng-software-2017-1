/* jshint esversion: 6 */
class Preload extends Phaser.State {

	preload() {
		this.game.load.image('logo', 'assets/logo.png');
	}

	create() {
		this.game.state.start("GameTitle");
	}

}

export default Preload;
