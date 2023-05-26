import './App.css';
import Cards from './components/Cards/Cards';
import NavBar from './components/Nav/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form/Form';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About';
import Detail from './components/Detail';
import Favorites from './components/Favorites/Favorites';

function App() {        //Componente
   const [/*estado*/characters,/*funcion seteadora del estado*/ setCharacters] = useState(/*Estado Inicial*/[])
   const { pathname } = useLocation()

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   async function login(userData) {
      try {
         const { email, password } = userData;
         const URL = "http://localhost:3001/rickandmorty/login/";
         const { data } = await axios(URL + `?email=${email}&password=${password}`);
         const { access } = data;
         setAccess(access);
         access && navigate("/home");
      } catch (error) {
         console.log(error.message);
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   async function onSearch(id) {
      try {
         const { data } = await axios(
            `http://localhost:3001/rickandmorty/character/${id}`
         );
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            alert("¡No hay personajes con este ID!");
         }
      } catch (error) {
         console.log(error);
      }
   }
   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== Number(id);
         })
      );
   };
   return (          //Renderiza el sig contenedor <div>
      <div className='App'>
         {pathname !== '/' && <NavBar onSearch={onSearch} />}
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
         </Routes>

      </div>
   );
}

export default App;
