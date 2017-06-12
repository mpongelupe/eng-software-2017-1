/* jshint esversion: 6 */
class Boot extends Phaser.State {

	preload() {

	}

	create() {
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.backgroundColor = '#03A9F4';
		this.game.state.start("Preload");
	}
}

export default Boot;
