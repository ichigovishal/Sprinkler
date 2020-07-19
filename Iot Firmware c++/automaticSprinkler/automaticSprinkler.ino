#include "wifi.h"
#include "SprinklerControl.h"
#include <vector>

long int afterMin{};
bool first{ true };

custom_Websocket* socket;
open_file* file;
SprinklerControl* controller;
bool send_back_state{ false };
void setup() {
	pinMode(0, OUTPUT);
	digitalWrite(0, HIGH);
	Serial.begin(115200);
	socket = new custom_Websocket;
	file = new open_file;
	wifi::main(socket, file);
	controller = new SprinklerControl{socket, file};

}


void loop()
{
	socket->loop();
	delay(25);
	controller->operation_control_loop();
	delay(25);
	if (socket->num_user > 0 && socket->received)
	{
		// Get Data from socket
		ArduinoJson::DynamicJsonDocument* const data{ socket->get_data() };

		if ((*data)["type"].as<int>() == 101)// Change Save data
		{
			delay(100);
			ArduinoJson::DynamicJsonDocument* _data{ file->read_data() };
			std::vector<char*> saved{};
			if (!(*data)["sprinkler_port"].isNull())
			{
				file->add_data("sprinkler_port", (*data)["sprinkler_port"].as<int>());
				saved.push_back("sprinkler_port");
			}

			if (!(*data)["approximation_total_interval"].isNull())
			{
				file->add_data("approximation_total_interval", (*data)["approximation_total_interval"].as<int>());
				saved.push_back("approximation_total_interval");
			}

			if (!(*data)["minimum_moisture_level"].isNull())
			{
				file->add_data("minimum_moisture_level", (*data)["minimum_moisture_level"].as<double>());
				saved.push_back("minimum_moisture_level");
			}

			if (!(*data)["check_after_hours"].isNull())
			{
				file->add_data("check_after_hours", (*data)["check_after_hours"].as<int>());
				saved.push_back("check_after_hours");
			}

			if (!(*data)["time_after_which_shutdown"].isNull())
			{
				file->add_data("time_after_which_shutdown", (*data)["time_after_which_shutdown"].as<int>());
				saved.push_back("time_after_which_shutdown");
			}
			file->save_data();
			delay(50);
			controller->set_value();
			delay(100);
			socket->add_sent_data("recivied", true);
			socket->add_sent_data("recivied_request_type", 101);
			socket->add_sent_data("id", (*data)["id"].as<int>());
			socket->add_sent_data("changed_values", saved);
			socket->sent_data();
			delay(100);
		}
		else if ((*data)["type"].as<int>() == 102) // Demo Request
		{
			bool state = (*data)["state"];
			socket->add_sent_data("recivied", true);
			socket->add_sent_data("recivied_request_type", 102);
			socket->add_sent_data("id", (*data)["id"].as<int>());
			socket->sent_data();
			delay(100);
			controller->demo_control(state);
		}
		else if ((*data)["type"].as<int>() == 103) // Reset control
		{
			socket->add_sent_data("recivied", true);
			socket->add_sent_data("recivied_request_type", 103);
			socket->add_sent_data("id", (*data)["id"].as<int>());
			socket->sent_data();
			delay(100);
			ESP.restart();
		}
		delay(15);
		controller->send_update();
	}
	delay(25);
	if (controller->timeClient.getEpochTime() > afterMin + 60) {
		controller->send_update();
		afterMin = controller->timeClient.getEpochTime();
	}
	else if (first) {
		afterMin = controller->timeClient.getEpochTime();
		first = false;
	}
	delay(25);
}

