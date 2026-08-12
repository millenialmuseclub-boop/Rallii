# Travel planning tools

Rallii’s `/plan` workspace reserves three inactive tool surfaces for Flights, Hotels, and Stays. They are currently rendered by `TravelPlanningTool` and do not load scripts, transmit search data, or display affiliate offers.

When an exact, user-approved Travelpayouts widget configuration is supplied, add a small client component for that approved tool and render it only inside the corresponding planning surface. Do not add a global script to the root layout. The embed must use a responsive container, stable reserved height, loading and failure states, keyboard-accessible controls, and a visible partner disclosure.

Affiliate markers, widget IDs, and external scripts must come from the approved configuration. They must never be invented or stored as private values in client code. Rallii should continue to describe itself as a journey-discovery guide; booking takes place with the external provider.
