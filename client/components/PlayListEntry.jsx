var PlayListEntry = (props) => (
  <tr>
    <td className="song-entry" onClick={props.onChooseSongClick}>
      {props.song.title}
    </td>
  </tr>
);

window.PlayListEntry = PlayListEntry;