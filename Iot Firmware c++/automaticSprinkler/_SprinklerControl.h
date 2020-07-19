#pragma once
#ifndef _MOTORCONTROLLER_H
#define _MOTORCONTROLLER_H
#include <ESP8266WiFi.h>
#include"custom_Websocket.h"
#include <iostream>
#include <string>
#include <time.h>
class _SprinklerControl
{
private:
	// Storing status of machine part.
	bool sprinkler_active{false}; // Private bool, use to check status of sprinkler during activation and deactivation.
	
	double last_moisture_reading{ 0 }; // Last value you got when took the avarage.

protected:
	//Important info for program part.

	int approximation_total_interval{ 3600 }; // How many time, you want to add value, that you want to approximate, to get avarage.

	//Getting important value part.
	virtual void set_value() = 0 ;
		


	//Controlling opration part.
	bool activate_sprinkler(); //To activate sprinkler.
	bool deactivate_sprinker(); //To deactivate sprinkler.

	// Getting current status part.
	bool get_status_of_sprinkler(); // To get the value of bool 'sprinkler_active' as it is private

	// Constructor part.
	_SprinklerControl();

	// Sending update to user part.
	virtual void send_update() = 0;

public:
	int sprinkler_port{ 2 }; // GPIO port, in which sprinkler relay is connected. // Pull Down resistor

		// Getting value part.
	double get_moisture_reading(); // To reading from sprinkler.

};
#endif //_MOTORCONTROLLER_H
