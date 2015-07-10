import React from 'react';

import WatchActions from './WatchActions.js';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.flux.getActions(WatchActions.ID).foo('bar');
        this.props.flux.getActions(WatchActions.ID).fetchWatches(true);
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.watches !== this.props.watches;
    }

    makeRows = () => {
        return this.props.watches.map((value, key) => {
            return (
                <tr key={key}>
                    <td><p>{value.companyName}</p></td>
                    <td><p>{value.companyType}</p></td>
                    <td><p>{value.founded}</p></td>
                    <td><p>{value.nationality}</p></td>
                    <td><p>{value.parentCompany}</p></td>
                </tr>
            );
        });
    };

    render() {
        window.console.log(this.props);
        if (this.props.watches === undefined) {
            return (
                <p>No data</p>
            );
        }

        var metadata = [
            {
                columnName: 'companyName',
                columnTitle: 'Name'

            },
            {
                columnName: 'companyType',
                columnTitle: 'Company Type'

            },
            {
                columnName: 'founded',
                columnTitle: 'Founded'

            },
            {
                columnName: 'nationality',
                columnTitle: 'Country'

            },
            {
                columnName: 'parentCompany',
                columnTitle: 'Parent Company'

            }
        ];
        window.console.log(metadata);

        return (
            <div className="bellmaker_container">
                <table>
                    <thead>
                        <tr>
                            <th><p>Name</p></th>
                            <th><p>Type</p></th>
                            <th><p>Founded</p></th>
                            <th><p>Country</p></th>
                            <th><p>Parent</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.makeRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

