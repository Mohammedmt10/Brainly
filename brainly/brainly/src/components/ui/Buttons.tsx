import { ReactElement } from "react"

interface ButtonProps {
    variant : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    text : string,
    startIcon? : ReactElement,
    endIcon? : ReactElement,
    onClick? : () => void
}

const variantStyles = {
    primary: "text-white bg-purple-400",
    secondary: "text-purple-300 bg-purple-200",
};

const sizeStyles = {
    sm:'',
    md : "px-3 py-2 rounded-md text-center gap-3 text-lg font-normal",
    lg : 'px-20 py-2 rounded-md text-center gap-3 text-lg font-normal'
}

export default function Button(props : ButtonProps) {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} flex gap-1 items-center`}>{props.startIcon}{props.text}</button>
}