import React from 'react';

var PlayListEntry = (props) => (
  <tr>
    <td className="song-entry" onClick={props.onChooseSongClick}>
      {props.song.title}
    </td>
  </tr>
);

export default PlayListEntry;
// window.PlayListEntry = PlayListEntry;
