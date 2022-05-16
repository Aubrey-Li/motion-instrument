#include "Sensor_Processing.h"
#include <stdio.h>
#include <math.h>
//Calculate you direction from magnetometer readings
//return value in degrees [0, 360]


float pi = 3.1415;
//float compass_heading(float Mx, float My) {
//    int retv;
//    if (Mx == 0) {
//        if (My > 0) {
//            return 90;
//        } else {
//            return 270;
//        }
//    } else if (Mx > 0) {
//        retv = round(atan(My/Mx)*180/pi);
//    } else {
//        retv = round(atan(My/Mx)*180/pi) + 180;
//    }
//    if (retv < 0) {
//        retv += 360;
//    }
//    return retv;
//}

float x_angle(float Ax, float Ay, float Az) {
    float accel = pow(Ax*Ax + Ay*Ay + Az*Az, 0.5);
    float retv;
    if (Ax/accel > 1) {
        retv = 0;
    } else if (Ax/accel < -1) {
        retv = 180;
    } else {
        retv = (float)(acos(Ax/accel)) *180/pi;
    }
    if (Az < 0) {
        retv *= -1;
    }
    if (retv < 0) {
        retv += 360;
    }
    return retv;
}

float y_angle(float Ax, float Ay, float Az) {
    float accel = pow(Ax*Ax + Ay*Ay + Az*Az, 0.5);
    float retv;
    if (Ay/accel > 1) {
        retv = 0;
    } else if (Ay/accel < -1) {
        retv = 180;
    } else {
        retv = (float)(acos(Ay/accel)) *180/pi;
    }
    if (Az < 0) {
        retv *= -1;
    }
    if (retv < 0) {
        retv += 360;
    }
    return retv;
}
