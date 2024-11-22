import './css/reset.css';
import './css/style.css';
import MenuList from './components/Menulist';
import HelpModal from './components/HelpModal';
import ShareButton from './components/share';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Weekday from './components/Weekday';


interface Menu {
  id: number;
  menu: string;
  recipeurl: string;
}

const App: React.FC = () => {
  return (
    
    <div className='relative'> 
        <img src="/public/omuraisu.jpg" className='image absolute left-5 top-0 h-16 w-16'/>
        <img src="/public/curryrice.jpg" className='image absolute top-0 right-5 h-16 w-16'/>
      <header className='mx-12'>
        <h1 className='headertitle'>What's for Dinner?</h1>
        <div className='flex pl-8'>
          <Weekday/>
          {/* <DndProvider backend={HTML5Backend}> */}
            <MenuList/>
          {/* </DndProvider> */}
        </div>
        <div className='flex gap-4 mt-4'> 
          <HelpModal/>
          <ShareButton/>
        </div>
      </header>
    </div>
    
  );
};

export default App;
