module TicTacToe
{
    type Strategy = (board: Board, me: EPlayer) => EHouse;

    export class AI
    {
        private _me: EPlayer;

        private _match: Match;

        private _strategies: Strategy[];

        public constructor(match: Match)
        {
            this._match = match;
            this._me = EPlayer.Player2;

            this._strategies = [
                this._FindWinningHouse,
                this._BlockOther,
                this._PlayAtCenter,
                this._Corner,
                this._AnyFree
            ];
        }
        
        public Play(): EHouse 
        {
            let board = this._match.CopyBoard();

            for(let i = 0; i < this._strategies.length; i++)
            {
                let ret = this._strategies[i](this._match.CopyBoard(), this._me);

                if (ret != -1)
                    return ret; 
            }

            return EHouse.Center;
        }

        private _FindWinningHouse(board:Board, me:EPlayer): EHouse
        {
            for (let i = 0; i < 9; i++)
            {
                if (board.At(i) != EPlayer.None)
                    continue;
                    
                board.Set(i, me);

                if (board.IsAWinningBoardFor(me) == true)
                    return i;

                board.Set(i, EPlayer.None);
            }

            return -1;
        }
        
        private _BlockOther(board:Board, me:EPlayer): EHouse
        {
            let other = EPlayer.GetOther(me);

            for (let i = 0; i < 9; i++)
            {
                if (board.At(i) != EPlayer.None)
                    continue;
                    
                board.Set(i, other);

                if (board.IsAWinningBoardFor(other) == true)
                    return i;

                board.Set(i, EPlayer.None);
            }

            return -1;
        }

        private _PlayAtCenter(board:Board, me:EPlayer): EHouse
        {
            if (board.At(EHouse.Center) == EPlayer.None)
                return EHouse.Center;

            return -1;
        }

        private _Corner(board:Board, me:EPlayer): EHouse
        {
            let corners = [ EHouse.TopLeft, EHouse.TopRight, EHouse.BottomRight, EHouse.BottomLeft ];
            
            for(let house of corners)
            {
                if (board.At(house) == EPlayer.None)
                    return house;
            }

            return -1;
        }

        private _AnyFree(board:Board, me:EPlayer): EHouse
        {
            for (let i = 0; i < 9; i++)
            {
                if (board.At(i) == EPlayer.None)
                    return i;
            }

            return -1;
        }
    }
}