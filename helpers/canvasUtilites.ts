import { canvasRef, setProjectFunction, setStateCurrentState, setStateNumber, setStateString, setStateStringArray } from "@/types/canvasTypes";
import getInitialClient from "./getClient";

//function to download PNG
export const downlaodPNG = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;

    if (canvas) {
        const context = canvas?.getContext("2d");
        if (context) {
            const imageData = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'canvas.png';
            link.target = '_blank';
            
            // Simulate a click on the link
            const clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            link.dispatchEvent(clickEvent);

        }
    }
}

//function to clear canvas
export const clearCanvas = (canvasRef: canvasRef, setStack: setStateStringArray, stack: string[], setTop: setStateNumber) => {
    const canvas = canvasRef.current
    if (canvas) {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth;
        const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            const data = canvas.toDataURL()
            setStack((stack) => [...stack, data])
            setTop(stack.length - 1)
        }
    }
}


//function to undo current change
export const undo = (canvasRef: canvasRef, top: number, setCurrentState: setStateCurrentState, stack: string[], setStack:setStateStringArray,setTop: setStateNumber, setProject: setProjectFunction) => {
    const canvas = canvasRef.current
    if (top > 0) {
        if (canvas) {
            const context = canvas.getContext("2d")
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height)
            }
        }
        setTop(top - 1)
        setStack(stack => [...stack, stack[top]])
        setImage(stack[top], canvasRef)
        setCurrentState(stack[top])
        setProject(stack[top])
    }
}

//function to setImage
export const setImage = (image: string, canvasRef: canvasRef) => {

    const canvas = canvasRef.current
    if (canvas) {

        const context = canvas.getContext("2d")
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            if (image.length > 0) {
                const img = new Image()
                img.onload = () => {
                    context.drawImage(img, 0, 0)
                }
                img.src = image
                return
            }
            // context.globalAlpha=1
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
    }
}
