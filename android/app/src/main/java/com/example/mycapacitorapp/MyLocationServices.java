package com.example.mycapacitorapp;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;

public class MyLocationServices {
    public void startLocationUpdates(){
        Log.d("MyApplication", "Start location service called");
        try {
            int locationPermission = 0;
//                    ActivityCompat.checkSelfPermission(
//                    this, Manifest.permission.ACCESS_FINE_LOCATION);
            if (locationPermission == PackageManager.PERMISSION_GRANTED) {
                if(isGPSEnabled()){
                    Log.d("MyApplication", "Location permission granted and gps is also on");
                }else{
                    Log.d("MyApplication", "Location permission granted and gps is off");
                    turnOnGPS();
                }
            } else {
                Log.d("MyApplication", "Location permission not granted");
                requestLocationPermission();
            }
        } catch (SecurityException e) {
            Log.d("MyApplication", "Start service exception");
            e.printStackTrace();
        }
    }

    private void requestLocationPermission(){
        Log.d("MyApplication", "Request permission called");
    }

    private boolean isGPSEnabled() {
        LocationManager locationManager = null;
        boolean isEnabled = false;
        if (locationManager == null) {
//            locationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        }
        isEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        return isEnabled;
    }

    private void turnOnGPS() {
        Log.d("MyApplication", "Turn on gps called");
    }
}
