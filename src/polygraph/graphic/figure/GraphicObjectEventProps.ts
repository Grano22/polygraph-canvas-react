type GraphicObjectEventProps = {
    onClick?: (e: MouseEvent) => void;
    onDBClick?: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onKeyUp?: (e: KeyboardEvent) => void;
    onTouch?: (e: TouchEvent) => void;
};

export default GraphicObjectEventProps;
