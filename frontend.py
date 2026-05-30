import os
import streamlit as st
import re
from datetime import datetime
from langchain_core.messages import HumanMessage
from main import app

# Set page config
st.set_page_config(
    page_title="AI Travel Planner | Premium",
    page_icon="✈️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ── Premium UI Styling ──────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --bg-deep: #050816;
    --bg-card: rgba(16, 23, 42, 0.7);
    --accent-blue: #3B82F6;
    --accent-glow: #22D3EE;
    --text-primary: #FFFFFF;
    --text-secondary: #94A3B8;
    --glass-border: rgba(255, 255, 255, 0.1);
}

html, body, [data-testid="stAppViewContainer"] {
    background-color: var(--bg-deep);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text-primary);
}

/* ── Glassmorphism Utility ── */
.glass-panel {
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* ── Hero Section ── */
.hero-container {
    position: relative;
    padding: 4rem 2rem;
    text-align: center;
    background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    margin-bottom: 2rem;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 100px;
    color: var(--accent-blue);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    animation: pulse 2s infinite;
}

.hero-title {
    font-size: 4.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
}

.hero-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 800px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
    text-align: center;
}

/* ── Destination Slider ── */
.slider-container {
    width: 100%;
    overflow: hidden;
    padding: 2rem 0;
    position: relative;
    background: transparent;
}

.slider-track {
    display: flex;
    width: calc(250px * 40); /* 20 cards * 2 for loop */
    animation: scroll 80s linear infinite;
}

.slider-track:hover {
    animation-play-state: paused;
}

@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-250px * 20)); }
}

.dest-card {
    flex: 0 0 230px;
    margin: 0 10px;
    height: 160px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid var(--glass-border);
    position: relative;
}

.dest-card:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: var(--accent-blue);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.dest-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
    transition: filter 0.4s;
}

.dest-card:hover .dest-img {
    filter: brightness(0.9);
}

.dest-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
}

.dest-name {
    font-weight: 700;
    font-size: 1.1rem;
    color: white;
}

/* ── AI Prompt Box ── */
.prompt-container {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.1);
    transition: all 0.3s;
}

.prompt-container:focus-within {
    border-color: var(--accent-blue);
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.2);
}

/* ── Premium Button ── */
div[data-testid="stButton"] > button {
    background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%) !important;
    color: white !important;
    border: none !important;
    border-radius: 16px !important;
    padding: 1rem 2rem !important;
    font-weight: 700 !important;
    font-size: 1.1rem !important;
    width: 100% !important;
    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

div[data-testid="stButton"] > button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 20px 30px -10px rgba(37, 99, 235, 0.6) !important;
}

/* ── Agent Workflow Cards ── */
.agent-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 1.25rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.agent-status {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 10px #10B981;
}

/* ── Dashboard Metrics ── */
.metric-card {
    background: var(--bg-card);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
}

.metric-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--accent-blue);
}

.metric-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.5rem;
}

/* ── Results Styling ── */
.itinerary-day {
    border-left: 2px solid var(--accent-blue);
    padding-left: 2rem;
    margin-bottom: 2.5rem;
    position: relative;
}

.itinerary-day::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    width: 12px;
    height: 12px;
    background: var(--accent-blue);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--accent-blue);
}

/* Animations */
@keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
}

/* Hide Streamlit UI */
#MainMenu, footer, header { visibility: hidden; }

