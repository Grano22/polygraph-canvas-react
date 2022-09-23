import {CleanupEffectCaller, PaintEffectCaller} from "../../../hooks/usePaintEffect";

type CanvasRenderingAction = 'clearAll' | '';
type CanvasPaintStepState = 'rendered' | 'awaiting' | 'queued' | 'cleaned';

export default class CanvasRenderingStepOrchestrator {
    #paintSteps: PaintEffectCaller[] = [];
    #paintStepsData: WeakMap<PaintEffectCaller, CanvasPaintStepState>;
    #cleanupSteps: WeakMap<PaintEffectCaller, CleanupEffectCaller>;
    #actions: CanvasRenderingAction[] = [];

    constructor() {
        this.#paintStepsData = new WeakMap();
    }

    has(paintStep: PaintEffectCaller): boolean {
        return this.#paintStepsData.has(paintStep);
    }

    register(paintStep: PaintEffectCaller): void {
        this.#paintSteps.push(paintStep);
        this.#paintStepsData.set(paintStep, 'awaiting');
    }

    handleCleanup(cleanupStep: CleanupEffectCaller): void {
        //this.#cleanupSteps
        this.#paintStepsData.set();
    }

    handlePaint(paintStep: PaintEffectCaller): void {
        this.#paintStepsData.set(paintStep, 'rendered');
    }

    handleUnprocessed(ctx: CanvasRenderingContext2D): void {
        for (const paintStepFn of this.#paintSteps) {
            const called = this.#paintStepsData.get(paintStepFn);
            if (!called) {
                paintStepFn(ctx);
                this.#paintStepsData.set(paintStepFn, 'rendered');
            }
        }
    }

    reset(): void {
        for (const paintStepFn of this.#paintSteps) {
            this.#paintStepsData.set(paintStepFn, 'awaiting');
        }
    }
}
