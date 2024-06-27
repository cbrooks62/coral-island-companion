import "./Npc.css"
import { useEffect, useState } from "react";
import { getAllNpcs } from "../../Services/npcServices.jsx";
import { NpcNameFilter } from "./NpcNameFilter.jsx";

export const NpcList = () => {
  const [allNpcs, setAllNpcs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNpcs, setFilteredNpcs] = useState([]);


  useEffect(() => {
    getAllNpcs().then((npcArray) => {
      setAllNpcs(npcArray)
    })
  }, [])

  //filter for searching NPCs on DOM
  useEffect(() => {
    const foundNpcs = allNpcs.filter((npc) =>
      npc.character.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredNpcs(foundNpcs);
  }, [searchTerm, allNpcs]);

  return (
    <div className="npc-container">
      <header className="characters-header"><img src="src/Images/Headers/Characters-header.png"/></header>
      <div>
        <NpcNameFilter setSearchTerm={setSearchTerm}/>
      </div>
      <div>
      <div className="npc-characters-list">
            {filteredNpcs.map((npc) => {
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
