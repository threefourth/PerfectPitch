var Artwork = (props) => (
  <tr>
    <td>
      <img src={props.selectedSong.artwork}></img>
    </td>
  </tr>
);

window.Artwork = Artwork;