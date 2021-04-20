import React from 'react'
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    // Will be executed after the component output has been rendered to the DOM
    componentDidMount() {
    }

    // Will be executed after the component has been removed from the DOM
    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>test component</h1>
            </div>
        );
    }
}
export default Main
