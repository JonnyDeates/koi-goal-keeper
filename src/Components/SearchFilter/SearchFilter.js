import React from 'react';
import {getColor, getCurrentThemeColors} from "../../Utils/Utils";

class SearchFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            types: []
        };
    }

    componentDidMount() {
        this.setState({types: ['All', ...this.props.types]});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.types.length !== this.props.types.length) {
            this.setState({types: ['All', ...this.props.types]});
        }
    }

    render() {
        return (
            <div className="addition-wrapper">
                <div className='dropdown-types'>
                    <li style={{
                        backgroundColor: getCurrentThemeColors().tColor,
                        color: getCurrentThemeColors().fontColor
                    }}>{this.props.currentType}
                        <div className='bar-indicator-left' style={getColor(this.props.currentType)}/>
                        <div className='bar-indicator-right' style={getColor(this.props.currentType)}/>
                    </li>

                    <ul className='dropdown-list'>
                        {this.state.types.map((type, i) => <li key={i}
                                                               className={(this.props.currentType === type) ? 'tinted' : ''}
                                                               style={(i >= 4) ? {
                                                                   padding: 16 * (1 / (i - 4)) + 'px 0px',
                                                                   color: getCurrentThemeColors().fontColor,
                                                                   backgroundColor: getCurrentThemeColors().tColor
                                                               } : {
                                                                   color: getCurrentThemeColors().fontColor,
                                                                   backgroundColor: getCurrentThemeColors().tColor,
                                                               }}
                                                               onClick={() => this.props.changeFilter(type)}>{type}
                            <div className='bar-indicator-left' style={getColor(type)}/>
                            <div className='bar-indicator-right' style={getColor(type)}/>
                        </li>)}
                    </ul>
                </div>
                <section className='add-input'>
                    <input value={this.props.search} onChange={this.props.searchGoals}/>
                    <div className='even-space'>
                        <button onClick={this.props.clearSearch} title={'Remove Search Input'}
                                style={{backgroundColor: getCurrentThemeColors().tColor, color: getCurrentThemeColors().fontColor}}
                                type='button'>Clear
                        </button>
                        <button style={{backgroundColor: getCurrentThemeColors().tColor, color: getCurrentThemeColors().fontColor}}
                                title={'Search'} type='button'>Search
                        </button>
                    </div>
                </section>
            </div>)
    }
}

export default SearchFilter;
