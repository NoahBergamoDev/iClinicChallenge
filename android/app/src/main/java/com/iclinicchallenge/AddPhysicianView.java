package com.iclinicchallenge;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

public class AddPhysicianView  extends LinearLayout {
    private Context context;
    public AddPhysicianView(@NonNull Context context) {
        super(context);
        this.context = context;
        inflate(context, R.layout.addphysician, this);
    }
}
