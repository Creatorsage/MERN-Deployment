import {Link,Navigate, Route,Routes} from 'react-router-dom';
import './App.css';

import { AllPets} from './components/AllPets';
import { EditPet } from './components/EditPet';
import { NewPet } from './components/NewPet';
import { NotFound } from './components/NotFound ';
import { OnePet } from './components/OnePet';

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg nav-light bg-light sticky-top justify-content-center mb-4">
      <h1 className='navbar-brand mb-0'> Pet Shelter </h1>
      <div className='navbar-nav justify-content-between'>
      <Link to="/pets" className='btn btn-sm btn-outline-primary mx-1'>Home</Link>
      <Link to="/pets/new" className='btn btn-sm btn-outline-primary mx-1'>add a pet to the Shelter</Link>
      </div>
      </nav>
      <Routes>
        <Route path='/' element ={<Navigate to ='/pets' replace/>}/>
        <Route path='/pets' element={<AllPets/>}/>
        <Route path='/pets/new' element={<NewPet/>}/>
        <Route path='/pets/:id' element={<OnePet/>}/>
        <Route path='/pets/:id/edit' element= {<EditPet/>}/>
        <Route path = '*' element ={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
