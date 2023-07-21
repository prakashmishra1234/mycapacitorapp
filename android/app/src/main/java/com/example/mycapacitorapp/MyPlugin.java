package com.example.mycapacitorapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MyPlugin")
public class MyPlugin extends Plugin {

    @PluginMethod()
    public void StartService(PluginCall call) {
        Log.d("MyApplication", "Foreground service start method called ");
        Context context = getContext().getApplicationContext();
        Intent serviceIntent = new Intent(context, MyForegroundService.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(serviceIntent);
            } else {
                context.startService(serviceIntent);
            }
        SharedPreferences sharedPreferences = context.getSharedPreferences("my_application", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean("ForegroundServiceRunning", true);
        editor.apply();
            JSObject res = new JSObject();
            res.put("MyApplication", "Foreground service started");
            call.resolve(res);
    }

    @PluginMethod()
    public void StopService(PluginCall call) {
        Log.d("MyApplication", "Foreground service stop method called");
        Context context = getContext().getApplicationContext();
        Intent serviceIntent = new Intent(context, MyForegroundService.class);
        context.stopService(serviceIntent);

        SharedPreferences sharedPreferences = context.getSharedPreferences("my_application", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean("ForegroundServiceRunning", false);
        editor.apply();

        JSObject res = new JSObject();
        res.put("MyApplication", "Foreground service stopped");
        call.resolve(res);
    }
}
