import React from "react";
import {TextField} from "@material-ui/core";
import * as PropTypes from "prop-types";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            googleMapsReady: false,
            name: '',
            street_address: '',
            locality: '',
            administrative_area_level_1: '',
            postal_code: '',
            country: '',
        };
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.autocomplete = null;
        this.componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
    }
    componentDidMount() {
        this.loadGoogleMaps(() => {
            // Work to do after the library loads.
            this.setState({googleMapsReady: true});
            this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {types: ['geocode']});
            this.autocomplete.setFields(['address_component']);
            this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
        });
    }

    componentWillUnmount() {
        // unload script when needed to avoid multiple google scripts loaded warning
        this.unloadGoogleMaps();
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    loadGoogleMaps = callback => {
        const existingScript = document.getElementById("googlePlacesScript");
        if (!existingScript) {
            const script = document.createElement("script");
            script.src =
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7_IEi2ei3p7Up6BD5n5Mkzev01DSRdrs&libraries=places";
            script.id = "googleMaps";
            document.body.appendChild(script);
            //action to do after a script is loaded in our case setState
            script.onload = () => {
                if (callback) callback();
            };
        }
        if (existingScript && callback) callback();
    };

    unloadGoogleMaps = () => {
        let googlePlacesScript = document.getElementById("googlePlacesScript");
        if (googlePlacesScript) {
            googlePlacesScript.remove();
        }
    };

    handlePlaceSelect() {
        let place = this.autocomplete.getPlace();
        let newPlaces = {};
        for (let i = 0; i < place.address_components.length; i++) {
            let addressType = place.address_components[i].types[0];
            if (this.componentForm[addressType]) {
                let val = place.address_components[i][this.componentForm[addressType]];
                newPlaces[addressType]=val;
            }
        }
        console.log(newPlaces);
        this.props.updateAddress(newPlaces);
    }

    render() {
        if (!this.state.googleMapsReady) {
            return <p>Loading</p>;
        }
        return (
                <GridItem xs={12} md={12} lg={12}>
                    <TextField
                        id="autocomplete"
                        className="input-field"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder={"Address"}
                    />
                </GridItem>
            );
        // do something you needed when script is loaded
    }
}
Search.propTypes= {
    updateAddress: PropTypes.func.isRequired,
};
export default Search;