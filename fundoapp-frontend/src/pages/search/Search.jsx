import React,{useState,useContext} from 'react'
import { Context } from '../../context/Context'
import Notes from '../notes/Notes';

function Search() {
    const [searchWord, setSearchWord] = useContext(Context);
    return (
        <div>
            <Notes mode="search" searchWord={searchWord}/>
        </div>
    )
}

export default Search
