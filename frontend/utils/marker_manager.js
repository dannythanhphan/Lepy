class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = {};
    }

    updateMarkers(businesses, history) {
        this.businessObj = {};
        if (businesses.length > 1) {
            businesses.forEach((business) => {
                Object.assign(this.businessObj, {[business.id]: business})
            })

            this.markerKeys = Object.keys(this.markers);

            for (let i = 0; i < this.markerKeys.length; i++) {
                if (!Object.keys(this.businessObj).includes(this.markerKeys[i])) {
                    this.removeMarker(this.markers[this.markerKeys[i]])
                    delete this.markers[this.markerKeys[i]]
                }
            }
            let that = this;
            let infowindow = new google.maps.InfoWindow
            businesses.forEach((business) => {

                if (!Object.keys(that.markers).includes(`${business.id}`)) {
                    this.createMarkerFromBusiness(business);

                    that.markers[business.id].addListener('click', function() {
                        infowindow.setContent(`<div id="info-window-container">` +
                                                `<img src="${business.photoUrl}" id="info-window-photo"/>
                                                <span id="info-window-business-name"> ${business.name} </span> </div>`)
                        infowindow.open(that.map, that.markers[business.id]);
                        document.getElementById(`${business.name}`).scrollIntoView({block: "center"})
                    });
                }
            })
        } else {
            Object.assign(this.businessObj, {[businesses.id]: businesses});
            this.createMarkerFromBusiness(businesses)
        }

    }

    createMarkerFromBusiness(business) {
        Object.assign(this.markers, {[business.id]: new google.maps.Marker({
            position: {lat: business.lat, lng: business.lng},
            map: this.map,
            title: business.name
        })});
    }

    removeMarker(marker) {
        marker.setMap(null)
    }
}

export default MarkerManager