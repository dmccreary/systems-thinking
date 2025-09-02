# State Diagram

```mermaid
stateDiagram-v2
    [*] --> Data
    Data --> Train
    Train --> Predict
    Predict --> Feedback
    Feedback --> Data
```

