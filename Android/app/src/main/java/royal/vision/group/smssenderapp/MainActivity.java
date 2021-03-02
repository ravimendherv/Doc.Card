package royal.vision.group.smssenderapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.pm.FeatureGroupInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    public  static TextView textView;
    Switch aSwitch;
    Handler handler;
    Runnable run;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        textView = findViewById(R.id.t1);
        aSwitch = findViewById(R.id.onButton);
        textView.setTextColor(Color.parseColor("#FF00FF"));

        int premisionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS);

        if(premisionCheck == PackageManager.PERMISSION_GRANTED){

        }
        else{
            ActivityCompat.requestPermissions(this,new String[] {Manifest.permission.SEND_SMS}, PackageManager.PERMISSION_GRANTED);
        }


        aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {


            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (aSwitch.isChecked()){


                    textView.setText("START");
                    textView.setTextColor(Color.parseColor("#008000"));


                    handler = new Handler();
                    run = new Runnable() {
                        @Override
                        public void run() {
                            FetchDataSenderFromSMS proccess = new FetchDataSenderFromSMS();
                            proccess.execute();
                            Toast.makeText(MainActivity.this,"Checking Message ",Toast.LENGTH_SHORT).show();
                            handler.postDelayed(this,30000);
                        }
                    };
                    handler.post(run);








                }
                else {
                    handler.removeCallbacks(run);
                    textView.setText("OFF");
                    textView.setTextColor(Color.parseColor("#FF0000"));
                }
            }
        });
    }
}