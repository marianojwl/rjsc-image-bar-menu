import React from "react";
import { useRef, useState, useEffect } from "react";
import ImgDefault from "./ImgDefault";
import "./ImageBarMenu.css";

function ImageBarMenu({singleSelect=true, elements,elementClickHandler,target,searchQuery,setSearchQuery,itemHeight=null,maxWidth=null}) {
  const tabBarContainerRef = useRef(null);
  const onWheelHandler = (e) => {
    if (tabBarContainerRef.current) {
        let initialScroll = tabBarContainerRef.current.scrollLeft;
        tabBarContainerRef.current.scrollLeft += e.deltaY;
        tabBarContainerRef.current.scrollLeft += e.deltaX;
        if(initialScroll !== tabBarContainerRef.current.scrollLeft) {
          e.preventDefault();
        }
    }
  };
  useEffect(() => {
    const tabBarContainer = tabBarContainerRef.current;
    if (tabBarContainer) {
        tabBarContainer.addEventListener('wheel', onWheelHandler);
    }
    return () => {
        if (tabBarContainer) {
            tabBarContainer.removeEventListener('wheel', onWheelHandler);
        }
    };
  }, []);

    const [selected, setSelected] = useState(null);
    const clickHandler = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("data");
        if(singleSelect) {
          if(selected == id) {
            elementClickHandler({ preventDefault:(x)=>{ e.preventDefault(); }, target: { getAttribute:()=>{ return null; } }  });
            setSelected(null);
          }
          else {
            setSelected(id);
            elementClickHandler({ preventDefault:(x)=>{ e.preventDefault(); }, target: { getAttribute:()=>{ return id; } }  });
          }
        } else {
          elementClickHandler({ preventDefault:(x)=>{ e.preventDefault(); }, target: { getAttribute:()=>{ return id; } }  });
        }
        
    };
    useEffect(() => {
        setSelected(null);
        //elementClickHandler({ preventDefault:(x)=>{ try{ e.preventDefault(); } catch (error) {} }, target: { getAttribute:()=>{ return null; } }  });
    },[elements,searchQuery]);
    if( elements.length === 0 ) return (
      <div className="">No hay elementos para mostrar</div> 
    );
    return (
        <div ref={tabBarContainerRef} className="ImageBarMenu">
          <div className="ImageBarMenuContainer">
              <div className="ImageBarMenuMenu">
                  {elements.map((element, index) => (
                      <div style={itemHeight?{ "height":itemHeight }:null} className={selected == null?'ImageBarMenuItem':(element.id == selected?'ImageBarMenuItem selected':'ImageBarMenuItem unselected')} key={index}>
                          <a target={target??"_self"} className="ImageBarMenuAnchor" onClick={clickHandler} href={element.href??"#"} rel="noopener noreferrer" data={element.id}>
                              {element.img_src !== null && <img style={maxWidth?{ "maxWidth":maxWidth }:null} data={element.id} src={element.img_src??null} alt={element.img_alt} title={element.img_title} /> }
                              {element.img_src === null && <ImgDefault data={element.id} title={element.img_title} /> }
                          </a>
                      </div>
                  ))}
              </div>
          </div>
        </div>  
        
    );
}
export default ImageBarMenu;