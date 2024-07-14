
export enum GunType {
    SMALL = 'small',
    BIG = 'big',
    NONE = 'none'
}
export interface Gun {
    type: GunType;
    isInHand: boolean; // at the beginning true, after 1s false
    isMoving: boolean; // after 1s from isInHand false, set this to true. This will start the animation of the banana moving
    showRain: boolean;
    delta: number;
}
export enum Direction {
    LEFT = "left",
    RIGHT = "right"
}
export interface Player {
    direction: Direction;
    position: number;
    health: number;
    gun: Gun;
    isShooting: boolean;
    image: string;
}