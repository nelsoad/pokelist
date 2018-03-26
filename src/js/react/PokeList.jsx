import React from 'react';
import axios from 'axios';

class PokeList extends React.Component {

    constructor() {
        super();

        this.state = {
            list: [],
            filter: "",
            loading: true
        };
    }

    updateFilter(event) {
        this.setState({filter: event.target.value});
    }

    lazyLoad() {
        var loadPositionOffset = 100;
        var images = document.querySelectorAll('img[data-src]');

        for(var i = 0; i < images.length; i++)
        {
            var rect = images[i].getBoundingClientRect();

            if(rect.y >= -loadPositionOffset && rect.y <= window.innerHeight + loadPositionOffset)
            {
                images[i].src = images[i].dataset.src;
                delete images[i].dataset.src;
            }
        }
    }

    componentDidMount() {

        window.addEventListener('scroll', this.lazyLoad);

        axios.get('/all')
            .then(response => {
                var sortedList = response.data.results.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                this.setState({list: sortedList, loading: false});
            });
    }

    componentDidUpdate(prevProps, prevState) {
        this.lazyLoad();
    }

    renderLoadingContent() {
        return (
            <li className="loading-container">
                <div className="loading-text">Loading Pokémon List</div>
                <img src="/img/loading.gif" alt="loading"/>
            </li>
        );
    }

    //return html for all of the pokemon in the list
    renderList() {
        var list = this.state.list;
        var filter = this.state.filter;

        if(filter.length > 0) {
            list = list.filter(e => e.name.includes(filter));
        }

        return list.map(e => {
            return (
                <li>
                    <div className="pokemon-entry">
                        <div className="pokemon-image">
                            <img data-src={e.imageUrl} alt={e.name}/>
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

        var listContent = null;

        if(this.state.loading) {
            listContent = this.renderLoadingContent();
        }
        else {
            listContent = this.renderList();
        }

        return (
            <div className="page-container">
                <input 
                    type="text" 
                    className="pokemon-filter" 
                    value={this.state.filter} 
                    onChange={this.updateFilter.bind(this)}
                    placeholder="Enter a name">
                </input>
                <ul className="pokemon-list">
                    {listContent}
                </ul>
            </div>
        );
    }
}

export default PokeList;