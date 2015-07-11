import React from 'react';

import WatchActions from './WatchActions.js';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cacheValidity !== this.props.cacheValidity) {
            this.props.flux.getActions(WatchActions.ID).fetchWatchData(nextProps.cacheValidity);
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.watchData !== this.props.watchData;
    }

    makeRowCells = (row, metadata) => {
        return metadata.map((value, key) => {
            return (
                <td key={key}><p>{row[value.columnName]}</p></td>
            );
        });
    };

    makeRows = (metadata) => {
        return this.props.watchData.map((value, key) => {
            return (
                <tr key={key}>
                    {this.makeRowCells(value, metadata)}
                </tr>
            );
        });
    };

    makeTableHeaderRows = (metadata) => {
        return metadata.map((value, key) => {
            return (
                <th key={key}>{value.columnTitle}</th>
            );
        });
    };

    makeTableHeader = (metadata) => {
        return (
            <thead>
                <tr>
                    {this.makeTableHeaderRows(metadata)}
                </tr>
            </thead>
        );
    };

    render() {
        if (this.props.watchData === undefined) {
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

        return (
            <div className="bellmaker_container">
                <table>
                    {this.makeTableHeader(metadata)}
                    <tbody>
                        {this.makeRows(metadata)}
                    </tbody>
                </table>
            </div>
        );
    }
}

