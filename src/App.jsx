import { useState, useEffect } from 'react'

import './App.css';

function App() {
  
  const [lista, setLista] = useState([]);     // estado Task item
  const [item, setItem] = useState("");       // estado item Lista ToDo

  // Faltaba cargar lista desde local storage cuando inicia la aplicacion
  useEffect(() => {
    const storedLista = JSON.parse(localStorage.getItem('listadeitems'));
    if (storedLista) {
      setLista(storedLista);
    }
  }, []);

  
    // Esto me permite utilizar local storage en mi aplicación
    useEffect(() => {
      localStorage.setItem('listadeitems', JSON.stringify(lista));
    }, [lista]);

  const handleAgregarItem = () => {
    if(item.trim() !== ''){
      setLista([item, ...lista]);
      setItem('');
    }
  }

  const handleEliminarItem = (index) => {
    const nuevaLista = lista.filter((_,i) => i !== index);
    setLista(nuevaLista);
  } 


  return (
    <>
      <div className='w-full bg-black'>
        <header className='app-header'>
          <h1 className='text-sm'> Lista de Items </h1>
        </header>
        
        <div className='lista-input'>
          <input type="text" 
                placeholder='Agrega un nuevo item' 
                value={item} 
                onChange={(e)=>setItem(e.target.value)}
          />
          <button onClick={handleAgregarItem}> Agregar item</button>
        </div>
        <ul className='lista-items'>
          {lista.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleEliminarItem(index)}>Eliminar item</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default App
