import litellm
import json
import sys

litellm.supports_function_calling(model="gemini/gemini-3-flash-preview")


def get_weather(location: str, unit: str = "celsius"):
    """Get the current weather in a given location"""
    weather_data = {
        "tokyo": {
            "location": "Tokyo",
            "temperature": "15",
            "unit": "celsius",
            "condition": "Partly cloudy",
        },
        "san francisco": {
            "location": "San Francisco",
            "temperature": "18",
            "unit": "celsius",
            "condition": "Sunny",
        },
        "paris": {
            "location": "Paris",
            "temperature": "12",
            "unit": "celsius",
            "condition": "Rainy",
        },
        "new york": {
            "location": "New York",
            "temperature": "8",
            "unit": "celsius",
            "condition": "Clear",
        },
        "london": {
            "location": "London",
            "temperature": "10",
            "unit": "celsius",
            "condition": "Cloudy",
        },
    }

    location_lower = location.lower()
    for city, data in weather_data.items():
        if city in location_lower:
            return json.dumps(data)

    return json.dumps(
        {
            "location": location,
            "temperature": "unknown",
            "unit": unit,
            "condition": "unknown",
        }
    )


def get_location():
    """Get the user's current location"""
    return json.dumps(
        {"location": "San Francisco, CA", "country": "USA", "timezone": "PST"}
    )


def main():
    if len(sys.argv) < 2:
        print('Usage: python main.py "Your question here"')
        print('Example: python main.py "What\'s the weather in Tokyo?"')
        sys.exit(1)

    user_question = " ".join(sys.argv[1:])

    messages = [{"role": "user", "content": user_question}]

    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA",
                        },
                        "unit": {
                            "type": "string",
                            "enum": ["celsius", "fahrenheit"],
                            "description": "Temperature unit",
                        },
                    },
                    "required": ["location"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_location",
                "description": "Get the user's current location",
                "parameters": {
                    "type": "object",
                    "properties": {},
                },
            },
        },
    ]

    available_functions = {
        "get_weather": get_weather,
        "get_location": get_location,
    }

    print(f"\nUser: {user_question}\n")

    try:
        response = litellm.completion(
            model="gemini/gemini-3-flash-preview",
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )

        print("Model response:", response.choices[0].message.content)

        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        if tool_calls:
            messages.append(
                {
                    "role": response_message.role,
                    "content": response_message.content,
                    "tool_calls": [
                        {
                            "id": tc.id,
                            "type": tc.type,
                            "function": {
                                "name": tc.function.name,
                                "arguments": tc.function.arguments,
                            },
                        }
                        for tc in tool_calls
                    ],
                }
            )

            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_to_call = available_functions[function_name]
                function_args = json.loads(tool_call.function.arguments)

                print(f"\nCalling function: {function_name}")
                print(f"Arguments: {function_args}")

                if function_name == "get_weather":
                    function_response = function_to_call(
                        location=function_args.get("location"),
                        unit=function_args.get("unit", "celsius"),
                    )
                else:
                    function_response = function_to_call()

                print(f"Result: {function_response}")

                messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )

            second_response = litellm.completion(
                model="gemini/gemini-3-flash-preview",
                messages=messages,
            )

            print(f"\nAssistant: {second_response.choices[0].message.content}\n")
        else:
            print(f"\nAssistant: {response_message.content}\n")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
