/* jshint esversion: 6 */
class Preload extends Phaser.State {

	preload() {
		this.game.load.image('logo', 'assets/logo.png');
	}

	create() {
		this.game.state.start("chow do milhão melhorado");
	}

}

export default Preload;
