var Artwork = (props) => (
  <tr>
    <td>
      <img src={props.selectedSong.artwork} style={{ width: '100%' }}></img>
    </td>
  </tr>
);

window.Artwork = Artwork;