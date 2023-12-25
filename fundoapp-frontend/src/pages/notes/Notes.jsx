import React,{ Component ,useContext,useEffect, useState} from 'react'
import UserService from '../../services/UserService';
import TakeNotes from '../../components/takenotes/TakeNotes';
import Display from '../../components/display/Display';

const userService = new UserService();

export default function Notes(props) {
    const [notes, setNotes] = useState([]);
        
    const displayNote = () => {
        let config = {
            headers: {
                'Authorization' : localStorage.getItem("id"),
            }
        };
        userService.displayNotes("/notes/getNotes",config)
        .then((res)=>{
            const data = res;
            let notes = data;
            setNotes(notes.data);
            console.log(notes.data);
            console.log("Notes displayed");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    React.useEffect(()=>{
        displayNote();
   },[]);
    return (
        <div>
            { props.mode=="search" ? (props.searchWord.length != 0 ? <Display data={notes.filter(ele => ((ele.title.includes(props.searchWord) || ele.description.includes(props.searchWord))) && ele.isDeleted == false)} displayAfterUpdate = {displayNote}/> : '')
                :
                <div>
                <TakeNotes displayAfterAdd = {displayNote}/>
                <Display data={notes.filter(ele => ele.isArchived == false && ele.isDeleted == false)} displayAfterUpdate = {displayNote}/> 
                </div>
            }
        </div>
    )
}
