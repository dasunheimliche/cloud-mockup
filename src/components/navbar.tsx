import Image from "next/image";
// import "../static/css/components/mobileSidebar.css";
// import MobileSidebar from './MobileSidebar'
import evaWhite from "/public/imgs/eva-white.png";

// import MenuIcon from '@mui/icons-material/Menu'
import NavbarTitle from "./navbar-title";

function Navbar() {
  return (
    <nav>
      <div className="navMainContent">
        <Image
          width={35}
          height={20}
          className="eva-logo-nav"
          alt="EVA ICON"
          src={evaWhite}
        />
        <NavbarTitle />

        {/* {openMobileSidebar ? (
          <MobileSidebar
            selectableOptions={selectableOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            openMobileSidebar={openMobileSidebar}
            setOpenMobileSidebar={setOpenMobileSidebar}
          />
        ) : null} */}
      </div>

      {/* <div className="navMenuButton" onClick={() => setOpenMobileSidebar(true)}>
        <MenuIcon />
      </div> */}
    </nav>
  );
}

export default Navbar;
