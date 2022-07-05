import { useState } from "react";
import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Input } from 'antd';
import axios from 'axios';

function App() {
    const [inputInform, setInput] = useState("");
    function handleChange(event) {
        setInput(previousState => {
            console.log({inputInform});
            return { ...previousState, inputInform: event.target.value }
        })
    }
    function submitInform(){
        let data={
            "apiURL":"https://imdb-api.com/en/API/Top250Movies/k_6rjwdxn6",
            "keyword":inputInform.inputInform
        }
        axios.post('http://localhost:8080/api/v1/UserEntry', data)
            .then(function (response) {
                console.log("ok");
                console.log("ok");






            })
            .catch(function (error) {

                console.log(error);

            });

    }

  return (
    <div className="App">

        <Input onChange={handleChange}/>
        <Button type="primary" icon={<SearchOutlined />} onClick={submitInform}>
            Search
        </Button>

        

    </div>
  );
}

export default App;
