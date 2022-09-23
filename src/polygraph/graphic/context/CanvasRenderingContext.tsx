import React from "react";
import ReactDOM, {Root} from "react-dom/client";
import {PaintEffectCaller} from "../../hooks/usePaintEffect";
import CanvasRenderingStepOrchestrator from "./steps/CanvasRenderingStepOrchestrator";

class CanvasRenderingContextAccessor {
    #currentCtx: CanvasRenderingContext2D | null;
    #contexts: CanvasRenderingContext2D[];
    #contextsData: WeakMap<CanvasRenderingContext2D, CanvasRenderingStepOrchestrator>;
    #ctRoot: Root;

    get hasContext(): boolean
    {
        return this.#currentCtx !== null;
    }

    get ctx(): CanvasRenderingContext2D
    {
        if (this.#currentCtx === null) {
            throw new Error('Cannot access canvas context when is unavailable');
        }

        return this.#currentCtx;
    }

    constructor() {
        this.#contexts = [];
        this.#contextsData = new WeakMap<CanvasRenderingContext2D, CanvasRenderingStepOrchestrator>();
        this.#currentCtx = null;
        this.#ctRoot = ReactDOM.createRoot(document.createDocumentFragment()); //virtualCanvasDom
    }

    setCurrentCtx(newContextCtx: CanvasRenderingContext2D) {
        if (!this.#contexts.includes(newContextCtx)) {
            this.#contexts.push(newContextCtx);
            this.#contextsData.set(newContextCtx, new CanvasRenderingStepOrchestrator());
        }

        this.#currentCtx = newContextCtx;
    }

    handleCleanupPainStep(): void {

    }

    handleRenderPaintStep(paintStepFn: PaintEffectCaller): void {
        if (!this.#getCurrentContextData().has(paintStepFn)) {
            this.#getCurrentContextData().register(paintStepFn);
        }

        this.#getCurrentContextData().handlePaint(paintStepFn);
    }

    handleUnprocessedPaintSteps(): void {
        this.#getCurrentContextData().handleUnprocessed(this.ctx);
    }

    rerender(children: any) {
        this.#getCurrentContextData().reset();
        this.#ctRoot.render(children);
    }

    #getCurrentContextData(): CanvasRenderingStepOrchestrator {
        return this.#contextsData.get(this.ctx) as CanvasRenderingStepOrchestrator;
    }
}

const CanvasRenderingContext = React.createContext<CanvasRenderingContextAccessor>(new CanvasRenderingContextAccessor());

export default CanvasRenderingContext;
