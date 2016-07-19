var PlayList = (props) => (
  <table>
    <tr>
      <th>Library</th>
    </tr>
    <PlayListEntry songs={props.songs} onChooseSongClick={props.onChooseSongClick}/>
    <Artwork selectedSong={props.selectedSong}/>
  </table>
);

window.PlayList = PlayList;