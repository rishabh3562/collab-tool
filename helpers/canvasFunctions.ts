import { canvasRef, mouseEvent, setStateBoolean, setStateCurrentState, setStateElements, setStateNumber, setStateString, setStateStringArray, textBoxRef, textInputRef } from "@/types/canvasTypes"
import { elements } from "@/types/elements"
import { shapes } from "@/types/shapes"
import React from "react"


//function to handle blur event listener
const blurListener = (
    textInput: HTMLInputElement,
    context: CanvasRenderingContext2D,
    color: string,
    setDisplayText: setStateString,
    x: number,
    y: number,
    setProject: (imgData: string) => Promise<void>,
    stack: string[],
    setStack: setStateStringArray,
    setTop: setStateNumber,
) => {
    const text = textInput.value;
    context.font = "bold 26px Indie Flower"
    context.fillStyle = color
    context.fillText(text, x, y);
    setDisplayText("none")
    textInput.value = '';
    const data = context.canvas.toDataURL()
    setStack(stack=>[...stack, data])
    setTop(stack.length-1)
    setProject(data)
}

//function to start drawing
export const startDrawing = (
    e: mouseEvent,
    setIsDrawing: setStateBoolean,
    setCursor: setStateBoolean,
    setLastX: setStateNumber,
    setLastY: setStateNumber,
    setCurrentX: setStateNumber,
    setCurrentY: setStateNumber,
    shape: string,
    color: string,
    canvasRef: canvasRef,
    textBoxRef: textBoxRef,
    textInputRef: textInputRef,
    setDisplayText: setStateString,
    lastX: number,
    lastY: number,
    setProject: (imgData: string) => Promise<void>,
    stack: string[],
    setStack: setStateStringArray,
    setTop: setStateNumber,


) => {
    console.log("touched")
    setIsDrawing(true)
    setCursor(true)
    if ("touches" in e) {
        setLastX(e.touches[0].clientX)
        setLastY(e.touches[0].clientY)
        setCurrentX(e.touches[0].clientX)
        setCurrentY(e.touches[0].clientY)
    }
    else {
        setLastX(e.clientX)
        setLastY(e.clientY)
        setCurrentX(e.clientX)
        setCurrentY(e.clientY)
    }
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (context) {
        if (shape === "text") {
            setDisplayText("block")
            console.log("Here")
            let x: number, y: number
            if ('touches' in e) {
                x = e.touches[0].clientX
                y = e.touches[0].clientY
            }
            else {
                x = e.clientX
                y = e.clientY
            }
            const textbox = textBoxRef.current
            const textInput = textInputRef.current
            if (textbox && textInput) {

                textbox.style.left = x + 'px';
                textbox.style.top = y + 'px';
                if (textInput) {
                    console.log(textInput)
                    textInput.focus()
                    textInput.addEventListener('blur', blurListener(textInput, context, color, setDisplayText, lastX, lastY, setProject , stack, setStack,setTop) as any);
                    textInput.removeEventListener('blur', blurListener(textInput, context, color, setDisplayText, lastX, lastY, setProject , stack, setStack,setTop) as any)
                }
            }
            setIsDrawing(false)
        }
        else {
            // setIsDrawing(false)
            setDisplayText("hidden")
        }
    }


}


