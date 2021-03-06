import React from 'react';
import axios from 'axios';
import weatherIcon from '../helperFunctions/weatherIcon.js';
class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: () => '',
      forecast: {},
      city: 'SanFrancisco'
    };

    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    const self=this;
    // set weather at component mount
    self.getWeather();
    //update weather every two minutes
    self.setState({ interval: setInterval(() => {
      self.getWeather()
    }, 60000 * 2)
  });
}

componentWillUnmount() {
  clearInterval(this.state.interval);
  console.log('clearing');
}

getWeather () {
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=imperial&APPID=89fdd5afd3758c1feb06e06a64c55260`)
  .then(resp => {
    this.setState({
      description: resp.data.weather[0].description,
      min: resp.data.main.temp_min,
      max: resp.data.main.temp_max,
      current: (resp.data.main.temp).toFixed(0),
      icon: resp.data.weather[0].icon
    });
    // console.log(this.state.icon);
  });
}

render() {
  const icon = weatherIcon(this.state.icon);
  // console.log('ICON', icon);
  return (
    <div className={this.props.weatherState ? 'isActiveWeather' : 'isStandbyWeather'}>
      <img src={icon} height="75" width="75"></img>
      <div className={this.props.weatherState ? 'isActiveC' : 'null'}>
        <div className={this.props.weatherState ? 'isActiveCurrent' : 'current'}>
          currently {this.state.current}˚F
        </div>
        <div className={this.props.weatherState ? 'isActiveDescription' : 'description'}>
          {this.state.description}
        </div>
        <div className={this.props.weatherState ? 'isActiveMinMax' : 'min-max'}>
          {this.state.min}˚F  |  {this.state.max}˚F
        </div>
      </div>
    </div>
  );
}
}
export default Weather;
