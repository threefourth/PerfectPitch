'use strict';

var Artwork = function Artwork(props) {
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      null,
      React.createElement('img', { src: props.selectedSong.artwork, style: { width: '100%' } })
    )
  );
};

window.Artwork = Artwork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvQXJ0d29yay5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFVBQVUsU0FBVixPQUFVLENBQUMsS0FBRDtBQUFBLFNBQ1o7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsbUNBQUssS0FBSyxNQUFNLFlBQU4sQ0FBbUIsT0FBN0IsRUFBc0MsT0FBTyxFQUFFLE9BQU8sTUFBVCxFQUE3QztBQURGO0FBREYsR0FEWTtBQUFBLENBQWQ7O0FBUUEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6IkFydHdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXJ0d29yayA9IChwcm9wcykgPT4gKFxuICA8dHI+XG4gICAgPHRkPlxuICAgICAgPGltZyBzcmM9e3Byb3BzLnNlbGVjdGVkU29uZy5hcnR3b3JrfSBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PjwvaW1nPlxuICAgIDwvdGQ+XG4gIDwvdHI+XG4pO1xuXG53aW5kb3cuQXJ0d29yayA9IEFydHdvcms7Il19