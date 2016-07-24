var PlayList = (props) => {
console.log(props);
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


window.PlayList = PlayList;