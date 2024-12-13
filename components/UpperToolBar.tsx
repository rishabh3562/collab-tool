import React, { useState } from 'react'
import { BsArrowUpRight, BsCircle, BsDiamond, BsEraser, BsPenFill, BsPencil } from 'react-icons/bs'
import { BiSquare, BiUndo } from 'react-icons/bi'
import { shapes } from '@/types/shapes'
import { AiOutlineDownload } from 'react-icons/ai'
import { MdOutlineClear } from 'react-icons/md'
import {GiStraightPipe} from 'react-icons/gi'

type props = {
    setShape : React.Dispatch<React.SetStateAction<shapes>>
    shape:  shapes
    download: ()=>void
    clear:()=>void
    undo:()=>void
}

const UpperToolBar = ({setShape, shape, clear, undo, download}:props) => {
    
    return (
        <div className='absolute w-[90%] flex-wrap md:w-auto text-xl flex p-3 items-center gap-3 top-2 left-[50%] -translate-x-[50%] bg-black/20 text-white rounded-md'>
            <div onClick={() => setShape("square")} className={`p-1 ${shape === "square" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <BiSquare />
            </div>
            <div onClick={() => setShape("circle")} className={`p-1 ${shape === "circle" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <BsCircle className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("arrow")} className={`p-1 ${shape === "arrow" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <BsArrowUpRight className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("diamond")} className={`p-1 ${shape === "diamond" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <BsDiamond className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("line")} className={`p-1 ${shape === "line" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <GiStraightPipe className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("free")} className={`p-1 ${shape === "free" ? "bg-green-500/70 text-white" : ""}  hidden xl:block cursor-pointer rounded-md`}>
                <BsPencil className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("erasure")} className={`p-1 ${shape === "erasure" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <BsEraser className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => setShape("text")} className={`p-1 ${shape === "text" ? "bg-green-500/70 text-white" : ""}  cursor-pointer rounded-md`}>
                <p className = 'text-sm px-1'>A</p>
            </div>
            <div className='bg-white/80 h-6 w-[2px]'></div>
            <div onClick={() => undo()} className={`p-1   cursor-pointer rounded-md`}>
                <BiUndo className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => download()} className={`p-1   cursor-pointer rounded-md`}>
                <AiOutlineDownload className='cursor-pointer text-lg' />
            </div>
            <div onClick={() => clear()} className={`p-1   cursor-pointer rounded-md`}>
                <MdOutlineClear className='cursor-pointer text-red-500 text-lg' />
            </div>

        </div>
    )
}

export default UpperToolBar