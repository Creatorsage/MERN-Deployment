import {useParams , useNavigate , Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const OnePet = (props) => {
    const{id} = useParams();
    const[pet,setPet] = useState(null);
    const[isLiked,SetIsLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then (res => {
                console.log(res.data);
                setPet(res.data);
            }).catch (err => {
                console.log(err)
            })
    },[id])
    
    const handleDelete= ()=> {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
            .then (res => {
                navigate('/pets')
            }).catch(err => {
                console.log(err);
            })
    }


    const handleAddLikes = () => {
        axios.patch(`http://localhost:8000/api/pets/${id}/likes`, {
            likes: pet.likes + 1
        })
        .then(res => {
            setPet({...pet, likes: res.data.likes});
            SetIsLiked(true);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    if(pet === null){
        return null;
    }

    const{name,type,description,skill1,skill2,skill3,likes} = pet;
    
    return(
        <div className='w-100 max-auto shadow mb-4 rounded boarder p-4'>
            <h1>Detailes about : {name} </h1>
            <h3>Pet type : {type}</h3>
            <h3>Description : {description}</h3>
            <h3> Skills : 
                <ol>
                <li>{skill1}</li>
                <li>{skill2}</li>
                <li>{skill3}</li>
                </ol>
            </h3>
            <p>{likes}</p>
            <Link to ={`/pets/${id}/edit`} className="p-2 col col-lg-3"> Edit {name}</Link>
            <button onClick={handleDelete} className='btn btn-sm btn-outline-danger max-1'>Adopt {name}</button>
            <br></br>
            <button onClick={handleAddLikes} disabled={isLiked} className='btn btn-sm btn-outline-danger max-1'>Like {name}</button>
        </div>
    );
};
