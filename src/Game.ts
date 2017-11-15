module TicTacToe {

	export class Game extends Phaser.Game {

		static readonly kBootState = "Boot";
		static readonly kPreloaderState = "Preloader";
		static readonly kMainMenuState = "MainMenu";
		static readonly kMatchSceneState = "MatchScene";
				
		constructor() {

			super(980, 980, Phaser.AUTO, 'content', null);

			this.state.add(Game.kBootState, Boot, false);
			this.state.add(Game.kPreloaderState, Preloader, false);
			this.state.add(Game.kMainMenuState, MainMenu, false);
			this.state.add(Game.kMatchSceneState, MatchScene, false);

			this.state.start(Game.kBootState);
		}

	}

}