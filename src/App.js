import React, {Component} from 'react';
import DemoScene from './Three.component';

class App extends Component {
    state = {isMounted: true};
    render() {
        const {isMounted = true} = this.state;
        return (
            <>
                {isMounted && <DemoScene />}
            </>
        );
    }
}

export default App;