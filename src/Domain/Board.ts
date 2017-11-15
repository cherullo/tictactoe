module TicTacToe {
    
        export class Board 
        {
            private _board: EPlayer[];

            private static WinningSequences: EHouse[][] = [
                [0, 1, 2], // Top row
                [3, 4, 5], // Middle row
                [6, 7, 8], // Bottom row

                [0, 3, 6], // Left column
                [1, 4, 7], // Center column
                [2, 5, 8], // Right column

                [0, 4, 8], // Main diagonal
                [2, 4, 6]  // Secondary diagonal
            ];         

            constructor()
            {
                console.log("Match constructor");

                this._board = new Array<EPlayer>(8);

                this.Reset();
            }

            public At(house: EHouse) : EPlayer
            {
                return this._board[house];
            }

            public Set(house: EHouse, player: EPlayer): void
            {
                // if (this._board[house] != EPlayer.None)
                // {
                //    throw Error("House " + house.toString() + " already taken.");
                // }

                this._board[house] = player;
            }

            public Dupe(): Board
            {
                let ret: Board = new Board();

                for(let i = 0; i < 9; i++)
                {
                    ret.Set(i, this.At(i));
                }

                return ret;
            }

            public IsAWinningBoardFor(player: EPlayer): boolean
            {
                let won: boolean = false;

                for(let sequence of Board.WinningSequences)
                {
                   if (this._IsAWinningSequenceFor(player, sequence) == true)
                   {
                       return true;
                   }
                }

                return false;
            }

            private _IsAWinningSequenceFor(player: EPlayer, sequence: EHouse[]): boolean
            {
                for(let house of sequence)
                {
                    if (this.At(house) != player)
                    {
                        return false;
                    }
                }

                return true;
            }

            public Reset(): void
            {
                for(let i = 0; i < 9; i++)
                {
                    this._board[i] = EPlayer.None;
                }
            }

            public IsFull(): boolean
            {
                for(let i = 0; i < 9; i++)
                {
                    if (this._board[i] == EPlayer.None)
                    {
                        return false;
                    }
                }

                return true;
            }

        }
    }
    