var PitchVisualizer = (props) => {

  getUserAudio();

  return (
    <div>
      <canvas id="pitchGraph" width="500" height="500"></canvas>
    </div>
    
  );
};

window.PitchVisualizer = PitchVisualizer;