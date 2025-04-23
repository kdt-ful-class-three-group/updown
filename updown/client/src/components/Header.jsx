import React from "react"

export const Header = ({ name }) => {
return ( 
    <header>
      {name && <div>어서오세요 {name}님</div>}
    </header>
 )
}
