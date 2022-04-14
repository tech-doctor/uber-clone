import React from "react";

interface Props {
  heading: string;
}

const FormHeading:React.FC<Props> = ({heading}) => {
  return(
    <div className={`hidden sm:block font-[UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif] text-4xl font-medium px-3 py-3`}>
      {heading}
    </div>
  )
}

export default FormHeading;