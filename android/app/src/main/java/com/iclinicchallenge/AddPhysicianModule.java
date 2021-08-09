package com.iclinicchallenge;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AddPhysicianModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private static String TAG = "AddPhysicianModule";

    AddPhysicianModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return TAG;
    }
}
