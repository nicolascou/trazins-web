import React from 'react';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <header>
        <nav className='navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white navbar-border mb-3'>
          <h1 className='m-auto mb-2 mt-2 title'>TRAZ INS - Gestión y Trazabilidad del Instrumental Quirúrgico</h1>
        </nav>
      </header>
      <div className='container'>
        <main role='main' className='pb-3'>
          {children}
        </main>
      </div>
      <footer className='border-top footer text-muted'>
        <div className='container'>&copy; 2023 - TrazinsApp</div>
      </footer>
    </>
  );
};

export default Layout;
