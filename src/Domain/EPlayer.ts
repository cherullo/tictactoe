module MyGame
{
    export enum EPlayer
    {
        None,
        Player1,
        Player2
    }

    export namespace EPlayer
    {
        export function GetOther(player: EPlayer) : EPlayer
        {
            if (player == EPlayer.Player1)
                return EPlayer.Player2;

            if (player == EPlayer.Player2)
                return EPlayer.Player1;

            throw new Error("There is no 'other' for player 'None'.");
        }
    }

}