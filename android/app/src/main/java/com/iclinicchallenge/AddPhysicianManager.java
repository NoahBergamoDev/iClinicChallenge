package com.iclinicchallenge;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

public class AddPhysicianManager extends SimpleViewManager<AddPhysicianView> {
    public static final String REACT_CLASS = "ICAddPhysician";
    ReactApplicationContext mCallerContext;

    public AddPhysicianManager(ReactApplicationContext reactContext){
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected AddPhysicianView createViewInstance(ThemedReactContext reactContext) {
        return new AddPhysicianView(reactContext);
    }

}
