import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

export const AllPets = (props) => {
    const [pets,setPets] = useState ([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then (res => {
                console.log(res.data)
                let pets = res.data
                pets.sort((a,b)=> (a.type > b.type) ? 1 : -1)
                setPets(pets)
                // setPets(res.data);
            }).catch (err => {
                console.log(err);
            })
    },[])

    const handleDelete = (idToBeDeleted) => {
        axios.delete(`http://localhost:8000/api/pets/${idToBeDeleted}`)
            .then (res => {
                const filteredpets = pets.filter((pet) => {
                    return pet._id !== idToBeDeleted;
                })
                setPets(filteredpets);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h3>these pets are looking for a good home</h3>
                <table className="table table-dark">
                    <tbody>
                        <tr className="table-active">
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        {pets.map((pet) =>{
                            const {_id,name,type} = pet;
                            return (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{type}</td>
                                    <td>
                                    <Link to ={`/pets/${_id}`} className="p-2 col col-lg-3">Details</Link>
                                    <Link to ={`/pets/${_id}/edit`} className="p-2 col col-lg-3">Edit</Link>
                                    <button onClick={event=> {handleDelete(_id)}} className='btn btn-sm btn-outline-danger max-1'>Adopt</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default AllPets;