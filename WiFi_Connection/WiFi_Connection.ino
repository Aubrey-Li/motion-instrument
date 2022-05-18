/*
  Simple WebSocket client for ArduinoHttpClient library
  Connects to the WebSocket server, and sends a hello
  message every 5 seconds
  created 28 Jun 2016
  by Sandeep Mistry
  modified 22 Jan 2019
  by Tom Igoe
  this example is in the public domain
*/
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>
#include <Arduino_LSM6DS3.h>
#include "Sensor_Processing.h"
#include "arduino_secrets.h"

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// WiFi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

char serverAddress[] = "138.16.161.56";  // ip addr
int port = 8080;

WiFiClient wifi;
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;
int count = 0;

void setup() {
//  Serial.begin(9600);
  while ( status != WL_CONNECTED) {
//    Serial.print("Attempting to connect to Network named: ");
//    Serial.println(ssid);                   // print the network name (SSID);

    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
  }

  // print the SSID of the network you're attached to:
//  Serial.print("SSID: ");
//  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
//  Serial.print("IP Address: ");
//  Serial.println(ip);

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");

    while (1);
  }

  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println(" Hz");
  Serial.println();
  Serial.println("Acceleration in G's");
  Serial.println("X\tY\tZ");
}

void loop() {
//  Serial.println("starting WebSocket client");
  client.begin();
  float x, y, z;
  float a, b, c;

  while (client.connected()) {
//    Serial.print("Sending hello ");
//    Serial.println(count);

//sent data format: x-angle y-angle Ax Ay Az Gx Gy Gz
    if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    IMU.readGyroscope(a, b, c);
    float x_a = x_angle(x, y, z);
    float y_a = y_angle(x, y, z);

    client.beginMessage(TYPE_TEXT);
    client.print(x_a);
    client.print('\t');
    client.print(y_a);
    client.print('\t');
    client.print(x);
    client.print('\t');
    client.print(y);
    client.print('\t');
    client.println(z);
    client.print('\t');
    client.print(a);
    client.print('\t');
    client.print(b);
    client.print('\t');
    client.println(c);
    client.endMessage();
  }
  }

//  Serial.println("disconnected");
}
