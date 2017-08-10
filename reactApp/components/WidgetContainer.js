import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import Time from './Time';
import Weather from './Weather';
import Radio from './Radio';
import News from './News';
import Uber from './Uber';
import Todo from './Todo';
import Response from './responseDiv';

class WidgetContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        hasResponse: true,
        currentResponse: '',
        socket: props.socket,
        widgets: props.widget
    };
  }

  componentDidMount() {

    // START SOCKET LISTENERS
    const self = this;
    this.state.socket.on('connect', function(){
      console.log("connected container");
      self.state.socket.emit('join', 'W_CONTAINER');

    });

    this.state.socket.on('stt_continuing', respObj => {
      console.log('received stt continuing', respObj);

      this.setState({currentResponse: respObj.response});
    });

    this.state.socket.on('stt_finished', respObj => {
      console.log('received stt finished', respObj);
      const self = this;

      this.setState({currentResponse: respObj.response});
      setTimeout(() => {
        console.log('in timeout of stt finished');
        self.setState({currentResponse: ''})
      }, 6000)
    });
    // END SOCKET LISTENERS
  }

<<<<<<< HEAD
  determineThreeWidgets() {
=======
		getWidget(widget) {
			
			switch (widget){
				case 'radio':
					return <Radio />;
				case 'news':
					return <News />;
				case 'uber':
					return <Uber />;
				case 'todo':
					return <Todo />
				default:
					return <div></div>;
			}
			
		}

>>>>>>> 6d7ee38451ba4511098f282a9fe7887c91a1ac67

  }

  render () {
	  console.log("ACTIVE", this.props.isActive, this.props.widget);
    return(
      <div className="outerDiv" id="q">

          <div className={this.props.isActive ? 'isActiveDiv' : 'isStandbyDiv'}>
             <ReactCSSTransitionGroup transitionName = "example"
               transitionAppear = {true} transitionAppearTimeout = {2000}
               transitionEnter = {false} transitionLeave = {false}>
               <Time timeState={this.props.isActive}/>
               <Weather weatherState={this.props.isActive}/>
             </ReactCSSTransitionGroup>
          </div>
          <div className={this.props.isActive ? 'responseDiv' : 'widgetsStandby'}>
              { this.state.hasResponse && <div className="rDiv"><Response /></div> }
          </div>
          <div className={this.props.isActive ? 'widgetsActive' : 'widgetsStandby'}>
              <ReactCSSTransitionGroup transitionName = "example"
                transitionAppear = {true} transitionAppearTimeout = {2000}
                transitionEnter = {false} transitionLeave = {false}>

<<<<<<< HEAD
                {
                  this.props.widget.map((widget) => {
                    return widget === "radio" ? <Radio socket={this.state.socket} /> : <div></div>
                    return widget === "news" ? <News socket={this.state.socket}  /> : <div></div>
                    return widget === "uber" ? <Uber socket={this.state.socket}  /> : <div></div>
                    return widget === "todo" ? <Todo socket={this.state.socket}  /> : <div></div>
                  })
                }
=======
                {this.props.widget.map((widget) => {
					const widgetTarget = this.getWidget(widget);
					return widgetTarget;
				}					
				)}
>>>>>>> 6d7ee38451ba4511098f282a9fe7887c91a1ac67
              </ReactCSSTransitionGroup>
          </div>
	 </div>
    );
  }
}

export default WidgetContainer;
