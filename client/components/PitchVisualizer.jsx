var PitchVisualizer = (props) => {

  getUserAudio();

  return (
    <div>
      <div class="note"><span id="note">--</span></div>
      <canvas id="pitchGraph" width="2560" height="256"></canvas>
      <canvas id="waveform" width="512" height="256"></canvas>
    </div>
  );
};

window.PitchVisualizer = PitchVisualizer;