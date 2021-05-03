import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    // The constructor function is not required
    // by React, BUT
    // 'constructor(props)' and 'super(props)' must be
    // called in this way in order to use State.
    constructor(props) {
        super(props);

        // THIS IS THE ONLY TIME we do direct assignment
        // to 'this.state'!
        this.state = { lat: null, errorMessage: '' }

        window.navigator.geolocation.getCurrentPosition(
            position => {
                // You must always call 'setState' anytime
                // you want the state to change/update!!
                this.setState({ lat: position.coords.latitude });
            },
            err => {
                this.setState({ errorMessage: err.message })
            }
        );
    }
    componentDidMount() {
        console.log('My component was rendered to the screen');
    }

    // React says that we have to define render!!
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
        }

        return <div>Loading...</div>;
    }
}


ReactDOM.render(<App />, document.querySelector('#root'));