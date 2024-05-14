import { elements } from "./elements"

export type setStateBoolean = React.Dispatch<React.SetStateAction<boolean>>
export type setStateElements = React.Dispatch<React.SetStateAction<elements[]>>
export type canvasRef = React.RefObject<HTMLCanvasElement>
export type textBoxRef = React.RefObject<HTMLDivElement>
export type textInputRef = React.RefObject<HTMLInputElement>
export type mouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>
export type setStateStringArray = React.Dispatch<React.SetStateAction<string[]>>
export type setStateNumber =  React.Dispatch<React.SetStateAction<number>>
export type setStateString =  React.Dispatch<React.SetStateAction<string>>
export type setStateCurrentState =  React.Dispatch<React.SetStateAction<string | null >>
export type setProjectFunction = (data:string)=>Promise<any>