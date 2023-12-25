import React,{ Component ,useEffect, useState} from 'react'
import UserService from '../../services/UserService'
import Display from '../../components/display/Display';


const userService = new UserService();

export default function Archives() {
    const [notes, setNotes] = useState([""]);
    const displayNote = () => {
        let config = {
            headers: {
                'Authorization' : localStorage.getItem("id"),
            }
        };
        userService.displayNotes("/notes/getArchivedNotes",config)
        .then((res)=>{
            const data = res;
            const notes = data;
            setNotes(notes.data);
            console.log("Archived Notes displayed");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        displayNote();
   },[]);
    return (
        <div>
            <Display data={notes} displayAfterUpdate = {displayNote}/> 
        </div>
    )
}

