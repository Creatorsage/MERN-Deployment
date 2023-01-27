import { useEffect, useState } from "react";
import {useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EditPet = (props) => {
    const {id} = useParams();
    
    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [description,setDescription] = useState("");
    const [skill1,setSkill1] = useState("")
    const [skill2,setSkill2] = useState("")
    const [skill3,setSkill3] = useState("")

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then (res => {
                console.log(res);
                const {name,type,description,skill1,skill2,skill3} = res.data
                setName(name);setType(type);setDescription(description);
                setSkill1(skill1);setSkill2(skill2);setSkill3(skill3);
            }).catch (err => {
                console.log(err);
            })
    },[id])

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const editedPet = {name,type,description,skill1,skill2,skill3}
        axios.put(`http://localhost:8000/api/pets/${id}`,editedPet)
            .then (res => {
                console.log(res);
                navigate(`/pets/${id}`)
            }).catch (err => {
                console.log(err.response);
                setErrors(err.response?.data?.errors)
            })
    }
    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
        <h3 className="text-center"> Edit {name}</h3>
        <form onSubmit={e => {handleUpdate(e)}}>
            <div className="form-group">
                <label className="h6"> Pet Name : </label>
                {
                    errors?.name && (
                        <p style ={{color:'red'}}> {errors.name?.message}</p>
                    )
                }
                <input onChange={(event) => {setName(event.target.value);}} type ="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="h6"> Pet Type : </label>
                {
                    errors?.type && (
                        <p style ={{color:'red'}}> {errors.type?.message}</p>
                    )
                }
                <input onChange={(event) => {setType(event.target.value);}} type ="text" className="form-control" value={type}/>
            </div>
            <div className="form-group">
                <label className="h6"> Pet Description : </label>
                {
                    errors?.description && (
                        <p style ={{color:'red'}}> {errors.description?.message}</p>
                    )
                }
                <input onChange={(event) => {setDescription(event.target.value);}} type ="text" className="form-control" value={description}/>
            </div>
            <div className="form-group">
                <label className="h6"> Skill 1: </label>
                <input onChange={(event) => {setSkill1(event.target.value);}} type ="text" className="form-control" value={skill1}/>
            </div>
            <div className="form-group">
                <label className="h6"> Skill 2: </label>
                <input onChange={(event) => {setSkill2(event.target.value);}} type ="text" className="form-control" value={skill2}/>
            </div>
            <div className="form-group">
                <label className="h6"> Skill 3: </label>
                <input onChange={(event) => {setSkill3(event.target.value);}} type ="text" className="form-control" value={skill3}/>
            </div>
            <button type="submit" className="btn btn-sm btn-outline-success"> Edit Pet </button>
        </form>
    </div>
    )
}
