import React from "react";


const Weekday = () => {
    
    return (
        <div>
         <dl className="weekday-lock">
      <dt className="mt-20 text-xs">Week</dt>
      <dd className="text-lg text-primary my-7 mt-10 pr-8">Monday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Tuesday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Wednesday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Thursday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Fridday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Saturday</dd>
      <dd className="text-lg text-primary my-7 pr-8">Sunday</dd>
    </dl>
      </div>
    );
  }


export default Weekday;