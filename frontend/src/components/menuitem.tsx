import React from "react";


const MenuItem = (props) => {
    const {
      menu
    } = props;

  
    return (
        <div>
          <h3>{menu}</h3>
      </div>
    );
  }
  
  export default MenuItem;