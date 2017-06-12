/* jshint esversion: 6 */

class Rank extends Phaser.State {

	create() {

	    var topMargin = this.game.world.height*0.08;

	    var yScoreTextContainer = this.game.world.height*0.15;
	    var titleContainerHeight = this.game.world.height*0.10;

	    var yRestartGameButton = this.game.world.height*0.85;

	    // Margens
	    var verticalSpacing = this.game.world.width*0.01;
	    var horizontalSpacing = this.game.world.height*0.01;

	   	// Imagem do rankImg
	   	var rankImg = this.game.add.sprite(this.game.world.centerX, topMargin, 'rankImage');
	    rankImg.anchor.setTo(0.5);

	    // Titulo do rank
	    var titleTextStyle = {
	      font: "80px Arial", fill: '#ffffff', fontWeight: 'bold',
	      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
	      wordWrap: true, wordWrapWidth: 1000
	    };

	    var titleContainer  = this.game.add.graphics();
	    titleContainer.beginFill(0x000000, 0.2);
	    titleContainer.drawRect(0, yScoreTextContainer, this.game.world.width, titleContainerHeight);

	    var titleText  = this.game.add.text(0, 0, "Rank",  titleTextStyle);
	    titleText .setTextBounds(0, yScoreTextContainer, this.game.world.width, titleContainerHeight);

	    // Cabeçalho do rank: posição do rank
	    var tagTextStyle = {
	      font: "72px Arial", fill: '#ffffff', fontWeight: 'bold',
	      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
	      wordWrap: true, wordWrapWidth: 1000
	    };

	    var rankTagContainerHeight = this.game.world.height*0.05;
	    var rankTagContainerWidth = this.game.world.width*0.15;
	    var yRankTagContainer = this.game.world.height*0.28;
	    var xRankTagContainer = this.game.world.width*0.02;

	   	var rankTagContainer  = this.game.add.graphics();
	    rankTagContainer.beginFill(0x000000, 0.2);
	    rankTagContainer.drawRect(xRankTagContainer, yRankTagContainer, rankTagContainerWidth, rankTagContainerHeight);

	   	var rankTagText  = this.game.add.text(0, 0, "#",  tagTextStyle);
	    rankTagText.setTextBounds(xRankTagContainer, yRankTagContainer, rankTagContainerWidth, rankTagContainerHeight);

	    // Cabeçalho do rank: Nome
	    var nameTagContainerHeight = this.game.world.height*0.05;
	    var nameTagContainerWidth = this.game.world.width*0.60;
	    var yNameTagContainer = this.game.world.height*0.28;
	    var xNameTagContainer = xRankTagContainer + rankTagContainerWidth + verticalSpacing;

	   	var nameTagContainer  = this.game.add.graphics();
	    nameTagContainer.beginFill(0x000000, 0.2);
	    nameTagContainer.drawRect(xNameTagContainer, yNameTagContainer, nameTagContainerWidth, nameTagContainerHeight);

	   	var nameTagText  = this.game.add.text(0, 0, "Nome",  tagTextStyle);
	    nameTagText.setTextBounds(xNameTagContainer, yNameTagContainer, nameTagContainerWidth, nameTagContainerHeight);

 		// Cabeçalho do rank: score
	    var scoreTagContainerHeight = this.game.world.height*0.05;
	    var scoreTagContainerWidth = this.game.world.width*0.19;
	    var yScoreTagContainer = this.game.world.height*0.28;
	    var xScoreTagContainer = xNameTagContainer + nameTagContainerWidth + verticalSpacing;

	   	var scoreTagContainer  = this.game.add.graphics();
	    scoreTagContainer.beginFill(0x000000, 0.2);
	    scoreTagContainer.drawRect(xScoreTagContainer, yScoreTagContainer, scoreTagContainerWidth, scoreTagContainerHeight);

	   	var scoreTagText  = this.game.add.text(0, 0, "Pts",  tagTextStyle);
	    scoreTagText.setTextBounds(xScoreTagContainer, yScoreTagContainer, scoreTagContainerWidth, scoreTagContainerHeight);

	    // Conteudo da coluna rank.
	    var contentTextStyle = {
	      font: "50px Arial", fill: '#ffffff', fontWeight: 'bold',
	      align: 'center', boundsAlignH: 'center', boundsAlignV: "middle",
	      wordWrap: true, wordWrapWidth: 1000
	    };

	    var rankContentsContainerHeight = this.game.world.height*0.40;
	    var rankContentsContainerWidth = rankTagContainerWidth;
	    var yRankContentsContainer = yRankTagContainer + rankTagContainerHeight + horizontalSpacing;
	    var xRankContentsContainer = xRankTagContainer;

	   	var rankContentsContainer  = this.game.add.graphics();
	    rankContentsContainer.beginFill(0x000000, 0.2);
	    rankContentsContainer.drawRect(xRankContentsContainer, yRankContentsContainer, rankContentsContainerWidth, rankContentsContainerHeight);

	   	var rankContentsText  = this.game.add.text(0, 0, "\n 1 \n 2 \n 3 \n 4 \n 5 \n 6 \n 7 \n 8 \n 9 \n 10 \n",  contentTextStyle);
	    rankContentsText.setTextBounds(xRankContentsContainer, yRankContentsContainer, rankContentsContainerWidth, rankContentsContainerHeight);

	    // Conteudo da coluna nome.
	    var nameContentsContainerHeight = this.game.world.height*0.40;
	    var nameContentsContainerWidth = nameTagContainerWidth;
	    var yNameContentsContainer = yNameTagContainer + nameTagContainerHeight + horizontalSpacing;
	    var xNameContentsContainer = xNameTagContainer;

	   	var nameContentsContainer  = this.game.add.graphics();
	    nameContentsContainer.beginFill(0x000000, 0.2);
	    nameContentsContainer.drawRect(xNameContentsContainer, yNameContentsContainer, nameContentsContainerWidth, nameContentsContainerHeight);

	   	var nameContentsText  = this.game.add.text(0, 0, '\n ' + this.readRankName('n1') + ' \n ' + this.readRankName('n2') + ' \n ' + this.readRankName('n3') + ' \n ' + this.readRankName('n4') + ' \n ' + this.readRankName('n5') +
	   													' \n ' + this.readRankName('n6') + ' \n ' + this.readRankName('n7') + ' \n ' + this.readRankName('n8') + ' \n ' + this.readRankName('n9') + ' \n ' + this.readRankName('n10') + ' \n',  contentTextStyle);
	    nameContentsText.setTextBounds(xNameContentsContainer, yNameContentsContainer, nameContentsContainerWidth, nameContentsContainerHeight);

	    // Conteudo da coluna pts.
		var scoreContentsContainerHeight = this.game.world.height*0.40;
	    var scoreContentsContainerWidth = scoreTagContainerWidth;
	    var yScoreContentsContainer = yScoreTagContainer + scoreTagContainerHeight + horizontalSpacing;
	    var xScoreContentsContainer = xScoreTagContainer;

	   	var scoreContentsContainer  = this.game.add.graphics();
	    scoreContentsContainer.beginFill(0x000000, 0.2);
	    scoreContentsContainer.drawRect(xScoreContentsContainer, yScoreContentsContainer, scoreContentsContainerWidth, scoreContentsContainerHeight);

	   	var scoreContentsText  = this.game.add.text(0, 0, '\n ' + this.readRankName('s1') + ' \n ' + this.readRankName('s2') + ' \n ' + this.readRankName('s3') + ' \n ' + this.readRankName('s4') + ' \n ' + this.readRankName('s5') +
	   													 ' \n ' + this.readRankName('s6') + ' \n ' + this.readRankName('s7') + ' \n ' + this.readRankName('s8') + ' \n ' + this.readRankName('s9') + ' \n ' + this.readRankName('s10') + ' \n',  contentTextStyle);
	    scoreContentsText.setTextBounds(xScoreContentsContainer, yScoreContentsContainer, scoreContentsContainerWidth, scoreContentsContainerHeight);

	    // Botão de jogar novamente.
	    var restartGameButtonStyle = {
	      font: "68px Arial", fill: '#212121', fontWeight: 'bold',
	       align: 'center', wordWrap: true, wordWrapWidth: 1000,
	       boundsAlignH: 'middle', boundsAlignV: "middle"
	    };

	    var restartGameButton = this.game.add.sprite(this.game.world.centerX,  yRestartGameButton, 'button');
	    restartGameButton.anchor.set(0.5);

	    var restartGameButtonText = this.game.add.text(0, 0, "Voltar",  restartGameButtonStyle);
	    restartGameButtonText.wordWrapWidth = restartGameButton.width;
	    restartGameButtonText.anchor.set(0.5);

	    restartGameButton.addChild(restartGameButtonText);

	    restartGameButton.inputEnabled = true;
	    restartGameButton.events.onInputDown.add(this.restartGame, this);

	}

	// Le o nome em uma posicao de n1 a n10, onde n se refere a "nome"
	readRankName(index)
	{
		return this.readRankNameFromLocalData(index);
	}

	// Le o nome em uma posicao de n1 a n10 armazenada localmente.
	readRankNameFromLocalData(index)
	{
		var name = localStorage.getItem(index);

		if(name === null)
		{
			return "-";
		}
		else
		{
			return localStorage.getItem(index);
		}
	}

	// Le o nome em uma posicao de s1 a s10, onde s se refere a "score"
	readRankScore(index)
	{
		return this.readRankScoreFromLocalData(index);
	}

	// Le o nome em uma posicao de s1 a s10 armazenada localmente.
	readRankScoreFromLocalData(index)
	{
		var score = localStorage.getItem(index);

		if(score === null)
		{
			return "-";
		}
		else
		{
			return localStorage.getItem(index);
		}
	}

	restartGame() {
		this.game.state.start("GameTitle");
	}
}

export default Rank;