//function to draw
export const draw = (
    e: mouseEvent,
    isDrawing: boolean,
    canvasRef: canvasRef,
    color: string,
    shape: string,
    setCurrentX: setStateNumber,
    setCurrentY: setStateNumber,
    currentX: number,
    currentY: number,
    setElemArr: setStateElements,
    lastX: number,
    lastY: number,
    setLastX: setStateNumber,
    setLastY: setStateNumber
) => {
    e.preventDefault()
    if (!isDrawing) return;
    const canvas: HTMLCanvasElement | null = canvasRef.current
    if (canvas) {

        const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
        if (context) {
            context.strokeStyle = color
            if (shape === "square" || shape === "diamond") {
                if ('touches' in e) {
                    setCurrentX(e.touches[0].clientX)
                    setCurrentY(e.touches[0].clientY)
                }
                else {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                }
                const width = (currentX - lastX)
                const height = (currentY - lastY)
                setElemArr((elemArr) => [...elemArr, { lastX, lastY, width, height, currentX, currentY }])


            }

            else if (shape === "circle") {
                if ('touches' in e) {
                    setCurrentX(e.touches[0].clientX)
                    setCurrentY(e.touches[0].clientY)
                }
                else {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                }
                const radius = Math.sqrt(
                    Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
                );
                setElemArr((elemArr) => [...elemArr, { lastX, lastY, radius }])
            }

            else if (shape === "arrow") {
                if ('touches' in e) {
                    setCurrentX(e.touches[0].clientX)
                    setCurrentY(e.touches[0].clientY)
                }
                else {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                }
                setElemArr((elemArr) => [...elemArr, { lastX, lastY, currentX, currentY }])

            }

            else if (shape === "erasure") {
                const eraserSize = 50
                const rect = canvas.getBoundingClientRect()
                let x, y
                if ('touches' in e) {
                    x = e.touches[0].clientX - rect.left
                    y = e.touches[0].clientY - rect.top
                }
                else {
                    x = e.clientX - rect.left
                    y = e.clientY - rect.top
                }

                context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
            }

            else if (shape === "line") {
                let clientX: number, clientY: number
                if ('touches' in e) {
                    setCurrentX(e.touches[0].clientX)
                    setCurrentY(e.touches[0].clientY)
                    clientX = e.touches[0].clientX
                    clientY = e.touches[0].clientY
                }
                else {
                    setCurrentX(e.clientX)
                    setCurrentY(e.clientY)
                    clientX = e.clientX
                    clientY = e.clientY
                }


                setElemArr((elemArr) => [...elemArr, { lastX, lastY, clientX, clientY }])
                context.lineWidth = 2;
                context.strokeStyle = color;

            }
            else {
                let x, y
                if ('touches' in e) {
                    x = e.touches[0].clientX
                    y = e.touches[0].clientX
                    // setCurrentX(e.touches[0].clientX)
                    // setCurrentY(e.touches[0].clientY)
                }
                else {
                    x = e.clientX
                    y = e.clientY
                    // setCurrentX(e.clientX)
                    // setCurrentY(e.clientY)
                }
                context.lineWidth = 4

                context.strokeStyle = color
                context.beginPath();
                context.moveTo(lastX, lastY)
                context.lineTo(x, y)
                context.stroke()

                if ('touches' in e) {
                    setLastX(x)
                    setLastY(y)
                }
                else {
                    setLastX(x)
                    setLastY(y)
                }
            }

        }
    }


}

//function to stop drawing
export const stopDrawing = (e: mouseEvent, canvasRef: canvasRef, setCursor: setStateBoolean, setIsDrawing: setStateBoolean, elemArr: elements[], color: string, shape: shapes, setElemArr: setStateElements, stack: string[], setStack: setStateStringArray, setTop: setStateNumber, setCurrentState: setStateCurrentState, setProject: (data: any) => Promise<void>) => {
    setIsDrawing(false)
    setCursor(false)
    const canvas: HTMLCanvasElement | null = canvasRef.current
    if (canvas && shape !== "free") {
        const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
        if (context) {
            if (elemArr.length > 0) {
                const { lastX, lastY, width, height, radius, currentX, currentY,clientX,clientY } = elemArr[elemArr.length - 1]
                context.lineWidth = 4
                context.strokeStyle = color
                context.fillStyle = color
                // context.globalAlpha = 0.3
                context.beginPath()
                if (shape === "square") {
                    context.rect(lastX, lastY, width ? width : 0, height ? height : 0)
             
                }
                else if(shape ==="diamond" && width && height){
                    context.moveTo(lastX, lastY);
                    context.lineTo(lastX - width / 2, lastY + height / 2);
                    context.lineTo(lastX, lastY + height);
                    context.lineTo(lastX + width / 2, lastY + height / 2);
                    context.closePath();
  
                }
                else if (shape === "circle") {
                    context.arc(lastX, lastY, radius ? radius : 0, 0, 2 * Math.PI);
                }
                else if (shape === "arrow") {
                    if (currentX && currentY) {
                        const angle = Math.atan2(currentY - lastY, currentX - lastX);
                        const length = Math.sqrt((currentX - lastX) ** 2 + (currentY - lastY) ** 2);
                        context.moveTo(lastX, lastY);
                        context.lineTo(currentX, currentY);
                        context.stroke();

                        // Draw the arrowhead
                        context.save();
                        context.translate(currentX, currentY);
                        context.rotate(angle);
                        context.beginPath();
                        context.moveTo(0, 0);
                        context.lineTo(-10, -5);
                        context.lineTo(-10, 5);
                        context.closePath();
                        context.fill();
                        context.restore();
                    }
                }
                else if (shape === "line" && clientX && clientY) {
                    context.moveTo(lastX, lastY);
                    context.lineTo(clientX,clientY)
                    // if ('touches' in e) {
                    //     console.log(e.touches)
                    //     context.lineTo(clientX, clientY)
                    // }
                    // else {
                    //     context.lineTo(e.clientX, e.clientY)
                    // }
                    context.stroke()
                }
                context.stroke()
                // context.fill()
                setElemArr([])
            }
        }
        const dataUrl = canvas.toDataURL()
        setCurrentState(dataUrl)
        setStack((stack) => [...stack, dataUrl])
        setTop(stack.length - 1)
        setProject(dataUrl)

    }

}


