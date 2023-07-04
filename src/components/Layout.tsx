import React from 'react';
import logoImg from '../img/logo.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <header>
        <nav className='navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white navbar-border mb-3'>
          <h1 className='m-auto mb-2 mt-2 title'>Traz Ins - Gestión y Trazabilidad del Instrumental Quirúrgico</h1>
        </nav>
      </header>
      <div className='container'>
        <main role='main' className='pb-3'>
          {children}
        </main>
        <div className='d-flex align-items-center justify-content-center'>
          <img src={logoImg} className='mt-5' width='275' height='200' alt='Traz Ins Logo' />
        </div>
      </div>
      <footer className='border-top footer text-muted p-2'>
        <div className='container'>&copy; 2023 - TrazinsApp</div>
      </footer>
    </>
  );
};

export default Layout;
