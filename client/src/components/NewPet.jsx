import axios from "axios";
import { useState } from "react";
import { useNavigate} from "react-router-dom";

export const NewPet = (props) => {
    const [name,setName] = useState("");
    const[type,setType] = useState("");
    const [description,setDescription] = useState("");
    const [skill1,setSkill1] = useState("")
    const [skill2,setSkill2] = useState("")
    const [skill3,setSkill3] = useState("")

    const[errors,setErrors] = useState(null);

    const navigate = useNavigate();

    const createPet = async(e) => {
        e.preventDefault();
        const NewPet = {name,type,description,skill1,skill2,skill3}
        axios.post('http://localhost:8000/api/pets',NewPet)
            .then(res => {
                console.log("Create Console log" + res.data);
                navigate(`/pets/${res.data._id}`)
            }).catch (err => {
                console.log(err.response);
                if(err.response.data.code === 11000){
                    setErrors({ name: { message: "A pet with that name already exists" } });
                }else{
                setErrors(err.response?.data?.errors)
            }
            })
    }

    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3 className="text-center"> Know  a pet needing a home?</h3>
            <form onSubmit={e => {createPet(e)}}>
                <div className="form-group">
                    <label className="h6"> Pet Name : </label>
                    {
                    errors?.name && (
                        <p style ={{color:'red'}}> {errors.name?.message}</p>
                    )
                    }
                    <input onChange={(event) => {setName(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="h6"> Pet Type : </label>
                    {
                    errors?.type && (
                        <p style ={{color:'red'}}> {errors.type?.message}</p>
                    )
                    }
                    <input onChange={(event) => {setType(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="h6"> Pet Description : </label>
                    {
                    errors?.description && (
                        <p style ={{color:'red'}}> {errors.description?.message}</p>
                    )
                    }
                    <input onChange={(event) => {setDescription(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="h6"> Skill 1: </label>
                    <input onChange={(event) => {setSkill1(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="h6"> Skill 2: </label>
                    <input onChange={(event) => {setSkill2(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="h6"> Skill 3: </label>
                    <input onChange={(event) => {setSkill3(event.target.value);}} type ="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-sm btn-outline-success"> Add Pet </button>
            </form>
        </div>
    )
}

export default NewPet;
