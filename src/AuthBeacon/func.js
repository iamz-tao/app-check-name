import React, { Component } from 'react';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const checkLocationStatus = () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function (success) {
        
        // console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    }).catch((error) => {
        // return false;
        // console.log(error.message); // error.message => "disabled"
    });
}

module.exports = {
    checkLocationStatus
}