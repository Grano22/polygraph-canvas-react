import GraphicObjectEventProps from "./GraphicObjectEventProps";

export type Graphic2DObjectProps = GraphicObjectEventProps & {
    readonly posX: number;
    readonly posY: number;
}
