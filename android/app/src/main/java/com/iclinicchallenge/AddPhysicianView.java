package com.iclinicchallenge;

import android.content.Context;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactContext;


public class AddPhysicianView extends FrameLayout {
    private ReactContext rcContext;
    public AddPhysicianView(ReactContext context){
        super(context);
        this.rcContext = context;
        this.init();
    }



    public void init(){
        inflate(rcContext, R.layout.addphysician, this);
    }

}
