import useCanvas from "../../hooks/useCanvas";
import React, {useCallback, useEffect} from "react";
import {Graphic2DObjectProps} from "./Grahic2DObject";
import usePaintEffect from "../../hooks/usePaintEffect";

type CircleProps = Graphic2DObjectProps & {
    readonly radius: number;
};

const Circle: React.FC<CircleProps> = ({ posX, posY, radius, ...restProps }) => {
    const detectArea = useCallback(() => {
        return true;
    }, [posX, posY, radius]);

    usePaintEffect(
        (ctx) => {
            ctx.beginPath();
            ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            //ctx.strokeStyle = "#000";

            console.log('2s - circle', ctx.globalCompositeOperation);

            return () => {
                //ctx.beginPath();
                //ctx.arc(posX, posY, radius, 0, Math.PI*2);
                //ctx.fill();
                //ctx.globalCompositeOperation = 'copy';
                console.log('2c - circle', ctx.globalCompositeOperation);
            }
        },
        detectArea,
        [posX, posY, radius],
        restProps
    );

    return null;
}

export default Circle;
