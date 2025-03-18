
export interface AddContentInterface {
    Open : Boolean,
    setOpen : (value : boolean) => void
    ytvideos? : boolean,
    tweets? : boolean
}


export interface toshow{
    ytvideos : boolean,
    tweets : boolean
    setytvideos? : Function,
    setTweets? : Function
}