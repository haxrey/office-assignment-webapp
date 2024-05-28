import { Tilt_Neon } from "next/font/google";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import Link from 'next/link';


import React from "react";
export const SideNavbarData=[
    {
        title:"Main Page",
        icon:<HomeIcon/>,
        link:"/mainPage"
    }, {
        title:"Office Assigment",
        icon:<AssignmentIndIcon/>,
        link:"/OfficeAssigment"
    }, {
        title:"Add Data",
        icon:<PersonAddAltIcon/>,
        link:"/addData"
    }, 
    {
      title:"Integration",
      icon:<RoomPreferencesIcon/>,
      link:"/integration"
  },
    {
        title:"Logout",
        icon:<LogoutIcon/>,
        link:"/Logout"
    }
];
    
{SideNavbarData.map((item, index) => {
    return (
      <Link href={item.link} key={index}>
        <a className="flex items-center space-x-2">
          {item.icon}
          <span>{item.title}</span>
        </a>
      </Link>
    );
  })}