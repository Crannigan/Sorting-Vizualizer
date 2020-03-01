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

function StartButton(props)     {
    return (
        <button type="button" className="btn btn-info start-button" onClick={props.onClick}>
            <div className="start-button-text">Start</div>
        </button>
    );
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
                                    <li><a className="waves-effect waves-dark" href="/"><i className="fa fa-id-card"></i></a></li>
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

function PrintBar(props)    {
    return  (
        <div className="single-bar" style={{height: (props.height * 500), width: (props.limitVal * 1.3)}}></div>
    );
}

class SortContainer extends React.Component {
    renderBar(i, barValue, isActive, nItems)  {
        return (
            <PrintBar 
                key={i}
                height={barValue}
                active={isActive}
                limitVal={nItems}
            />
        );
    }

    render()    {
        let i, limitVal = this.props.printArray.length;
        const printedBars = [];
        for(i = 0; i < limitVal; i++) {
            printedBars.push(this.renderBar(i, (this.props.printArray[i]/limitVal), false, limitVal));
        }

        return(
            <div className="app-container">
                <StartButton 
                    onClick={() => this.props.onClick()}
                />
                <div className="bar-list">
                    {printedBars}
                </div>
            </div>
        )
    }
}

class Sorting extends React.Component   {
    constructor(props)  {
        super(props);

        const currentArray = getRandomArray(30);

        this.state = {
            methods: ['Selection Sort', 'Bubble Sort','Test Sort'],
            active: 0,
            sortBars: currentArray,
        };
    }

    handleClick(i)  {
        this.setState({
            active: i,
        });
    }

    selectionSort = (sortItems) =>   {
        let i, k;
        let itemsLen = sortItems.length;
        let changeArray = sortItems;
        console.log(i + ' : ' + changeArray);
        for(i = 0; i < (itemsLen - 1); i++)   {
            let minIndex = i, min = changeArray[i];
            for(k = i + 1; k < itemsLen; k++)   {
                if(changeArray[k] < min)  {
                    min = changeArray[k];
                    minIndex = k;
                }
            }
            
            let temp = changeArray[i];
            changeArray[i] = changeArray[minIndex];
            changeArray[minIndex] = temp;

            this.setState({
                sortBars: changeArray,
            });

            //setTimeout((), 1000);

            console.log(i + ' : ' + this.state.sortBars);
        }
    }

    bubbleSort(sortItems)   {
        console.log("Bubble Sorting");
    }
    
    testSort(sortItems)   {
        console.log("Test Sorting");
    }

    startSorting(activeSort, sortArray)    {
        const sortFunctions = [this.selectionSort, this.bubbleSort, this.testSort];
        const thisSortFunction = sortFunctions[activeSort];
        thisSortFunction(sortArray);
    }

    render()    {
        return  (
            <div className="my-sorter-app">
                <HeaderBar 
                    sortMethods={this.state.methods}
                    whichActive={this.state.active}
                    onClick={(i) => this.handleClick(i)}
                />
                <SortContainer 
                    onClick={() => this.startSorting(this.state.active, this.state.sortBars)}
                    printArray={this.state.sortBars}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Sorting />, 
    document.getElementById('root')
);

function getRandomArray(limitVal)   {
    let tempSorted = Array.from(Array(limitVal).keys());
    const unsorted = [];
    let tempLen = tempSorted.length;

    while(tempLen !== 0)   {
        let randomVal = Math.floor(Math.random() * tempLen);
        unsorted.push(tempSorted[randomVal]);
        tempSorted = tempSorted.slice(0, randomVal).concat(tempSorted.slice(randomVal + 1, tempLen));
        tempLen = tempSorted.length;
    }

    return unsorted;
}