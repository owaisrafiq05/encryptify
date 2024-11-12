import  { useState } from 'react';

const NavBarComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  return (
    <div>NavBarComponent</div>
  )
}

export default NavBarComponent;
