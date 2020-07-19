#pragma once
#include "_SprinklerControl.h"
#include <NTPClient.h>
#include <WiFiUdp.h>
#include"custom_Websocket.h"
#include "open_file.h"
#include <ESP8266WiFi.h>


class SprinklerControl :
	public _SprinklerControl
{
private:

	// Important pointer parts.
	static custom_Websocket* socket; // Pointer for websocket.
	static open_file* file; // Pointer for saved file that contain all the stored value.

	// Important variable to check working of machine part.
	bool was_closed_overtime{ false };
	bool should_be_active{ false }; // To control whole operation.
	
	unsigned long last_on{ 0 };
	unsigned long on_since{ 0 };
	bool demo_mode{ false };

	// Important value to be set.
	double minimum_moisture_level{ 3.0 }; // As name implys, it is minimume moisture level, below which sprinkler should be activate.
	int time_after_which_shutdown{ 80 }; // In minutes.
	int check_after_hours{ 23 }; // Gap of time, in which you don't want sprinklers to not check moisture.

	bool is_water_low();
	void is_it_long_since();
	bool vaild_time_passed();

	void update_last_on(unsigned long val);

	void send_when_open();

	void update_on_since(unsigned long val);

	String get_time_formulated();
	
public:
	void operation_control_loop();
	virtual void set_value();
	virtual void send_update();
	bool turn_off_srinkler();
	SprinklerControl(custom_Websocket* socket_val, open_file* file_val);
	bool demo_control(bool state);
	static NTPClient timeClient;
};

