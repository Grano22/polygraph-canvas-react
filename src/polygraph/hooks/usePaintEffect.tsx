import {useContext, useEffect} from "react";
import useCanvas from "./useCanvas";
import CanvasRenderingContext from "../graphic/context/CanvasRenderingContext";
import GraphicObjectEventProps from "../graphic/figure/GraphicObjectEventProps";

export type CleanupEffectCaller = () => void;
export type PaintEffectCaller = (ctx: CanvasRenderingContext2D) => CleanupEffectCaller
export type PaintAreaDetector = () => boolean;

export default function usePaintEffect(
    effect: PaintEffectCaller,
    areaDetector: PaintAreaDetector,
    deps: any[] = [],
    eventProps: GraphicObjectEventProps = {}
): void {
    const canvasRenderingContext = useContext(CanvasRenderingContext);
    const { ctx, resetCtx, boundEvents, unboundEvents } = useCanvas();

    useEffect(() => {
        resetCtx();
        canvasRenderingContext.handleRenderPaintStep(effect);
        const onCleanup = effect(ctx);
        if (Object.keys(eventProps).length > 0) {
            boundEvents(eventProps);
        }

        return () => {
            resetCtx();
            onCleanup();
            if (Object.keys(eventProps).length > 0) {
                unboundEvents(eventProps);
            }
        }
    }, deps);
}
