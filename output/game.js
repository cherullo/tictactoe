var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyGame;
(function (MyGame) {
    var AI = (function () {
        function AI(match) {
            this._match = match;
            this._me = MyGame.EPlayer.Player2;
            this._strategies = [
                this._FindWinningHouse,
                this._BlockOther,
                this._PlayAtCenter,
                this._Corner,
                this._AnyFree
            ];
        }
        AI.prototype.Play = function () {
            var board = this._match.CopyBoard();
            for (var i = 0; i < this._strategies.length; i++) {
                var ret = this._strategies[i](this._match.CopyBoard(), this._me);
                if (ret != -1)
                    return ret;
            }
            return MyGame.EHouse.Center;
        };
        AI.prototype._FindWinningHouse = function (board, me) {
            for (var i = 0; i < 9; i++) {
                if (board.At(i) != MyGame.EPlayer.None)
                    continue;
                board.Set(i, me);
                if (board.IsAWinningBoardFor(me) == true)
                    return i;
                board.Set(i, MyGame.EPlayer.None);
            }
            return -1;
        };
        AI.prototype._BlockOther = function (board, me) {
            var other = MyGame.EPlayer.GetOther(me);
            for (var i = 0; i < 9; i++) {
                if (board.At(i) != MyGame.EPlayer.None)
                    continue;
                board.Set(i, other);
                if (board.IsAWinningBoardFor(other) == true)
                    return i;
                board.Set(i, MyGame.EPlayer.None);
            }
            return -1;
        };
        AI.prototype._PlayAtCenter = function (board, me) {
            if (board.At(MyGame.EHouse.Center) == MyGame.EPlayer.None)
                return MyGame.EHouse.Center;
            return -1;
        };
        AI.prototype._Corner = function (board, me) {
            var corners = [MyGame.EHouse.TopLeft, MyGame.EHouse.TopRight, MyGame.EHouse.BottomRight, MyGame.EHouse.BottomLeft];
            for (var _i = 0, corners_1 = corners; _i < corners_1.length; _i++) {
                var house = corners_1[_i];
                if (board.At(house) == MyGame.EPlayer.None)
                    return house;
            }
            return -1;
        };
        AI.prototype._AnyFree = function (board, me) {
            for (var i = 0; i < 9; i++) {
                if (board.At(i) == MyGame.EPlayer.None)
                    return i;
            }
            return -1;
        };
        return AI;
    }());
    MyGame.AI = AI;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Board = (function () {
        function Board() {
            console.log("Match constructor");
            this._board = new Array(8);
            this.Reset();
        }
        Board.prototype.At = function (house) {
            return this._board[house];
        };
        Board.prototype.Set = function (house, player) {
            this._board[house] = player;
        };
        Board.prototype.Dupe = function () {
            var ret = new Board();
            for (var i = 0; i < 9; i++) {
                ret.Set(i, this.At(i));
            }
            return ret;
        };
        Board.prototype.IsAWinningBoardFor = function (player) {
            var won = false;
            for (var _i = 0, _a = Board.WinningSequences; _i < _a.length; _i++) {
                var sequence = _a[_i];
                if (this._IsAWinningSequenceFor(player, sequence) == true) {
                    return true;
                }
            }
            return false;
        };
        Board.prototype._IsAWinningSequenceFor = function (player, sequence) {
            for (var _i = 0, sequence_1 = sequence; _i < sequence_1.length; _i++) {
                var house = sequence_1[_i];
                if (this.At(house) != player) {
                    return false;
                }
            }
            return true;
        };
        Board.prototype.Reset = function () {
            for (var i = 0; i < 9; i++) {
                this._board[i] = MyGame.EPlayer.None;
            }
        };
        Board.prototype.IsFull = function () {
            for (var i = 0; i < 9; i++) {
                if (this._board[i] == MyGame.EPlayer.None) {
                    return false;
                }
            }
            return true;
        };
        Board.WinningSequences = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return Board;
    }());
    MyGame.Board = Board;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    (function (EHouse) {
        EHouse[EHouse["TopLeft"] = 0] = "TopLeft";
        EHouse[EHouse["TopCenter"] = 1] = "TopCenter";
        EHouse[EHouse["TopRight"] = 2] = "TopRight";
        EHouse[EHouse["MiddleLeft"] = 3] = "MiddleLeft";
        EHouse[EHouse["Center"] = 4] = "Center";
        EHouse[EHouse["MiddleRight"] = 5] = "MiddleRight";
        EHouse[EHouse["BottomLeft"] = 6] = "BottomLeft";
        EHouse[EHouse["BottomCenter"] = 7] = "BottomCenter";
        EHouse[EHouse["BottomRight"] = 8] = "BottomRight";
    })(MyGame.EHouse || (MyGame.EHouse = {}));
    var EHouse = MyGame.EHouse;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    (function (EPlayer) {
        EPlayer[EPlayer["None"] = 0] = "None";
        EPlayer[EPlayer["Player1"] = 1] = "Player1";
        EPlayer[EPlayer["Player2"] = 2] = "Player2";
    })(MyGame.EPlayer || (MyGame.EPlayer = {}));
    var EPlayer = MyGame.EPlayer;
    var EPlayer;
    (function (EPlayer) {
        function GetOther(player) {
            if (player == EPlayer.Player1)
                return EPlayer.Player2;
            if (player == EPlayer.Player2)
                return EPlayer.Player1;
            throw new Error("There is no 'other' for player 'None'.");
        }
        EPlayer.GetOther = GetOther;
    })(EPlayer = MyGame.EPlayer || (MyGame.EPlayer = {}));
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Match = (function () {
        function Match() {
            this._currentPlayerTurn = MyGame.EPlayer.Player1;
            this._winner = MyGame.EPlayer.None;
            this._board = new MyGame.Board();
            this._board.Reset();
        }
        Match.prototype.IsDone = function () {
            return this._isDone;
        };
        Match.prototype.CurrentPlayerTurn = function () {
            return this._currentPlayerTurn;
        };
        Match.prototype.Winner = function () {
            return this._winner;
        };
        Match.prototype.FeedMove = function (player, house) {
            if (player != this._currentPlayerTurn) {
                throw new Error("Wrong player.");
            }
            if (this._board.At(house) != MyGame.EPlayer.None) {
                throw new Error("House already taken.");
            }
            this._board.Set(house, player);
            this._currentPlayerTurn = MyGame.EPlayer.GetOther(player);
            if (this._board.IsAWinningBoardFor(player) == true) {
                this._Finish(player);
            }
            else if (this._board.IsFull() == true) {
                this._Finish(MyGame.EPlayer.None);
            }
        };
        Match.prototype.CopyBoard = function () {
            return this._board.Dupe();
        };
        Match.prototype._Finish = function (player) {
            this._isDone = true;
            this._winner = player;
        };
        return Match;
    }());
    MyGame.Match = Match;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 980, 980, Phaser.AUTO, 'content', null);
            this.state.add(Game.kBootState, MyGame.Boot, false);
            this.state.add(Game.kPreloaderState, MyGame.Preloader, false);
            this.state.add(Game.kMainMenuState, MyGame.MainMenu, false);
            this.state.add(Game.kMatchSceneState, MyGame.MatchScene, false);
            this.state.start(Game.kBootState);
        }
        Game.kBootState = "Boot";
        Game.kPreloaderState = "Preloader";
        Game.kMainMenuState = "MainMenu";
        Game.kMatchSceneState = "MatchScene";
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.scale.pageAlignHorizontally = true;
        };
        Boot.prototype.preload = function () {
            this.load.image(MyGame.Preloader.kBoardSprite.key, MyGame.Preloader.kBoardSprite.url);
        };
        Boot.prototype.create = function () {
            this.game.state.start(MyGame.Game.kPreloaderState);
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.init = function (finishedMatch) {
            this._finishedMatch = finishedMatch;
            this._textStyle = { font: "Arial", fill: "#fff", fontSize: 100 };
        };
        MainMenu.prototype.create = function () {
            this._titleDO = this._CreateTitle(this._textStyle);
            if (this._finishedMatch != null) {
                this._PrintMatchResult(this._finishedMatch, this._textStyle);
            }
            this._startDO = this._CreateStartButton(this._textStyle);
        };
        MainMenu.prototype._CreateStartButton = function (textStyle) {
            var startDO = this.add.text(0, 0, "Start", textStyle);
            this._CenterAlign(startDO);
            startDO.y = this.game.canvas.height - 2.0 * startDO.height;
            startDO.inputEnabled = true;
            startDO.events.onInputDown.addOnce(this.startGame, this, 0);
            return startDO;
        };
        MainMenu.prototype._CreateTitle = function (textStyle) {
            var titleDO = this.add.text(0, 0, "Tic Tac Toe", textStyle);
            this._CenterAlign(titleDO);
            titleDO.y = titleDO.height;
            return titleDO;
        };
        MainMenu.prototype._PrintMatchResult = function (match, style) {
            var text = this._GetResultAsString(match.Winner());
            var resultDO = this.add.text(0, 300, text, style);
            this._CenterAlign(resultDO);
            return resultDO;
        };
        MainMenu.prototype._GetResultAsString = function (result) {
            switch (result) {
                case MyGame.EPlayer.Player1:
                    return "Player 1 Wins!";
                case MyGame.EPlayer.Player2:
                    return "Player 2 Wins!";
                case MyGame.EPlayer.None:
                    return "It's a tie!";
            }
        };
        MainMenu.prototype._CenterAlign = function (text) {
            text.x = (this.game.canvas.width - text.width) / 2.0;
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start(MyGame.Game.kMatchSceneState, true, false);
        };
        return MainMenu;
    }(Phaser.State));
    MyGame.MainMenu = MainMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MatchScene = (function (_super) {
        __extends(MatchScene, _super);
        function MatchScene() {
            _super.apply(this, arguments);
        }
        MatchScene.prototype.create = function () {
            this._match = new MyGame.Match();
            this._AI = new MyGame.AI(this._match);
            this._background = this._CreateBackground();
            this._houses = this._CreateHouses();
        };
        MatchScene.prototype._CreateHouses = function () {
            var ret = new Array();
            for (var i = 0; i < 9; i++) {
                ret.push(this._CreateHouse(i));
            }
            return ret;
        };
        MatchScene.prototype._CreateHouse = function (house) {
            var ret = this.game.add.sprite(0, 0, MyGame.Preloader.kXSprite.key);
            ret.x = (house % 3) * (300 + 40);
            ret.y = Math.floor(house / 3) * (300 + 40);
            ret.alpha = 0.0;
            ret.inputEnabled = true;
            ret.events.onInputDown.add(this._OnClick, this, 0, house);
            return ret;
        };
        MatchScene.prototype._CreateBackground = function () {
            var background = this.add.sprite(0, 0, MyGame.Preloader.kBoardSprite.key);
            background.inputEnabled = true;
            return background;
        };
        MatchScene.prototype._OnClick = function (target, pointer, clickedHouse) {
            this._Play(MyGame.EPlayer.Player1, clickedHouse);
            this._Play(MyGame.EPlayer.Player2, this._AI.Play());
        };
        MatchScene.prototype._Play = function (player, house) {
            this._match.FeedMove(player, house);
            this._houses[house].loadTexture(this._GetSpriteKey(player));
            this._houses[house].alpha = 1.0;
            if (this._match.IsDone() == true) {
                this._EndMatch();
                return;
            }
        };
        MatchScene.prototype._GetSpriteKey = function (player) {
            switch (player) {
                case MyGame.EPlayer.Player1:
                    return MyGame.Preloader.kXSprite.key;
                case MyGame.EPlayer.Player2:
                    return MyGame.Preloader.kOSprite.key;
            }
            return "";
        };
        MatchScene.prototype._EndMatch = function () {
            this.game.state.start(MyGame.Game.kMainMenuState, true, false, this._match);
        };
        return MatchScene;
    }(Phaser.State));
    MyGame.MatchScene = MatchScene;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
            this.ready = false;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(300, 400, Preloader.kPreloadBar.key);
            this.load.setPreloadSprite(this.preloadBar);
            this.preloadImage(Preloader.kBoardSprite);
            this.preloadImage(Preloader.kXSprite);
            this.preloadImage(Preloader.kOSprite);
        };
        Preloader.prototype.preloadImage = function (keyUrlPair) {
            this.load.image(keyUrlPair.key, keyUrlPair.url);
        };
        Preloader.prototype.create = function () {
            this.game.state.start(MyGame.Game.kMainMenuState);
        };
        Preloader.kBoardSprite = { key: "boardSprite", url: "assets/board.png" };
        Preloader.kXSprite = { key: "xSprite", url: "assets/x.png" };
        Preloader.kOSprite = { key: "oSprite", url: "assets/o.png" };
        Preloader.kPreloadBar = { key: "preloadBar", url: "assets/loader.png" };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
