package royal.vision.group.smssenderapp;

import android.os.AsyncTask;
import android.telephony.SmsManager;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;
import java.util.Date;

public class FetchDataSenderFromSMS extends AsyncTask<Void,Void,Void> {



//    String  data = "";
//    String flag = "";

    @Override
    protected Void doInBackground(Void... voids) {

        String  data = "";
        String flag = "";
        String userid = "";
        String otpOfMsg = "";
        String message = "";
        String phoneNo = "";

        try {
            URL url = new URL("https://authenticate-us.herokuapp.com/qwerty_key");
            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
            InputStream inputStream = httpURLConnection.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

            String line ="";
            while (line != null){
                line = bufferedReader.readLine();
                data = data + line;
            }
//            JSONArray jsonArray = new JSONArray(data);
            JSONObject json = new JSONObject(data);
//            JSONObject jsonObject = (JSONObject) jsonArray.get(0);

            flag = json.get("flag").toString().trim();
            if (flag != "0"){
                //SMS Code
                userid = json.get("id").toString().trim();
                otpOfMsg = json.get("otp").toString().trim();
                message = json.get("msg").toString().trim();
                phoneNo = json.get("phoneNo").toString().trim();

                Calendar cal = Calendar.getInstance();
                String exp = "\n Code Expire on "+ String.valueOf(cal.get(Calendar.HOUR)) +" : "+ Integer.toString((Integer.parseInt(String.valueOf(cal.get(Calendar.MINUTE)))) + 2 );

                Date date=java.util.Calendar.getInstance().getTime();

                String smsMessage = "Hello " + userid +" \n For " + message + " \n Your OTP is "+ otpOfMsg +" "+exp+ " \n Your Phone Number "+ phoneNo + " \n ( "+ date + " )";

                SmsManager sendSMS = SmsManager.getDefault();

                sendSMS.sendTextMessage(phoneNo,"Doc.Card Provider",smsMessage,null,null);
            }


        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }


        return null;
    }
    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);

//        MainActivity.textView.setText(this.flag);

    }
}

