/* jshint esversion: 6 */
class Preload extends Phaser.State {

	preload() {
		this.game.load.image('logo', 'assets/logo.png');
		this.game.load.image('button', 'assets/botao.png');
		this.game.load.image('check', 'assets/check-icon.png');
		this.game.load.image('error', 'assets/error-icon.png');
		this.game.load.image('time', 'assets/time-icon.png');
		this.game.load.image('achievement', 'assets/achievement-icon.png');
		this.game.load.image('newScore', 'assets/newScore-icon.png');
		this.game.load.image('rankImage', 'assets/rank-icon.png');

		//faixa1-Bem vindo.
		this.game.load.audio('track1', ['assets/audio/faixa1.mp3', 'assets/audio/faixa1.ogg']);
		//faixa2-Continue tentando
		this.game.load.audio('track2', ['assets/audio/faixa2.mp3', 'assets/audio/faixa2.ogg']);
		//faixa3-Você é relaxado
		this.game.load.audio('track3', ['assets/audio/faixa3.mp3', 'assets/audio/faixa3.ogg']);
		//faixa4-Acertou
		this.game.load.audio('track4', ['assets/audio/faixa4.mp3', 'assets/audio/faixa4.ogg']);
		//faixa5-Ganhou o jogo
		this.game.load.audio('track5', ['assets/audio/faixa5.mp3', 'assets/audio/faixa5.ogg']);
		//faixa6-musica
		this.game.load.audio('track6', ['assets/audio/faixa6.mp3', 'assets/audio/faixa6.ogg']);

    	this.game.load.json('questions', 'perguntas.json');
	}
	


	create() {
		this.game.state.start("GameTitle");


		var music1 = this.game.add.audio('track1');
		//var music2 = this.game.add.audio('track2');
		//var music3 = this.game.add.audio('track3');
		//var music4 = this.game.add.audio('track4');
		//var music5 = this.game.add.audio('track5');
		//var music6 = this.game.add.audio('track6');

		music1.play();
		//music6.loopFull();

		
	}


}

export default Preload;
