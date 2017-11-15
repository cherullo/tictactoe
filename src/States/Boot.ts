module TicTacToe {

	export class Boot extends Phaser.State {

		init() 
		{
			this.input.maxPointers = 1;
			
			this.scale.pageAlignHorizontally = true;
		}

		preload() 
		{
			this.load.image(Preloader.kBoardSprite.key, Preloader.kBoardSprite.url);
		}

		create() 
		{
			this.game.state.start(Game.kPreloaderState);
		}
	}
}
