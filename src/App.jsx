import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import CURSO1P1 from './CURSOS/CURSO1/CURSOP1/CURSO1P1';
import CURSO1P2 from './CURSOS/CURSO1/CURSOP2/CURSO1P2';
import CURSO1P3 from './CURSOS/CURSO1/CURSOP3/CURSO1P3';
import CURSO2P1 from './CURSOS/CURSO2/CURSO2P1/CURSO2P1';
import CURSO2P2 from './CURSOS/CURSO2/CURSO2P2/CURSO2P2';
import CURSO2P3 from './CURSOS/CURSO2/CURSO2P3/CURSO2P3';
import CURSOEJEMPLO from "./CURSOS/CURSOEJEMPLO/CURSOEJEMPLOP1/CURSOEJEMPLO";
import CURSOEJEMPLOP2 from "./CURSOS/CURSOEJEMPLO/CURSOEJEMPLOP2/CURSOEJEMPLOP2";
import CURSOEJEMPLOP3 from './CURSOS/CURSOEJEMPLO/CURSOEJEMPLOP3/CURSOEJEMPLOP3';
import LOGIN from './LOGIN/LOGIN';
import FormularioSuscripcion from './PAGINABLACK/FormularioSuscripcion';
import PAGINABLACK from "./PAGINABLACK/SuscripcionBlack";
import PAGINAPRINCIPAL from './PAGINAPRINCIPAL/PAGINAPRINCIPAL';
import CURSO1P25 from './CURSOS/CURSO1/CURSOP2.5/CURSO1P25';
import CURSO4P1 from './CURSOS/CURSO4/CURSO4P1/CURSO4P1';
import CURSO4P2 from './CURSOS/CURSO4/CURSO4P2/CURSO4P2';
import CURSO4P3 from './CURSOS/CURSO4/CURSO4P3/CURSO4P3';
import CURSO5P1 from './CURSOS/CURSO5/CURSO5P1/CURSO5P1';
import CURSO5P2 from './CURSOS/CURSO5/CURSO5P2/CURSO5P2';
import CURSO5P3 from './CURSOS/CURSO5/CURSO5P3/CURSO5P3';
import CURSO6P1 from './CURSOS/CURSO6/CURSO6P1/CURSO6P1';
import CURSO6P2 from './CURSOS/CURSO6/CURSO6P2/CURSO6P2';
import CURSO6P3 from './CURSOS/CURSO6/CURSO6P3/CURSO6P3';
import CURSO5P25 from './CURSOS/CURSO5/CURSO5P25/CURSO5P25';
import CURSO4P25 from './CURSOS/CURSO4/CURSO4P25/CURSO4P25';
import CURSO2P25 from './CURSOS/CURSO2/CURSO2P25/CURSO2P25';




function App() {
  const loginButtonRef = useRef(null);

  return (
    <>
      <Routes>
        {/* Aquí usas una función para renderizar el componente LOGIN y pasar loginButtonRef */}
        <Route path='/' element={<LOGIN loginButtonRef={loginButtonRef} />} />
        <Route path='/pagina-principal' element={<PAGINAPRINCIPAL />} />
        <Route path="/curso3" element={<CURSOEJEMPLO courseName="Curso Ejemplo" />} />
        <Route path="/curso3-2" element={<CURSOEJEMPLOP2/>}/>
        <Route path="/curso3-3" element={<CURSOEJEMPLOP3></CURSOEJEMPLOP3>}></Route>

        <Route path="/curso1-1" element={<CURSO1P1 courseName="Curso Manejo de Mail"/>}/>
        <Route path="/curso1-2" element={<CURSO1P2/>}/>
        <Route path="/curso1-3" element={<CURSO1P3></CURSO1P3>}></Route>
        <Route path="/curso1-25" element={<CURSO1P25/>}/>


        <Route path="/curso2-1" element={<CURSO2P1 courseName="Curso Uso Basico del Celular"/>}/>
        <Route path="/curso2-2" element={<CURSO2P2/>}/>
        <Route path="/curso2-3" element={<CURSO2P3></CURSO2P3>}></Route>
        <Route path="/curso2-25" element={<CURSO2P25/>}/>

        <Route path="/curso4-1" element={<CURSO4P1 courseName="Curso Tramites Digitales"/>}/>
        <Route path="/curso4-2" element={<CURSO4P2/>}/>
        <Route path="/curso4-25" element={<CURSO4P25/>}/>
        <Route path="/curso4-3" element={<CURSO4P3></CURSO4P3>}></Route>
        
        <Route path="/curso5-1" element={<CURSO5P1 courseName="Curso Seguridad en Linea"/>}/>
        <Route path="/curso5-2" element={<CURSO5P2/>}/>
        <Route path="/curso5-25" element={<CURSO5P25/>}/>
        <Route path="/curso5-3" element={<CURSO5P3></CURSO5P3>}></Route>
        
        <Route path="/curso6-1" element={<CURSO6P1 courseName="Curso Billeteras virtuales y compras en Linea"/>}/>
        <Route path="/curso6-2" element={<CURSO6P2/>}/>
        <Route path="/curso6-3" element={<CURSO6P3></CURSO6P3>}></Route>
        

        
        
        <Route path="/paginablack" element={<PAGINABLACK/>}  />
        <Route path="/formulariosuscripcion" element={<FormularioSuscripcion></FormularioSuscripcion>}></Route>
      </Routes>
    </>
  );
}

export default App;
