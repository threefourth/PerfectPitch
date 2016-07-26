import React from 'React'; 
import PlayListEntry from './PlayListEntry.jsx';
import Artwork from './Artwork.jsx';

var PlayList = (props) => {
  return (
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
  );
}

export default PlayList;
// window.PlayList = PlayList;