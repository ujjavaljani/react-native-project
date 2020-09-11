package com.reactnativedemo;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import android.app.Activity;
import android.util.Log;

import androidx.core.content.FileProvider;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import okhttp3.MediaType;

public class ShareFile extends ReactContextBaseJavaModule {
  private static final String REACT_CLASS = "RNShareFile";
//   private static final String TYPE_PDF = MediaType.parse("application/pdf").toString();
  private static final String TYPE_PNG = MediaType.parse("image/png").toString();
//   private static final String PDF_CACHE_DIR = "png_documents_for_sharing";
  private static final String PNG_CACHE_DIR = "png_image_for_sharing";
  ReactApplicationContext reactContext;

  public ShareFile(ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
  }

  @ReactMethod
  public void share(String file, String filename, Promise promise) {
//    Log.v("received file=" + file);
//     shareFile(file);
    try {
      cleanSharedFiles();
      File imgFile = writeFile(file, filename);
      shareFile(imgFile);

      promise.resolve(true);
    } catch (IOException e) {
      promise.reject(e);
    }
  }

  private void cleanSharedFiles() {
    File directoryPath = getDirectoryPath();
    if (directoryPath.isDirectory()) {
      for (String file : directoryPath.list()) {
        new File(directoryPath, file).delete();
      }
    }
  }

  private File writeFile(String base64img, String filename) throws IOException {
    File directoryPath = getDirectoryPath();
    directoryPath.mkdir();
    File newFilePath = new File(directoryPath.getPath(), filename);
//
    byte[] imgAsBytes = Base64.decode(base64img, Base64.DEFAULT);

    try (FileOutputStream os = new FileOutputStream(newFilePath, false)) {
      os.write(imgAsBytes);
      os.flush();
    }

    return newFilePath;
  }

  private void shareFile(File file) {
    Uri outputFileUri = FileProvider.getUriForFile(reactContext, "com.reactnativedemo.fileprovider", file);
    Log.v("","URL======>"+outputFileUri);
    Intent intentShareFile = new Intent(Intent.ACTION_SEND);
    intentShareFile.setType(TYPE_PNG);
    intentShareFile.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
     intentShareFile.putExtra(Intent.EXTRA_STREAM, outputFileUri);
//    intentShareFile.setDataAndType(outputFileUri, TYPE_PNG);
//    intentShareFile.putExtra(Intent.EXTRA_STREAM, Uri.parse( file ));
    intentShareFile.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

//    Log.v("sending file=" + outputFileUri);
    // intentShareFile.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
    Activity currentActivity = getCurrentActivity();
    currentActivity.startActivity(Intent.createChooser(intentShareFile, ""));
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  private File getDirectoryPath() {
    return new File(reactContext.getCurrentActivity().getFilesDir(), PNG_CACHE_DIR);
  }
}
