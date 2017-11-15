type KeyUrlPair = { key: string, url: string };

module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		ready: boolean = false;

		static readonly kBoardSprite: KeyUrlPair = { key:"boardSprite", url:"assets/board.png" };
		static readonly kXSprite: KeyUrlPair = { key:"xSprite", url:"assets/x.png" };
		static readonly kOSprite: KeyUrlPair = { key:"oSprite", url:"assets/o.png" };
		static readonly kPreloadBar: KeyUrlPair = { key:"preloadBar", url:"assets/loader.png" };

		preload() {
			//	These are the assets we loaded in Boot.js
			this.preloadBar = this.add.sprite(300, 400, Preloader.kPreloadBar.key);

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);

			//	Here we load the rest of the assets our game needs.
			//	As this is just a Project Template I've not provided these assets, swap them for your own.
			this.preloadImage(Preloader.kBoardSprite);
			this.preloadImage(Preloader.kXSprite);
			this.preloadImage(Preloader.kOSprite);
		}

		preloadImage( keyUrlPair: KeyUrlPair ): void
		{
			this.load.image(keyUrlPair.key, keyUrlPair.url);
		}

		create() 
		{
			this.game.state.start(Game.kMainMenuState);
		}
	}
}