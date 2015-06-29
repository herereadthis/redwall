import React from 'react';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    makeRows = () => {
        return this.props.watches.map((value, key) => {
            return (
                <tr key={key}>
                    <td><p>{value.companyName}</p></td>
                    <td><p>{value.companyType}</p></td>
                    <td><p>{value.founded}</p></td>
                    <td><p>{value.nationality}</p></td>
                </tr>
            )
        });
    };

    render() {
        window.console.log(this.props.watches);
        if (this.props.watches === undefined) {
            return (
                <p>No data</p>
            );
        }
        return (
            <div className="bellmaker_container">
                <table>
                    <thead>
                        <tr>
                            <th><p>Name</p></th>
                            <th><p>Type</p></th>
                            <th><p>Founded</p></th>
                            <th><p>Country</p></th>
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

