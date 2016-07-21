var PlayListEntry = (props) => (
  <tr>
    <td onClick={props.onChooseSongClick}>
      {props.song.title}
    </td>
  </tr>
);

window.PlayListEntry = PlayListEntry;