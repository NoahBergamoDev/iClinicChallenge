package com.iclinicchallenge;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class AddPhysicianModule  extends ReactContextBaseJavaModule {
    protected static String MODULE_NAME = "AddPhysicianModule";

    public AddPhysicianModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }
}
