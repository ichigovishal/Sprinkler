#include "SprinklerControl.h"

bool is_open{ true };

String SprinklerControl::get_time_formulated(){
	//Get a time structure
	unsigned long epoch = SprinklerControl::timeClient.getEpochTime();
	struct tm* ptm = gmtime((time_t*)&epoch);
	String  monthDay = String(ptm->tm_mday);
	String currentMonth = String(ptm->tm_mon + 1);
	int currentYear = ptm->tm_year + 1900;
	if (ptm->tm_mday < 10)
		monthDay = String(0) + String(ptm->tm_mday);
	if ((ptm->tm_mon + 1) < 10)
		currentMonth = String(0) + String(ptm->tm_mon + 1);
	//Print complete date:
	String currentDate = String(currentYear) + "-" + currentMonth  + "-" + monthDay + " " + String(SprinklerControl::timeClient.getFormattedTime());
	return currentDate;
}

void SprinklerControl::send_when_open() {
	if (is_open) {
		SprinklerControl::send_update();
		is_open = false;
	}
}

void SprinklerControl::update_last_on(unsigned long val) {
	file->read_data();
	SprinklerControl::last_on = val;
	file->add_data("last_on", val);
	file->save_data();
}

void SprinklerControl::update_on_since(unsigned long val) {
	file->read_data();
	SprinklerControl::on_since = val;
	file->add_data("on_since", val);
	file->save_data();
}

const long utcOffsetInSeconds = 0;//19800;

WiFiUDP ntpUDP;
NTPClient SprinklerControl::timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

custom_Websocket* SprinklerControl::socket;
open_file* SprinklerControl::file{ 0 };

bool SprinklerControl::is_water_low()
{
	if (SprinklerControl::get_moisture_reading() < SprinklerControl::minimum_moisture_level) {
		return true;
	}
	else
		return false;

}

void SprinklerControl::operation_control_loop()
{
	if ((!SprinklerControl::demo_mode) && SprinklerControl::vaild_time_passed() && SprinklerControl::should_be_active) {
		if (SprinklerControl::is_water_low())
		{
			was_closed_overtime = false;
			if (!SprinklerControl::get_status_of_sprinkler())
				SprinklerControl::update_on_since(SprinklerControl::timeClient.getEpochTime());
			SprinklerControl::activate_sprinkler();
			SprinklerControl::is_it_long_since();
			SprinklerControl::send_when_open();
		}
		else
		{
			SprinklerControl::update_last_on(SprinklerControl::timeClient.getEpochTime());
			SprinklerControl::deactivate_sprinker();
			SprinklerControl::send_update();
			is_open = true;
		}
			
	}
}

void SprinklerControl::set_value()
{
	DynamicJsonDocument* data{ SprinklerControl::file->read_data() };
	SprinklerControl::sprinkler_port = (*data)["sprinkler_port"].isNull() ? SprinklerControl::sprinkler_port : (*data)["sprinkler_port"];
	SprinklerControl::approximation_total_interval = (*data)["approximation_total_interval"].isNull() ? SprinklerControl::approximation_total_interval : (*data)["approximation_total_interval"];
	SprinklerControl::minimum_moisture_level = (*data)["minimum_moisture_level"].isNull() ? SprinklerControl::minimum_moisture_level : (*data)["minimum_moisture_level"];
	SprinklerControl::time_after_which_shutdown = (*data)["time_after_which_shutdown"].isNull() ? SprinklerControl::time_after_which_shutdown : (*data)["time_after_which_shutdown"];
	SprinklerControl::check_after_hours = (*data)["check_after_hours"].isNull() ? SprinklerControl::check_after_hours : (*data)["check_after_hours"];
	SprinklerControl::last_on = (*data)["last_on"].isNull() ? SprinklerControl::last_on : (*data)["last_on"];
	SprinklerControl::on_since = (*data)["since_on"].isNull() ? SprinklerControl::on_since : (*data)["on_since"];
}

void SprinklerControl::is_it_long_since()
{
	SprinklerControl::timeClient.update();
	if ((SprinklerControl::timeClient.getEpochTime() - SprinklerControl::on_since) > (SprinklerControl::time_after_which_shutdown * 60))
	{
		SprinklerControl::update_last_on(SprinklerControl::timeClient.getEpochTime());
		SprinklerControl::deactivate_sprinker();
		was_closed_overtime = true;
		SprinklerControl::send_update();
		is_open = true;
	}
}



bool SprinklerControl::vaild_time_passed()
{
	SprinklerControl::timeClient.update();
	if ((SprinklerControl::timeClient.getEpochTime() - SprinklerControl::last_on) > (SprinklerControl::check_after_hours * 3600))
	{
		SprinklerControl::should_be_active = true;
		return true;
	}
	return false;
}

void SprinklerControl::send_update()
{
	if (socket->num_user > 0)
	{
		socket->create_nested_data("data");
		socket->add_nested_sent_data("status_of_sprinkler", SprinklerControl::get_status_of_sprinkler());
		socket->add_nested_sent_data("sprinkler_port", SprinklerControl::sprinkler_port);
		socket->add_nested_sent_data("approximation_total_interval", SprinklerControl::approximation_total_interval);
		socket->add_nested_sent_data("last_on", SprinklerControl::last_on);
		socket->add_nested_sent_data("moisture_reading", SprinklerControl::get_moisture_reading());
		socket->add_nested_sent_data("was_closed_overtime", SprinklerControl::was_closed_overtime);
		socket->add_nested_sent_data("minimum_moisture_level", SprinklerControl::minimum_moisture_level);
		socket->add_nested_sent_data("time_after_which_shutdown", SprinklerControl::time_after_which_shutdown);
		socket->add_nested_sent_data("check_after_hours", SprinklerControl::check_after_hours);
		socket->add_nested_sent_data("on_since", SprinklerControl::on_since);
		socket->add_nested_sent_data("time", get_time_formulated());
		socket->sent_data();
	}

}

bool SprinklerControl::turn_off_srinkler()
{
	SprinklerControl::should_be_active = false;
	SprinklerControl::last_on = SprinklerControl::timeClient.getEpochTime();
	return SprinklerControl::deactivate_sprinker();
}

SprinklerControl::SprinklerControl(custom_Websocket* socket_val, open_file* file_val)
	:_SprinklerControl{}
{
	SprinklerControl::file = file_val;
	SprinklerControl::socket = socket_val;
	SprinklerControl::set_value();
	SprinklerControl::timeClient.begin();
	//digitalWrite(SprinklerControl::sprinkler_port, HIGH);
	for (size_t i = 0; i < SprinklerControl::approximation_total_interval + 1; i++)
	{
		SprinklerControl::get_moisture_reading();
	}
	
}

bool SprinklerControl::demo_control(bool state)
{
	if (state)
	{
		SprinklerControl::activate_sprinkler();
		demo_mode = true;
		SprinklerControl::send_update();
		return true;
	}
	else
	{
		demo_mode = false;
		SprinklerControl::deactivate_sprinker();
		SprinklerControl::send_update();
		return false;
	}
}
