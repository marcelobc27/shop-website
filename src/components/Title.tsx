import { PropsWithChildren } from "react";

interface TitleProps {
  
}

function Title(props : PropsWithChildren<TitleProps>){
  return(
    <h1 className="text-2xl pb-4">
      {props.children}
    </h1>
  )
}

export default Title;