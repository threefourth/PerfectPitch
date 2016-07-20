var PlayListEntry = (props) => (
  <div>
   {props.songs.map(song =>
     <tr>
       <td onClick={props.onChooseSongClick}>
         {song.title}
       </td>
     </tr>
   )}
  </div>
);

window.PlayListEntry = PlayListEntry;