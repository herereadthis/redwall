import React from 'react';
import FluxComponent from 'flummox/component';

let fluxInstances = [];

export var AddMoreFlux = (ComposedComponent, Flux) => class extends React.Component {
/*
    constructor(props) {
        super(props);
        this.state = {
            flux: null
        };
    }

    componentWillMount() {
        if (!this.props.flux) {
            this.state.setState(flux, new Flux());
        }
        else {
            // Make sure to attach flux instance only once.
            if (fluxInstances.indexOf(Flux) !== -1) {
                return;
            }

            fluxInstances.push(Flux);
            new Flux(this.props.flux);
        }
    }
    render() {
        let addMoreProps = {};

        if (this.state.flux) {
            addMoreProps.flux = this.state.flux;
        }
        return (
            <FluxComponent {...addMoreProps} {...this.props} >
                <ComposedComponent {...this.props}/>
            </FluxComponent>
        );
    }
 */
    render() {
        return (
            <ComposedComponent />
        );
    }
};
