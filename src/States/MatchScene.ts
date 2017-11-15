// import { Sprite } from "phaser-ce";

module TicTacToe {

	export class MatchScene extends Phaser.State {
		
		_background: Phaser.Sprite;
		_match: Match;
		_houses: Phaser.Sprite[];
		_AI: AI;

		create() 
		{
			this._match = new Match();
			this._AI = new AI(this._match);

			this._background = this._CreateBackground();

			this._houses = this._CreateHouses();
		}

		private _CreateHouses(): Phaser.Sprite[]
		{
			let ret = new Array<Phaser.Sprite>();

			for(let i = 0; i < 9; i++)
			{
				ret.push(this._CreateHouse(i));
			}

			return ret;
		}

		private _CreateHouse(house: EHouse): Phaser.Sprite
		{
			let ret = this.game.add.sprite(0, 0, Preloader.kXSprite.key);

			ret.x = (house % 3) * (300 + 40);
			ret.y = Math.floor(house / 3) * (300 + 40);
			ret.alpha = 0.0;

			ret.inputEnabled = true;
			ret.events.onInputDown.add(this._OnClick, this, 0, house);

			return ret;
		}

		private _CreateBackground(): Phaser.Sprite
		 {
			let background = this.add.sprite(0, 0, Preloader.kBoardSprite.key);
			
			background.inputEnabled = true;
			
			return background;
		}

		private _OnClick(target: Phaser.Sprite, pointer: Phaser.Pointer, clickedHouse: EHouse): void
		{
			this._Play(EPlayer.Player1, clickedHouse);

			this._Play(EPlayer.Player2, this._AI.Play());
		}

		private _Play(player: EPlayer, house: EHouse)
		{
			this._match.FeedMove(player, house);				
			
			this._houses[house].loadTexture(this._GetSpriteKey(player));
			this._houses[house].alpha = 1.0;

			if (this._match.IsDone() == true)
			{
				this._EndMatch();
				return;
			}
		}

		private _GetSpriteKey(player: EPlayer): string
		{
			switch(player)
			{
				case EPlayer.Player1:
					return Preloader.kXSprite.key;
				case EPlayer.Player2:
					return Preloader.kOSprite.key;
			}

			return "";
		}

		private _EndMatch()
		{
			this.game.state.start(Game.kMainMenuState, true, false, this._match);
		}
	}

} 