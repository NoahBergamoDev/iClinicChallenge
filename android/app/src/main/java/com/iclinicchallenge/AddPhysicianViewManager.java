package com.iclinicchallenge;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ReactStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.StateWrapper;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class AddPhysicianViewManager extends SimpleViewManager<AddPhysicianView> {

    public static final String REACT_NAME = "AddPhysicianViewManager";

    @NonNull
    @Override
    public String getName() {
        return REACT_NAME;
    }

    @NonNull
    @Override
    protected AddPhysicianView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new AddPhysicianView(reactContext);
    }
}
