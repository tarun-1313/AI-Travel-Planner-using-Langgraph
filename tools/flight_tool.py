import os
from datetime import datetime

import requests
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("TRAVELPAYOUTS_API_TOKEN")

AIRLINES = {
    "AA": "American Airlines",
    "AI": "Air India",
    "EY": "Etihad Airways",
    "EK": "Emirates",
    "LH": "Lufthansa",
    "BA": "British Airways",
    "QR": "Qatar Airways",
    "6E": "IndiGo",
    "UK": "Vistara",
}

AIRPORT_NAMES = {
    "DEL": "Delhi",
    "BOM": "Mumbai",
    "BLR": "Bangalore",
    "MAA": "Chennai",
    "CCU": "Kolkata",
    "HYD": "Hyderabad",
    "GOI": "Goa",
    "YYZ": "Toronto",
    "YVR": "Vancouver",
    "NRT": "Tokyo",
    "DXB": "Dubai",
    "CDG": "Paris",
    "DPS": "Bali",
    "FCO": "Rome",
    "BKK": "Bangkok",
    "LHR": "London",
    "SIN": "Singapore",
    "SYD": "Sydney",
    "JFK": "New York",
}

LOCATION_MAPPING = {
    "india": "DEL",
    "delhi": "DEL",
    "mumbai": "BOM",
    "bombay": "BOM",
    "bangalore": "BLR",
    "bengaluru": "BLR",
    "chennai": "MAA",
    "madras": "MAA",
    "kolkata": "CCU",
    "calcutta": "CCU",
    "hyderabad": "HYD",
    "goa": "GOI",
    "canada": "YYZ",
    "toronto": "YYZ",
    "vancouver": "YVR",
    "japan": "NRT",
    "tokyo": "NRT",
    "paris": "CDG",
    "france": "CDG",
    "dubai": "DXB",
    "uae": "DXB",
    "bali": "DPS",
    "indonesia": "DPS",
    "rome": "FCO",
    "italy": "FCO",
    "bangkok": "BKK",
    "thailand": "BKK",
    "london": "LHR",
    "uk": "LHR",
    "singapore": "SIN",
    "sydney": "SYD",
    "australia": "SYD",
    "new york": "JFK",
    "usa": "JFK",
}

def needs_flight_search(query: str) -> bool:
    query = query.lower()
    keywords = [
        "flight",
        "flights",
        "airfare",
        "air ticket",
        "airport",
        "fly",
        "trip",
        "travel",
        "plan",
        "visit",
        "vacation",
        "tour",
        "international",
        "holiday",
        "itinerary",
    ]

    return any(word in query for word in keywords)

def get_location_code(text: str) -> str:
    text = text.lower()
    for place, code in LOCATION_MAPPING.items():
        if place in text:
            return code
    return None

def format_date(raw_date):
    try:
        return datetime.fromisoformat(
            raw_date.replace("Z", "+00:00")
        ).strftime("%d %b %Y")
    except Exception:
        return raw_date

