module MyGame {
    
        export class Match 
        {
            private _isDone: boolean;

            private _currentPlayerTurn: EPlayer;

            private _winner: EPlayer;

            private _board: Board;

            public IsDone()
            {
                return this._isDone;
            }

            public CurrentPlayerTurn(): EPlayer
            {
                return this._currentPlayerTurn;
            }

            public Winner(): EPlayer
            {
                return this._winner;
            }

            constructor()
            {
                // this._isDone = false;
                this._currentPlayerTurn = EPlayer.Player1;
                this._winner = EPlayer.None;
                
                this._board = new Board();
                this._board.Reset();
            }
            
            public FeedMove( player: EPlayer, house: EHouse): void
            {
                if (player != this._currentPlayerTurn)
                {
                    throw new Error("Wrong player.");
                }

                if (this._board.At(house) != EPlayer.None)
                {
                    throw new Error ("House already taken.");
                }

                this._board.Set(house, player);
                this._currentPlayerTurn = EPlayer.GetOther(player);

                if (this._board.IsAWinningBoardFor(player) == true)
                {
                    this._Finish(player);
                }
                else if (this._board.IsFull() == true)
                {
                    this._Finish(EPlayer.None);
                }
            }

            public CopyBoard(): Board
            {
                return this._board.Dupe();
            }

            private _Finish(player: EPlayer)
            {
                this._isDone = true;
                this._winner = player;
            }
        }
    }
    