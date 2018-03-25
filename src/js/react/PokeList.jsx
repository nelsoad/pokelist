import React from 'react';
import axios from 'axios';

class PokeList extends React.Component {

    constructor() {
        super();

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        var self = this;

        axios.get('/all')
            .then(response => {
                self.setState({list: response.data.results});
            });
    }

    renderList() {
        return this.state.list.map(e => {
            return (
                <li>
                    <div className="pokemon-entry">
                        <div className="pokemon-number">
                            {e.number}
                        </div>
                        <div className="pokemon-image">
                            <img src={e.imageUrl} alt={e.name}/>
                        </div>
                        <div className="pokemon-name">
                            {e.name}
                        </div>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="pokemon-list">
                {this.renderList()}
            </ul>
        );
    }
}

export default PokeList;