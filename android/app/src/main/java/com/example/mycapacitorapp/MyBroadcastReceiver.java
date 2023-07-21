package com.example.mycapacitorapp;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        try{
            if(intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    Log.d("MyApplication", "Broadcast Receiver Started");

                    SharedPreferences sharedPreferences = context.getSharedPreferences("my_application", Context.MODE_PRIVATE);
                    boolean ForegroundServiceRunning = sharedPreferences.getBoolean("ForegroundServiceRunning", false);

                    if(ForegroundServiceRunning){
                        Log.d("MyApplication", "Foreground Service was active before boot");
                        Intent serviceIntent = new Intent(context, MyForegroundService.class);
                        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
                            context.startForegroundService(serviceIntent);
                        }else{
                            context.startService(serviceIntent);
                        }
                    }else{
                        Log.d("MyApplication", "Foreground Service was not active before boot");
                    }
                }
            }
        }catch(NullPointerException e){
            Log.d("MyApplication", "Broadcast receiver catch block");
            e.printStackTrace();
        }
    }


}