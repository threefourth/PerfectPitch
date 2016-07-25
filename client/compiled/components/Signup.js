'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this, props));

    _this.state = {
      username: '',
      password: ''
    };
    return _this;
  }

  _createClass(Signup, [{
    key: 'handleUsernameChange',
    value: function handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'handleSignup',
    value: function handleSignup(e) {
      e.preventDefault();

      var username = this.state.username;
      var password = this.state.password;

      if (username && password) {
        this.setState({
          username: '',
          password: ''
        });

        $.ajax({
          url: '/signupNewUser',
          type: 'POST',
          data: JSON.stringify({ username: username, password: password }),
          contentType: 'application/json',
          success: function (data) {
            this.props.updateStateAfterLogin(data);
            browserHistory.push('/');
            console.log('successfully signed up!');
          }.bind(this),
          error: function error(data) {
            alert('User already exists! Please sign in');
            browserHistory.push('/login');
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'h3',
          null,
          'Welcome to Perfect Pitch!'
        ),
        React.createElement(
          'h5',
          null,
          'by signing up you can track your progress at the My Progress tab above'
        ),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s6 offset-s3' },
            React.createElement(
              'form',
              { className: 'section', onSubmit: this.handleSignup.bind(this) },
              React.createElement('input', {
                type: 'text', placeholder: 'username',
                value: this.state.username,
                onChange: this.handleUsernameChange.bind(this)
              }),
              React.createElement('input', {
                type: 'password', placeholder: 'password',
                value: this.state.password,
                onChange: this.handlePasswordChange.bind(this)
              }),
              React.createElement(
                'button',
                { className: 'btn waves-effect waves-light grey darken-3', type: 'submit', name: 'action' },
                'sign up'
              )
            )
          )
        )
      );
    }
  }]);

  return Signup;
}(React.Component);

window.Signup = Signup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvU2lnbnVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sTTs7O0FBQ0osa0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBGQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhO0FBQ1gsZ0JBQVUsRUFEQztBQUVYLGdCQUFVO0FBRkMsS0FBYjtBQUZpQjtBQU1sQjs7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7Ozt5Q0FFb0IsQyxFQUFHO0FBQ3RCLFdBQUssUUFBTCxDQUFjLEVBQUMsVUFBVSxFQUFFLE1BQUYsQ0FBUyxLQUFwQixFQUFkO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7O0FBRUEsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCO0FBQ0EsVUFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLFFBQTFCOztBQUVBLFVBQUksWUFBWSxRQUFoQixFQUEwQjtBQUN4QixhQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFVLEVBREU7QUFFWixvQkFBVTtBQUZFLFNBQWQ7O0FBS0EsVUFBRSxJQUFGLENBQU87QUFDTCxlQUFLLGdCQURBO0FBRUwsZ0JBQU0sTUFGRDtBQUdMLGdCQUFNLEtBQUssU0FBTCxDQUFlLEVBQUMsVUFBVSxRQUFYLEVBQXFCLFVBQVUsUUFBL0IsRUFBZixDQUhEO0FBSUwsdUJBQWEsa0JBSlI7QUFLTCxtQkFBUyxVQUFTLElBQVQsRUFBZTtBQUN0QixpQkFBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsSUFBakM7QUFDQSwyQkFBZSxJQUFmLENBQW9CLEdBQXBCO0FBQ0Esb0JBQVEsR0FBUixDQUFZLHlCQUFaO0FBQ0QsV0FKUSxDQUlQLElBSk8sQ0FJRixJQUpFLENBTEo7QUFVTCxpQkFBTyxlQUFTLElBQVQsRUFBZTtBQUNwQixrQkFBTSxxQ0FBTjtBQUNBLDJCQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDRDtBQWJJLFNBQVA7QUFlRDtBQUNGOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FGRjtBQUdFLHVDQUhGO0FBSUUsdUNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBSyxXQUFVLEtBQWY7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLFdBQVUsU0FBaEIsRUFBMEIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEM7QUFDRTtBQUNFLHNCQUFLLE1BRFAsRUFDYyxhQUFZLFVBRDFCO0FBRUUsdUJBQU8sS0FBSyxLQUFMLENBQVcsUUFGcEI7QUFHRSwwQkFBVSxLQUFLLG9CQUFMLENBQTBCLElBQTFCLENBQStCLElBQS9CO0FBSFosZ0JBREY7QUFNRTtBQUNFLHNCQUFLLFVBRFAsRUFDa0IsYUFBWSxVQUQ5QjtBQUVFLHVCQUFPLEtBQUssS0FBTCxDQUFXLFFBRnBCO0FBR0UsMEJBQVUsS0FBSyxvQkFBTCxDQUEwQixJQUExQixDQUErQixJQUEvQjtBQUhaLGdCQU5GO0FBV0U7QUFBQTtBQUFBLGtCQUFRLFdBQVUsNENBQWxCLEVBQStELE1BQUssUUFBcEUsRUFBNkUsTUFBSyxRQUFsRjtBQUFBO0FBQUE7QUFYRjtBQURGO0FBREY7QUFMRixPQURGO0FBeUJEOzs7O0VBekVrQixNQUFNLFM7O0FBNEUzQixPQUFPLE1BQVAsR0FBZ0IsTUFBaEIiLCJmaWxlIjoiU2lnbnVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2lnbnVwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlVXNlcm5hbWVDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJuYW1lOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9XG5cbiAgaGFuZGxlUGFzc3dvcmRDaGFuZ2UoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkOiBlLnRhcmdldC52YWx1ZX0pO1xuICB9XG5cbiAgaGFuZGxlU2lnbnVwKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgdXNlcm5hbWUgPSB0aGlzLnN0YXRlLnVzZXJuYW1lO1xuICAgIHZhciBwYXNzd29yZCA9IHRoaXMuc3RhdGUucGFzc3dvcmQ7XG5cbiAgICBpZiAodXNlcm5hbWUgJiYgcGFzc3dvcmQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1c2VybmFtZTogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnJ1xuICAgICAgfSk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9zaWdudXBOZXdVc2VyJywgXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkfSksXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlQWZ0ZXJMb2dpbihkYXRhKTtcbiAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3NmdWxseSBzaWduZWQgdXAhJyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBhbGVydCgnVXNlciBhbHJlYWR5IGV4aXN0cyEgUGxlYXNlIHNpZ24gaW4nKTtcbiAgICAgICAgICBicm93c2VySGlzdG9yeS5wdXNoKCcvbG9naW4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMz5XZWxjb21lIHRvIFBlcmZlY3QgUGl0Y2ghPC9oMz5cbiAgICAgICAgPGg1PmJ5IHNpZ25pbmcgdXAgeW91IGNhbiB0cmFjayB5b3VyIHByb2dyZXNzIGF0IHRoZSBNeSBQcm9ncmVzcyB0YWIgYWJvdmU8L2g1PlxuICAgICAgICA8YnI+PC9icj5cbiAgICAgICAgPGJyPjwvYnI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgczYgb2Zmc2V0LXMzXCI+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWN0aW9uXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU2lnbnVwLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnVzZXJuYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVVzZXJuYW1lQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVBhc3N3b3JkQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBncmV5IGRhcmtlbi0zXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJhY3Rpb25cIj5zaWduIHVwPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuU2lnbnVwID0gU2lnbnVwO1xuIl19