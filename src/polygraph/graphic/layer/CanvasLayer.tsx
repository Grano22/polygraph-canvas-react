import Canvas from "../Canvas";
import React, {ReactElement, ReactNode, useContext, useEffect, useLayoutEffect, useRef} from "react";
import ReactDOM from "react-dom/client";
import CanvasRenderingContext from "../context/CanvasRenderingContext";

type CanvasLayerProps = {
    children: ReactNode;
    width: number;
    height: number;
};

type CanvasLayerChildrenProps = { children: ReactNode, ctx: CanvasRenderingContext2D };
type CanvasLayerChildren = ReactElement<CanvasLayerChildrenProps> & { children: ReactNode };

const CanvasLayer: React.FC<CanvasLayerProps> = (
    { width, height, children }
) => {
    const canvasContext = useContext(CanvasRenderingContext),
        ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const ctx = ctxRef.current as CanvasRenderingContext2D;

        canvasContext.setCurrentCtx(ctx);

        const CanvasContextRootComponent: React.FC<{ children: any }> = ({ children }) => {
            useEffect(() => {
                console.log('nd');
                canvasContext.handleUnprocessedPaintSteps();
            });

            return children;
        };

        canvasContext.rerender(
            <React.StrictMode>
                <CanvasContextRootComponent>
                    {children}
                </CanvasContextRootComponent>
            </React.StrictMode>
        );

        return () => {

        };
    }, [width, height, children]);

    return <Canvas
            draw={(ctx) => ctxRef.current = ctx}
            width={width}
            height={height}
        />;
}

export default CanvasLayer;
