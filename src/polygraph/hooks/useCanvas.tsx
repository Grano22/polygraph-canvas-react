import {SyntheticEvent, useContext, useEffect} from "react";
import CanvasRenderingContext from "../graphic/context/CanvasRenderingContext";
import GraphicObjectEventProps from "../graphic/figure/GraphicObjectEventProps";

export default function useCanvas() {
    const { ctx } = useContext(CanvasRenderingContext);

    const resetCtx = () => {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 0;
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 10;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'start';
        ctx.textBaseline = 'alphabetic';
        //ctx.globalCompositeOperation = 'source-out';
        //ctx.globalCompositeOperation = 'source-over';
    };

    const boundEvents = (eventProps: GraphicObjectEventProps) => {
        for (const [ eventName, eventCB ] of Object.entries(eventProps)) {
            if (eventName.indexOf('on') === 0) {
                ctx.canvas.addEventListener(
                    eventName.replace('on', '').toLowerCase(),
                    eventCB as (evt: Event) => void
                );
            }
        }
    };

    const unboundEvents = (eventProps: GraphicObjectEventProps) => {
        for (const [ eventName, eventCB ] of Object.entries(eventProps)) {
            if (eventName.indexOf('on') === 0) {
                ctx.canvas.removeEventListener(
                    eventName.replace('on', '').toLowerCase(),
                    eventCB as (evt: Event) => void
                );
            }
        }
    };

    useEffect(() => {
        console.log('1s', ctx.globalCompositeOperation);
        return () => {
            console.log('1c', ctx.globalCompositeOperation);
        }
    });

    return {
        ctx,
        resetCtx,
        boundEvents,
        unboundEvents
    };
};
