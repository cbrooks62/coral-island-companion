import "./Npc.css"
import { useEffect, useState } from "react";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import { Link } from "react-router-dom";

export const NpcList = () => {
  const [allNpcs, setAllNpcs] = useState([]);


  useEffect(() => {
    getAllNpcs().then((npcArray) => {
      setAllNpcs(npcArray)
    })
  }, [])


  return (
    <div>
      <header className="characters-header"></header>
      <div>
      <div className="npc-characters-list">
            {allNpcs.map((npc) => {
              return (
                <div key={npc.id} className="npc-single-card">
                  <div>
                    <h2 className="npc-name">{npc.character}</h2>
                 
                    <a href={npc.url}> <img className="character-image" src={npc.urlImg} alt={npc.character}/></a> 
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  )
};
