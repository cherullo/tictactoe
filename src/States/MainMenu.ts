module TicTacToe {

	export class MainMenu extends Phaser.State {

		_finishedMatch: Match;
		_textStyle: Phaser.PhaserTextStyle;

		_titleDO: Phaser.Text;
		_resultsDO: Phaser.Text;
		_startDO: Phaser.Text;

		init(finishedMatch?: Match)
		{
			this._finishedMatch = finishedMatch;

			this._textStyle = { font: "Arial", fill: "#fff", fontSize: 100 };
		}

		create() {

			this._titleDO = this._CreateTitle(this._textStyle);
			
			if (this._finishedMatch != null)
			{
				this._PrintMatchResult(this._finishedMatch, this._textStyle);
			}

			this._startDO = this._CreateStartButton(this._textStyle);
		}

		private _CreateStartButton(textStyle: Phaser.PhaserTextStyle): Phaser.Text
		{
			let startDO = this.add.text(0, 0, "Start", textStyle);

			this._CenterAlign(startDO);

			startDO.y = this.game.canvas.height - 2.0 * startDO.height;

			startDO.inputEnabled = true;
			startDO.events.onInputDown.addOnce(this.startGame, this, 0);

			return startDO;
		}

		private _CreateTitle(textStyle: Phaser.PhaserTextStyle) : Phaser.Text
		{
			let titleDO = this.add.text(0, 0, "Tic Tac Toe", textStyle);

			this._CenterAlign(titleDO);

			titleDO.y = titleDO.height;

			return titleDO;
		}

		private _PrintMatchResult(match: Match, style: Phaser.PhaserTextStyle): Phaser.Text
		{
			let text = this._GetResultAsString(match.Winner());

			let resultDO = this.add.text(0, 300, text, style);

			this._CenterAlign(resultDO);

			return resultDO;
		}

		private _GetResultAsString(result: EPlayer): string
		{
			switch(result)
			{
				case EPlayer.Player1:
					return "You won!";
				case EPlayer.Player2:
					return "The computer won!";
				case EPlayer.None:
					return "It's a tie!";
			}
		}

		private _CenterAlign(text: Phaser.Text): void
		{
			text.x = (this.game.canvas.width - text.width) / 2.0;
		}

		startGame() {

			this.game.state.start(Game.kMatchSceneState, true, false);

		}

	}

}