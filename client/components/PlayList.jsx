var PlayList = (props) => (
  //create a table 
  <table>
    <tr>
      <th>Library</th>
    </tr>
    <PlayListEntry songs={props.songs} onChooseSongClick={props.onChooseSongClick}/>
  </table>
);

window.PlayList = PlayList;