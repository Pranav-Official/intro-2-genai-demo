import litellm
import json
import sys
import os

# Configuration for LM Studio or other providers
# Default to LM Studio local server if no API key is provided
MODEL = os.getenv("MODEL", "openai/functiongemma-270m-it")
API_BASE = os.getenv("API_BASE", "http://localhost:1234/v1")
API_KEY = os.getenv("API_KEY", "lm-studio")

# Check if model supports function calling (optional, litellm handles many)
# litellm.supports_function_calling(model=MODEL)


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


def get_stock_price(symbol: str):
    """Get the current stock price for a given symbol"""
    prices = {"AAPL": 150.25, "GOOGL": 2800.10, "MSFT": 300.50, "TSLA": 700.00}
    price = prices.get(symbol.upper(), "unknown")
    return json.dumps({"symbol": symbol, "price": price, "currency": "USD"})


def get_current_time(timezone: str = "UTC"):
    """Get the current time in a specified timezone"""
    # Simplified mock implementation
    return json.dumps({"timezone": timezone, "time": "14:30:00", "date": "2026-03-24"})


def calculate_distance(origin: str, destination: str):
    """Calculate the distance between two locations"""
    return json.dumps(
        {"origin": origin, "destination": destination, "distance": "500", "unit": "km"}
    )


def send_email(to: str, subject: str, body: str):
    """Send a simulated email"""
    return json.dumps({"status": "sent", "to": to, "subject": subject})


def search_knowledge_base(query: str):
    """Search the internal knowledge base for information"""
    return json.dumps(
        {"query": query, "result": f"Information about '{query}' found in section 42."}
    )


def generate_password(length: int = 12, include_symbols: bool = True):
    """Generate a random password"""
    return json.dumps({"password": "MOCK_password_123!", "length": length})


def convert_currency(amount: float, from_currency: str, to_currency: str):
    """Convert an amount from one currency to another"""
    rates = {"USD_EUR": 0.92, "EUR_USD": 1.09, "USD_GBP": 0.79}
    pair = f"{from_currency.upper()}_{to_currency.upper()}"
    rate = rates.get(pair, 1.0)
    converted = amount * rate
    return json.dumps(
        {
            "amount": amount,
            "from": from_currency,
            "to": to_currency,
            "converted_amount": converted,
        }
    )


def get_product_details(product_id: str):
    """Get details for a specific product by ID"""
    products = {
        "P123": {"name": "Laptop", "price": 999.99, "stock": 15},
        "P456": {"name": "Smartphone", "price": 499.99, "stock": 0},
    }
    details = products.get(product_id, "Product not found")
    return json.dumps({"product_id": product_id, "details": details})


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
        {
            "type": "function",
            "function": {
                "name": "get_stock_price",
                "description": "Get the current stock price for a given symbol",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "symbol": {"type": "string", "description": "The stock symbol, e.g. AAPL"},
                    },
                    "required": ["symbol"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_current_time",
                "description": "Get the current time in a specified timezone",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "timezone": {"type": "string", "description": "The timezone, e.g. PST, UTC"},
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "calculate_distance",
                "description": "Calculate the distance between two locations",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "origin": {"type": "string"},
                        "destination": {"type": "string"},
                    },
                    "required": ["origin", "destination"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "send_email",
                "description": "Send a simulated email",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "to": {"type": "string"},
                        "subject": {"type": "string"},
                        "body": {"type": "string"},
                    },
                    "required": ["to", "subject", "body"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "search_knowledge_base",
                "description": "Search the internal knowledge base for information",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string"},
                    },
                    "required": ["query"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "generate_password",
                "description": "Generate a random password",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "length": {"type": "integer"},
                        "include_symbols": {"type": "boolean"},
                    },
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "convert_currency",
                "description": "Convert an amount from one currency to another",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "amount": {"type": "number"},
                        "from_currency": {"type": "string"},
                        "to_currency": {"type": "string"},
                    },
                    "required": ["amount", "from_currency", "to_currency"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_product_details",
                "description": "Get details for a specific product by ID",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "product_id": {"type": "string"},
                    },
                    "required": ["product_id"],
                },
            },
        },
    ]

    available_functions = {
        "get_weather": get_weather,
        "get_location": get_location,
        "get_stock_price": get_stock_price,
        "get_current_time": get_current_time,
        "calculate_distance": calculate_distance,
        "send_email": send_email,
        "search_knowledge_base": search_knowledge_base,
        "generate_password": generate_password,
        "convert_currency": convert_currency,
        "get_product_details": get_product_details,
    }

    print(f"\nUser: {user_question}\n")

    try:
        response = litellm.completion(
            model=MODEL,
            api_base=API_BASE,
            api_key=API_KEY,
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

                function_response = function_to_call(**function_args)

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
                model=MODEL,
                api_base=API_BASE,
                api_key=API_KEY,
                messages=messages,
            )

            print(f"\nAssistant: {second_response.choices[0].message.content}\n")
        else:
            print(f"\nAssistant: {response_message.content}\n")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()


# curl http://localhost:1234/api/v1/chat \
#   -H "Content-Type: application/json" \
#   -d '{
#     "model": "functiongemma-270m-it",
#     "system_prompt": "You answer only in rhymes.",
#     "input": "What is your favorite color?"
# }'
