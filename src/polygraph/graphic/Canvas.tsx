import React, {ReactNode, useEffect, useRef} from "react";

type CanvasProps = {
    [key: string]: any;
    draw: (context: CanvasRenderingContext2D) => void;
    width: number;
    height: number;
}

const Canvas: React.FC<CanvasProps> = ({ draw, width, height, ...restCanvasProps }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasElementRef =  canvasRef.current as HTMLCanvasElement,
            canvasContext = canvasElementRef.getContext('2d') as CanvasRenderingContext2D;

        draw && draw(canvasContext);
    }, [width, height]);

    return (
        <canvas ref={canvasRef} width={width} height={height} {...restCanvasProps}>
            This game cannot be run on this browser, please change it to newer.
        </canvas>
    );
}

export default Canvas;
