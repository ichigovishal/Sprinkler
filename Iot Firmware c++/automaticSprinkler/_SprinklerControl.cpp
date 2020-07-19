#include "_SprinklerControl.h"
#include <cmath>
// Important value that cannot be change.
const int analoge_port{ A0 };

double formula_for_convertion(double value_from_sensor) {
	return pow(500 / (value_from_sensor - 215), 0.5);
}



_SprinklerControl::_SprinklerControl()
{

}

void _SprinklerControl::send_update()
{

}

double _SprinklerControl::get_moisture_reading()
{
	static int times{ 0 }; // A static value, that tells how many times value is added. 
	static double buffer_value{ 0.0 }; // A placeholder for the added value.
	if (times == _SprinklerControl::approximation_total_interval) // To reset the value when total interval are completed.
	{
		times = 0;
		_SprinklerControl::last_moisture_reading = buffer_value / _SprinklerControl::approximation_total_interval;
		buffer_value = 0.0;
	}
	else // Updating buffer value and interval passed.
	{
		buffer_value += formula_for_convertion(analogRead(analoge_port));
		times++;
	}
	return _SprinklerControl::last_moisture_reading; // Last value is returned, till interval is completed; after that updated last value is returned.
}

bool _SprinklerControl::activate_sprinkler()
{
	if (! _SprinklerControl::sprinkler_active)
	{
		// Turning on sprinkler part.
		digitalWrite(_SprinklerControl::sprinkler_port, LOW); // Relay activates on pull down.
		// Changing active status part. 
		_SprinklerControl::sprinkler_active = ! _SprinklerControl::sprinkler_active;// To true
		return true;
	}
	return false;
}

bool _SprinklerControl::deactivate_sprinker()
{
	if (_SprinklerControl::sprinkler_active)
	{
		// Turning off sprinkler part.
		digitalWrite(_SprinklerControl::sprinkler_port, HIGH); // Relay deactivates on pull up.
		// Changing active status part.
		_SprinklerControl::sprinkler_active = !_SprinklerControl::sprinkler_active; // To false
		return true;
	}
	return false;
}

bool _SprinklerControl::get_status_of_sprinkler()
{
	return _SprinklerControl::sprinkler_active; // Private "sprinkler_active" is returned to protect it from unwanted external change.
}


