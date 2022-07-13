import React from 'react';
import { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import styled from "styled-components";
const Styledtitle=styled.h1`
  font-size: 3rem;
`

const Search = () => {
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
        <div >
            <Input onChange={handleChange}/>
            <Button type="primary" icon={<SearchOutlined />} onClick={submitInform}>
                Search
            </Button>
        </div>
    );

};

export default Search;