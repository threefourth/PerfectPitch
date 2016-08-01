import React from 'react'; 
import PlayListEntry from './PlayListEntry.jsx';
import Artwork from './Artwork.jsx';

var PlayList = (props) => {
  return (
    <div style={{height:'720px', overflow: 'auto'}}>
    <table>
      <thead>
        <tr>
          <th>Library</th>
        </tr>
      </thead>
      <tbody>
        {props.songs.map((song, index) =>
          <PlayListEntry onChooseSongClick={props.onChooseSongClick} key={index} song={song} />
        )}
        <Artwork selectedSong={props.selectedSong}/>
      </tbody>
    </table>
    </div>
  );
}

export default PlayList;
// window.PlayList = PlayList;