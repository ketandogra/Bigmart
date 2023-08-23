import React from "react";
import "../../styles/item.css"
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const Item = ({data}) => {

  const subheading = {
    true:{
      opacity:1,
      display:'block',
      display:'flex',
      alignItems:'center'
    },
    false:{
      opacity:0,
      display:'none',
    }
  }
  return(
    <>
    
    {data.map((item,index)=>
      <motion.div whileHover={{
      duration:'0.1'
    }} className="sidebar__item" key={index}>
      <NavLink to={item.path}  className='d-flex gap-2 mt-1'>
      <motion.div className="sidebar__Icon">
        <i className={item.icon}></i>
      </motion.div>
      
      <motion.span variants={subheading} className="sidebar__link__text">
      {item.display}
      </motion.span>
      </NavLink>
    </motion.div>
      )}
    </>
  )
    
    

 
};

export default Item;
