import React from 'react'; 

// The type for variable 'name' was not defined so I gave it an any type
const Greeting = ({ name }: {name: any}) => { 
return <div>Hello, {name}!</div>;
 };
 export default Greeting;