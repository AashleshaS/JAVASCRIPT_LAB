```mermaid
graph TD
    User([<b>User Query</b>]):::userClass -->|Initializes| State[(<b>AgentState</b><br/>- messages<br/>- plan<br/>- research_data<br/>- analysis<br/>- final_output)]:::stateClass

    %% Tool Definitions (Kept outside to allow side placement)
    TavilyTool[["🔍 TavilySearch API"]]:::toolClass
    GroqLLM[["🤖 ChatGroq API<br/>(llama-3.1-8b-instant)"]]:::llmClass

    State -->|Passes Context| Planner

    subgraph LangGraph ["LangGraph Sequential Workflow"]
        direction TB
        
        Planner["<b>1. Planner Agent</b><br/>Formulates strategic plan"]:::agentClass
        SearchAgent["<b>2. Search Agent</b><br/>Queries web & parses results"]:::agentClass
        Analyst["<b>3. Fundamentals Analyst Agent</b><br/>Extracts core insights"]:::agentClass
        Writer["<b>4. Writer Agent</b><br/>Synthesizes technical report"]:::agentClass

        Planner -->|Updates: plan| SearchAgent
        SearchAgent -->|Updates: research_data| Analyst
        Analyst -->|Updates: analysis| Writer
    end

    %% Lateral Tool Connections (Forces Left/Right layout)
    TavilyTool -.->|API Call| SearchAgent
    
    Planner -.->|LLM Prompt| GroqLLM
    Analyst -.->|LLM Prompt| GroqLLM
    Writer -.->|LLM Prompt| GroqLLM

    %% Output Flow
    Writer -->|Completes| END([END]):::endClass
    END --> FinalReport[/<b>Final Report Output</b>/]:::outputClass

    %% Modern Color Styling
    classDef userClass fill:#6c5ce7,stroke:#fff,stroke-width:2px,color:#fff;
    classDef stateClass fill:#fdcb6e,stroke:#e17055,stroke-width:2px,color:#2d3436;
    classDef agentClass fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px,color:#0d47a1;
    classDef llmClass fill:#00b894,stroke:#00cec9,stroke-width:2px,color:#fff;
    classDef toolClass fill:#ff7675,stroke:#d63031,stroke-width:2px,color:#fff;
    classDef endClass fill:#2d3436,stroke:#fff,stroke-width:2px,color:#fff;
    classDef outputClass fill:#55efc4,stroke:#00b894,stroke-width:2px,color:#2d3436;
```
