import React from 'react';
import ReactDOM from 'react-dom';
function Example() {
    return (
        <div className="container">
             
            This is my Example Component 4
             
        </div>
    );
}
export default Example;
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
