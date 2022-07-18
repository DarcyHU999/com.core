import React from 'react';
import {useLocation} from 'react-router-dom'
const Summary = props => {

    let data=useLocation().state
    console.log("-------",data)
    data=JSON.parse(data)
    console.log(data)
    return (
        <div>
            ssss
        </div>
    );
};



export default Summary;