def search_flights(query):
    if not TOKEN:
        return "❌ TRAVELPAYOUTS_API_TOKEN not found"

    # Skip unnecessary flight search
    if not needs_flight_search(query):
        return (
            "No flight search required for this itinerary. "
            "User did not explicitly request flights."
        )

    query_lower = query.lower()
    origin = None
    destination = None

    # Try to detect "from [city]" and "to [city]"
    import re
    from_match = re.search(r"from\s+([a-zA-Z\s]+?)(?:\s+to|$)", query_lower)
    to_match = re.search(r"to\s+([a-zA-Z\s]+?)(?:\s+from|$)", query_lower)

    if from_match:
        origin = get_location_code(from_match.group(1))
    
    if to_match:
        destination = get_location_code(to_match.group(1))

    # Fallback: if no from/to pattern, just look for any known locations
    if not origin or not destination:
        found_locations = []
        # Find all mentioned locations in order
        for place in LOCATION_MAPPING.keys():
            if place in query_lower:
                code = LOCATION_MAPPING[place]
                if code not in [loc[1] for loc in found_locations]:
                    start_idx = query_lower.find(place)
                    found_locations.append((start_idx, code))
        
        found_locations.sort() # Sort by appearance in query

        if len(found_locations) >= 2:
            if not origin: origin = found_locations[0][1]
            if not destination: destination = found_locations[1][1]
        elif len(found_locations) == 1:
            if not destination: destination = found_locations[0][1]

    # Defaults
    user_specified_origin = origin
    if not origin:
        origin = "DEL" # Default origin to Delhi for the primary search
    
    if not destination:
        return "Could not identify a destination in your query. Please specify where you want to go (e.g., 'flights to Dubai')."

    if origin == destination:
        return f"Origin and destination are the same ({AIRPORT_NAMES.get(origin, origin)}). Please specify a different destination."

    # Detect trip duration for return flights
    duration_match = re.search(r"(\d+)\s*day", query_lower)
    has_duration = bool(duration_match)
    
    url = (
        "https://api.travelpayouts.com/"
        "aviasales/v3/prices_for_dates"
    )

    headers = {
        "X-Access-Token": TOKEN
    }

    def fetch_flights(orig, dest):
        params = {
            "origin": orig,
            "destination": dest,
            "currency": "INR",
            "limit": 30,
        }
        try:
            response = requests.get(
                url,
                headers=headers,
                params=params,
                timeout=20,
            )
            response.raise_for_status()
            return response.json().get("data", [])
        except Exception:
            return []

    try:
        # Multi-origin search: Primary (user specified or default) + other major hubs
        major_hubs = ["DEL", "BOM", "BLR", "MAA", "CCU", "HYD"]
        if origin in major_hubs:
            major_hubs.remove(origin)
        
        # Prioritize the detected origin
        search_origins = [origin] + major_hubs
        
        all_outbound_flights = []
        for city_code in search_origins:
            city_flights = fetch_flights(city_code, destination)
            for f in city_flights:
                f['origin_city'] = city_code # Keep track of where it's from
            all_outbound_flights.extend(city_flights)
            
            # Stop if we already have a good number of flights
            if len(all_outbound_flights) >= 50:
                break

        if not all_outbound_flights:
            return (
                f"No outbound flights found to "
                f"{AIRPORT_NAMES.get(destination, destination)}"
            )

        # Sort by date (primary) and price (secondary)
        all_outbound_flights.sort(key=lambda x: (x.get("departure_at", "9999-12-31"), x.get("price", 99999999)))

        # Fetch return flights if duration is mentioned
        all_return_flights = []
        if has_duration:
            # For return, we primarily search back to the user's origin or default
            for city_code in search_origins:
                city_returns = fetch_flights(destination, city_code)
                for f in city_returns:
                    f['dest_city'] = city_code
                all_return_flights.extend(city_returns)
                if len(all_return_flights) >= 50:
                    break
            
            # Sort by date (primary) and price (secondary)
            all_return_flights.sort(key=lambda x: (x.get("departure_at", "9999-12-31"), x.get("price", 99999999)))

        output = []
        
        # Format outbound flights
        output.append(f"✈️ **Outbound Flights to {AIRPORT_NAMES.get(destination, destination)}**")
        output.append(f"*(Showing best options from major Indian cities, prioritized by price)*\n")
        
        for idx, item in enumerate(all_outbound_flights[:25]): # Show up to 25 options
            airline_code = item.get("airline", "Unknown")
            airline = AIRLINES.get(airline_code, airline_code)
            price = item.get("price", "N/A")
            departure = format_date(item.get("departure_at", "N/A"))
            from_city = AIRPORT_NAMES.get(item.get('origin_city'), item.get('origin_city'))
            to_city = AIRPORT_NAMES.get(destination, destination)
            
            badge = "🏆 Best Price" if idx == 0 else ""
            if item.get('origin_city') == user_specified_origin:
                badge += " ⭐ User Preference"

            output.append(
                f"{idx + 1}. {badge} 🛫 {from_city} → 🛬 {to_city} ✈ {airline} 💰 ₹{price} 📅 {departure}"
            )

        # Format return flights if available
        if all_return_flights:
            output.append(f"\n🔄 **Return Flights from {AIRPORT_NAMES.get(destination, destination)}**")
            output.append(f"*(Showing options back to major Indian cities)*\n")
            
            for idx, item in enumerate(all_return_flights[:25]):
                airline_code = item.get("airline", "Unknown")
                airline = AIRLINES.get(airline_code, airline_code)
                price = item.get("price", "N/A")
                departure = format_date(item.get("departure_at", "N/A"))
                orig_city = AIRPORT_NAMES.get(destination, destination)
                dest_city = AIRPORT_NAMES.get(item.get('dest_city'), item.get('dest_city'))
                
                badge = "🏆 Best Price" if idx == 0 else ""
                if item.get('dest_city') == user_specified_origin:
                    badge += " ⭐ User Preference"

                output.append(
                    f"{idx + 1}. {badge} 🛫 {orig_city} → 🛬 {dest_city} ✈ {airline} 💰 ₹{price} 📅 {departure}"
                )

        return "\n".join(output)

    except Exception as e:
        return f"❌ Unexpected Error: {str(e)}"
