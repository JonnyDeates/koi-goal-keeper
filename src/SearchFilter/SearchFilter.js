import React from 'react';
import {SettingsContext} from "../Settings/SettingsContext";
import {getColor} from "../Utils/Utils";

class SearchFilter extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            types: []
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.setState({types: ['All', ...this.context.types]})
    }

    handleSearch(e) {
        this.setState({search: e.target.value})

    }

    render() {
        return (
            <div className="addition-wrapper">
                <div className='dropdown-types'>
                    <li>{this.context.currentType}
                    <div className='bar-indicator-left' style={getColor(this.context.currentType)}/>
                        <div className='bar-indicator-right' style={getColor(this.context.currentType)}/>
                    </li>

                    <ul className='dropdown-list'>
                        {this.state.types.map((type, i) => <li key={i}
                                                               className={(this.context.currentType === type) ? 'tinted' : ''}
                                                               onClick={() => this.props.changeFilter(type)}>{type}  <div className='bar-indicator-left' style={getColor(type)}/>
                            <div className='bar-indicator-right'style={getColor(type)}/></li>)}
                    </ul>
                </div>
                <section className='add-input'>
                    <input value={this.state.search} onChange={this.handleSearch} onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.props.searchGoals(this.state.search);
                        }
                    }}/>
                    <div className='even-space'>
                        <button onClick={() => this.setState({search: ''})}
                                type='button'>Cancel
                        </button>
                        <button onClick={() => this.props.searchGoals(this.state.search)} type='button'>Search</button>
                    </div>
                </section>
            </div>)
    }
}

export default SearchFilter;