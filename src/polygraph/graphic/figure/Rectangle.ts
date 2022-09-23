import {Graphic2DObjectProps} from "./Grahic2DObject";
import React, {useEffect} from "react";
import useCanvas from "../../hooks/useCanvas";
import usePaintEffect from "../../hooks/usePaintEffect";

type RectangleProps = Graphic2DObjectProps & {
    readonly width: number;
    readonly height: number;
    readonly borderColor?: string;
    readonly borderSize?: number;

};

const Rectangle: React.FC<RectangleProps> = (
    {
        posX,
        posY,
        width,
        height,
        borderColor,
        borderSize,
        ...restProps
    }
) => {
    const detectArea = () => {
        return true;
    };

    usePaintEffect(
        (ctx) => {
            const borderFinalSize = Number(borderSize || 2);

            ctx.beginPath();
            ctx.fillStyle = borderColor || "#FFFFFF";
            ctx.lineWidth = borderFinalSize;
            ctx.fillRect(posX, posY, width, height);
            ctx.stroke();

            console.log('2s - rectangle', ctx.globalCompositeOperation);

            return () => {
                //ctx.globalCompositeOperation = 'destination-out';
                ctx.clearRect(
                    posX - borderFinalSize,
                    posY - borderFinalSize,
                    width + borderFinalSize * 2,
                    height + borderFinalSize * 2
                );
                //ctx.globalCompositeOperation = 'source-over';
                console.log('2c - rectangle', ctx.globalCompositeOperation);
            };
        },
        detectArea,
        [posX, posY, width, height],
        restProps
    );

    return null;
};

export default Rectangle;
