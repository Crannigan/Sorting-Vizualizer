import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

function SortTab(props)    {
    if(props.isActive)   {
        return (
            <button className="btn btn-secondary sort-list-item" onClick={props.onClick}>
                <div className="sort-list-item-text">{props.textValue}</div>
            </button>
        );
    }   else    {
        return (
            <button className="btn btn-dark sort-list-item" onClick={props.onClick}>
                <div className="sort-list-item-text">{props.textValue}</div>
            </button>
        );
    }
}

class HeaderBar extends React.Component {
    renderTab(i, active, textVal) {
        return (
            <SortTab 
                key={i}
                textValue={textVal}
                isActive={active}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const sortItems = [];
        var i;
        var limitLoop = this.props.sortMethods.length;
        for(i = 0; i < limitLoop; i++) {
            const active = (this.props.whichActive === i) ? true : false;
            const textVal = this.props.sortMethods[i];
            sortItems.push(this.renderTab(i, active, textVal));
        }

        return  (
            <div className="main-container">
                <div className="fixed-top">
                <header className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="social-network">
                                    <li><a className="waves-effect waves-dark" href="https://github.com/Crannigan"><i className="fa fa-github"></i></a></li>
                                    <li><a className="waves-effect waves-dark" href="#"><i className="fa fa-id-card"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <nav className="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
                    <div className="container">
                        <a className="navbar-brand" href="/"> Sorting Vizualizer</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">

                            <ul className="navbar-nav ml-auto">
                            {sortItems}
                            </ul>
                        </div>
                    </div>
                </nav>
                </div>
                <div className="sort-contain"></div>
            </div>
        );
    }
}

class SortContainer extends React.Component {
    render()    {
        return(
            <div className="app-container"></div>
        )
    }
}

class Sorting extends React.Component   {
    constructor(props)  {
        super(props);
        this.state = {
            methods: ['Selection Sort', 'Bubble Sort','Test Sort'],
            active: 0,
        };
    }

    handleClick(i)  {
        this.setState({
            active: i,
        });
    }

    render()    {
        return  (
            <div className="my-sorter-app">
                <HeaderBar 
                    sortMethods={this.state.methods}
                    whichActive={this.state.active}
                    onClick={(i) => this.handleClick(i)}
                />
                <SortContainer />
            </div>
        );
    }
}

ReactDOM.render(
    <Sorting />, 
    document.getElementById('root')
);

