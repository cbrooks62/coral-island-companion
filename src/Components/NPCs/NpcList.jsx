import "./Npc.css"
import { useEffect, useState } from "react";
import { getAllNpcs } from "../../Services/npcServices.jsx";

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
      <div className="npc-characters-card">
            {allNpcs.map((npc) => {
              return (
                <div key={npc.id} className="npc-single-card">
                  <div>
                    <h2 className="npc-name">{npc.character}</h2>
                    <div>
                      <img src= {npc.urlImg}></img>
                    </div>
                    <a href={npc.url}>{npc.character} Wiki</a>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  )
};
