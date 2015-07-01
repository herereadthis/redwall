import React from 'react';

import _ from 'lodash';

export default class Homepage extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }


    getParent = (id) => {
        //window.console.log(this.props.watches);
        var parentLicense, parentOwner, parentCompany, parent;

        parentLicense = _.find(this.props.watches, (watch) => {

            if (watch.licences !== undefined) {
                return watch.licences.indexOf(id) !== -1;
            }
        });
        if (parentLicense === undefined) {
            parentOwner = _.find(this.props.watches, (watch) => {

                if (watch.ownership !== undefined) {
                    return watch.ownership.indexOf(id) !== -1;
                }
            });
        }
        else {
            parentCompany = parentLicense;
        }
        if (parentOwner !== undefined) {
            parentCompany = parentOwner;
        }
        if (parentCompany === undefined) {
            parent = '';
        }
        else {
            parent = parentCompany.companyName;
        }
        return parent;
    };

    makeRows = () => {
        var _this = this;
        return this.props.watches.map((value, key) => {
            return (
                <tr key={key}>
                    <td><p>{value.companyName}</p></td>
                    <td><p>{value.companyType}</p></td>
                    <td><p>{value.founded}</p></td>
                    <td><p>{value.nationality}</p></td>
                    <td><p>{_this.getParent(value.id)}</p></td>
                </tr>
            );
        });
    };

    render() {
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

