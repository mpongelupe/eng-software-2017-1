/* jshint esversion: 6 */
class Preload extends Phaser.State {

	preload() {
		this.game.load.image('logo', 'assets/logo.png');
		this.game.load.image('button', 'assets/botao.png');
    this.game.load.json('questions', 'perguntas.json');
	}

	create() {
		this.game.state.start("GameTitle");
	}

}

export default Preload;