/* Custom Textarea */
.stTextArea textarea {
    background: transparent !important;
    border: none !important;
    color: white !important;
    font-size: 1.1rem !important;
}
</style>
""", unsafe_allow_html=True)

# ── Sidebar Control Center ────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
    <div style="padding: 1rem 0;">
        <h2 style="font-weight: 800; font-size: 1.5rem; margin-bottom: 2rem;">AI Control Center</h2>
    </div>
    """, unsafe_allow_html=True)
    
    # User Profile Section
    st.markdown("""
    <div class="glass-panel" style="padding: 1rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #3B82F6; display: flex; align-items: center; justify-content: center; font-weight: 700;">JD</div>
            <div>
                <div style="font-size: 0.9rem; font-weight: 700;">Premium User</div>
                <div style="font-size: 0.75rem; color: #94A3B8;">Enterprise Plan</div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    thread_id = st.text_input("👤 Session Thread ID", value="aarohi_user")

    st.markdown("---")
    
    # AI Stats
    cols = st.columns(2)
    with cols[0]:
        st.markdown("""<div class="sidebar-stat"><div style="font-size: 0.7rem; color: #94A3B8;">MODEL</div><div style="font-size: 0.8rem; font-weight: 700;">Llama 3.3</div></div>""", unsafe_allow_html=True)
    with cols[1]:
        st.markdown("""<div class="sidebar-stat"><div style="font-size: 0.7rem; color: #94A3B8;">STATUS</div><div style="font-size: 0.8rem; font-weight: 700; color: #10B981;">Online</div></div>""", unsafe_allow_html=True)

    st.markdown("---")
    st.markdown("<div style='font-size: 0.8rem; font-weight: 700; color: #94A3B8; margin-bottom: 1rem;'>ACTIVE TOOLS</div>", unsafe_allow_html=True)
    for tool in ["✈️ Flight Search", "🏨 Hotel Search", "🔍 Tavily Search", "🗓️ Itinerary Engine"]:
        st.markdown(f"""<div style="font-size: 0.85rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: #3B82F6;"></div> {tool}
        </div>""", unsafe_allow_html=True)

# ── Hero Section ──────────────────────────────────────────────────────────────
st.markdown("""
<div class="hero-container">
    <div class="hero-badge">✦ NEXT-GEN AI TRAVEL ENGINE</div>
    <h1 class="hero-title">Plan Your Perfect Trip With AI</h1>
    <div style="display: flex; justify-content: center;">
        <p class="hero-subtitle">Flights, Hotels, Attractions, and Personalized Itineraries generated by a specialized multi-agent AI system. Experience the future of travel planning.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# ── Premium Destination Slider ────────────────────────────────────────────────
DESTINATIONS = [
    ("🇯🇵 Tokyo", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80"),
    ("🇫🇷 Paris", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"),
    ("🇦🇪 Dubai", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"),
    ("🇮🇹 Rome", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80"),
    ("🇨🇦 Toronto", "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=400&q=80"),
    ("🇬🇧 London", "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80"),
    ("🇸🇬 Singapore", "https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?w=400&q=80"),
    ("🇮🇳 Delhi", "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80"),
    ("🇮🇩 Bali", "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=400&q=80"),
    ("🇹🇭 Bangkok", "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80"),
    ("🇦🇺 Sydney", "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80"),
    ("🇺🇸 New York", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80"),
    ("🇨🇭 Zurich", "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&q=80"),
    ("🇪🇸 Barcelona", "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80"),
    ("🇳🇱 Amsterdam", "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=80"),
    ("🇮🇸 Reykjavik", "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=400&q=80"),
    ("🇬🇷 Santorini", "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80"),
    ("🇲🇻 Maldives", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80"),
    ("🇧🇷 Rio de Janeiro", "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80"),
    ("🇲🇦 Marrakesh", "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400&q=80"),
]

# Create the slider HTML (compact version to ensure proper rendering)
slider_items = []
for name, img in DESTINATIONS + DESTINATIONS:
    item = f'<div class="dest-card"><img src="{img}" class="dest-img"><div class="dest-overlay"><div class="dest-name">{name}</div></div></div>'
    slider_items.append(item)

slider_html = f'<div class="slider-container"><div class="slider-track">{"".join(slider_items)}</div></div>'

st.write(slider_html, unsafe_allow_html=True)

st.markdown("<br><br>", unsafe_allow_html=True)

# ── AI Input Section ──────────────────────────────────────────────────────────
st.markdown("""
<div style="max-width: 900px; margin: 0 auto;">
    <div style="font-size: 0.9rem; font-weight: 700; color: #3B82F6; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.1em;">Describe your dream trip</div>
</div>
""", unsafe_allow_html=True)

with st.container():
    col1, col2, col3 = st.columns([1, 10, 1])
    with col2:
        user_query = st.text_area(
            "",
            placeholder="e.g. Plan a 10-day trip from Mumbai to Japan including flights, luxury hotels and local experiences...",
            height=120,
            label_visibility="collapsed",
        )
        generate = st.button("✨ Generate AI Travel Plan")

# ── Processing & Results ──────────────────────────────────────────────────────
if generate:
    if not user_query.strip():
        st.warning("Please describe your trip first.")
    else:
        config = {"configurable": {"thread_id": thread_id}}
        
        # Dashboard Placeholder
        dashboard_placeholder = st.empty()
        
        # Pipeline View
        st.markdown("<br><br><div style='font-weight: 800; font-size: 1.5rem; margin-bottom: 2rem;'>Agent Pipeline</div>", unsafe_allow_html=True)
        
        # Dynamic results storage
        collected = {"flight_results": "", "hotel_results": "", "itinerary": "", "final_response": "", "llm_calls": 0}
        
        # Graph execution
        for chunk in app.stream(
            {
                "messages": [HumanMessage(content=user_query)],
                "user_query": user_query,
                "flight_results": "",
                "hotel_results": "",
                "itinerary": "",
                "llm_calls": 0,
            },
            config=config,
            stream_mode="updates",
        ):
            for node_name, state_update in chunk.items():
                icon_map = {"flight_agent": "✈️", "hotel_agent": "🏨", "itinerary_agent": "🗺️", "final_agent": "🧠"}
                label_map = {"flight_agent": "Flight Agent", "hotel_agent": "Hotel Agent", "itinerary_agent": "Itinerary Agent", "final_agent": "Final Agent"}
                
                icon = icon_map.get(node_name, "🤖")
                label = label_map.get(node_name, node_name)

                with st.expander(f"✨ {icon} {label} - Processing Complete", expanded=True):
                    if node_name == "flight_agent":
                        collected["flight_results"] = state_update.get("flight_results", "")
                        st.markdown(collected["flight_results"])
                    elif node_name == "hotel_agent":
                        collected["hotel_results"] = state_update.get("hotel_results", "")
                        st.markdown(collected["hotel_results"])
                    elif node_name == "itinerary_agent":
                        collected["itinerary"] = state_update.get("itinerary", "")
                        st.markdown(collected["itinerary"])
                    elif node_name == "final_agent":
                        msgs = state_update.get("messages", [])
                        collected["final_response"] = msgs[-1].content if msgs else ""

                collected["llm_calls"] = state_update.get("llm_calls", collected["llm_calls"])

        # Update Metrics Dashboard
        with dashboard_placeholder:
            m1, m2, m3, m4 = st.columns(4)
            with m1:
                st.markdown(f"""<div class="metric-card"><div class="metric-value">4</div><div class="metric-label">Agents Active</div></div>""", unsafe_allow_html=True)
            with m2:
                # Extract simple price if possible from flight results
                prices = re.findall(r"₹(\d+)", collected["flight_results"])
                est_price = f"₹{prices[0]}" if prices else "N/A"
                st.markdown(f"""<div class="metric-card"><div class="metric-value">{est_price}</div><div class="metric-label">Start Price</div></div>""", unsafe_allow_html=True)
            with m3:
                st.markdown(f"""<div class="metric-card"><div class="metric-value">{collected['llm_calls']}</div><div class="metric-label">LLM Calls</div></div>""", unsafe_allow_html=True)
            with m4:
                st.markdown(f"""<div class="metric-card"><div class="metric-value">98%</div><div class="metric-label">AI Score</div></div>""", unsafe_allow_html=True)

        # Final Summary Section
        if collected["final_response"]:
            st.markdown("<br><br>", unsafe_allow_html=True)
            st.markdown("""<div class="glass-panel">
                <h2 style="font-weight: 800; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    ✨ AI Travel Recommendation
                </h2>
            """, unsafe_allow_html=True)
            st.markdown(collected["final_response"])
            st.markdown("</div>", unsafe_allow_html=True)

            # Itinerary Timeline Parsing
            if collected["itinerary"]:
                st.markdown("<br><br><h2 style='font-weight: 800;'>Daily Experience Timeline</h2><br>", unsafe_allow_html=True)
                days = re.split(r"(Day\s*\d+:)", collected["itinerary"])
                if len(days) > 1:
                    for i in range(1, len(days), 2):
                        day_title = days[i]
                        day_content = days[i+1]
                        st.markdown(f"""
                        <div class="itinerary-day">
                            <h3 style="color: #3B82F6; font-weight: 700;">{day_title}</h3>
                            <div style="color: #CBD5E1; line-height: 1.6;">{day_content}</div>
                        </div>
                        """, unsafe_allow_html=True)
                else:
                    st.markdown(collected["itinerary"])

            # Save / Download
            st.markdown("<br>", unsafe_allow_html=True)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"travel_plan_{timestamp}.md"
            file_content = f"# AI Travel Plan\n\n## Summary\n{collected['final_response']}\n\n## Itinerary\n{collected['itinerary']}"
            
            st.download_button("💾 Export Travel Plan (PDF/MD)", data=file_content, file_name=filename)
