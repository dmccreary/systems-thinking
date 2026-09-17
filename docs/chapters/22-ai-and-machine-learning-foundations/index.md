---
title: Artificial Intelligence and Machine Learning Foundations
description: The core vocabulary of artificial intelligence and machine learning -- algorithms, neural networks, large language models, training data, and generative AI -- along with the failure modes of model drift, overfitting, and AI hallucination, and the alignment, governance, and human-oversight concepts needed to reason about AI systems responsibly.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 17:45:19
version: 1.10
---

# Artificial Intelligence and Machine Learning Foundations

## Summary

This chapter covers the core vocabulary of artificial intelligence and machine learning -- algorithms, neural networks, large language models, training data, and generative AI -- along with the failure modes of model drift, overfitting, and AI hallucination. It closes with the alignment, governance, and human-oversight concepts needed to reason about AI systems responsibly. Students completing this chapter will be able to explain how an AI model is trained and what can go wrong when it is deployed.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Artificial Intelligence | 65 |
| Machine Learning | 56 |
| Algorithm | 32 |
| Large Language Model | 12 |
| Neural Network | 16 |
| Training Data | 5 |
| Model Training | 4 |
| Prediction Model | 2 |
| Data Set | 1 |
| Model Drift | 1 |
| Overfitting | 2 |
| Generative AI | 8 |
| Reinforcement Learning | 1 |
| Prompt Engineering | 1 |
| AI Hallucination | 1 |
| Human-In-The-Loop | 2 |
| AI Alignment | 7 |
| AI Governance | 3 |
| Global AI Governance | 1 |
| Explainability | 3 |
| Transparency (AI) | 2 |
| Accountability (AI) | 1 |
| Automation | 3 |
| Autonomy | 1 |
| Human Oversight | 1 |

## Prerequisites

This chapter builds on concepts from:

- [5. Stocks, Flows, and System Dynamics](../05-stocks-flows-and-system-dynamics/index.md)
- [7. Feedback Resilience and Robustness](../07-feedback-resilience-and-robustness/index.md)
- [9. Named Archetypes and Limits to Growth](../09-named-archetypes-and-limits-to-growth/index.md)
- [10. Fixes That Fail and Shifting the Burden](../10-fixes-that-fail-and-shifting-the-burden/index.md)
- [20. Organizational Silos and Silo Busting](../20-organizational-silos-and-silo-busting/index.md)

---

## Introduction

Every chapter so far has treated artificial intelligence as something referenced in passing -- the AI Flywheel in Chapter 12, an AI-powered churn model in Chapter 19. This chapter finally opens the box. Before the next chapter can apply systems thinking to AI-specific feedback loops, you need the same kind of solid, precisely defined vocabulary this book gave you for graphs, data governance, and organizational structure -- because "AI" is one of the most overused and under-defined terms in modern technology, and a systems thinker who cannot tell an algorithm from a neural network from a large language model cannot reason clearly about any of them.

!!! mascot-welcome "Finally Opening the AI Box"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You've heard "AI" mentioned in almost every chapter of this book so far -- now you get the precise vocabulary underneath the buzzword, from the humble algorithm all the way up to today's large language models. Let's zoom out and see the whole system!

## The Foundation: Algorithms

Long before "artificial intelligence" was a phrase anyone used, computer science already had the concept this whole chapter builds on. An **algorithm** is a finite, precisely defined sequence of steps that transforms a given input into a specific output, guaranteed to produce the same result every time it runs on the same input. Long division is an algorithm: a fixed sequence of divide-multiply-subtract-bring-down steps that reliably turns two numbers into a quotient, with no learning, guessing, or adaptation involved anywhere in the process. A sorting routine that rearranges a list of names alphabetically is an algorithm for the same reason -- the steps are fixed in advance by a human programmer, and the same input list always produces the same sorted output.

This distinction matters immediately, because most of the terms in the rest of this chapter describe systems built *on top of* algorithms rather than replacing them. **Artificial intelligence** is the broad field of building computer systems that perform tasks normally requiring human intelligence -- perception, reasoning, decision-making, language understanding -- regardless of whether the specific technique used involves learning from data at all. A simple chess program that always picks its move by exhaustively checking every possible sequence of moves several turns ahead is genuinely an AI system by this definition, even though it never learns from experience the way a modern AI system typically does; it is simply a very large, cleverly designed algorithm.

**Machine learning** narrows that broad field to one specific technique: building systems that improve their performance on a task by learning patterns from data, rather than by following rules a human programmer wrote out explicitly in advance. A spam filter that a programmer builds by hand-writing rules ("block any email containing the word 'lottery'") is traditional AI without machine learning. A spam filter that instead examines thousands of emails a human has already labeled "spam" or "not spam," and learns on its own which word patterns predict which label, is machine learning -- the rules for classifying a new email were never written by a human at all; they were discovered from data.

The table below reinforces this nested relationship before the diagram that follows makes it visual.

| Term | Scope | Learns from data? |
|---|---|---|
| Algorithm | Any fixed, precise sequence of steps | No -- by definition, fixed in advance |
| Artificial intelligence | Systems performing tasks needing human-like intelligence | Not necessarily |
| Machine learning | A subset of AI that improves by learning from data | Yes, always |

## How Machine Learning Actually Learns

Machine learning's core promise -- that a system can improve at a task without a human writing explicit rules -- depends entirely on what it learns from. A **data set** is an organized collection of individual data records used as the input to a machine-learning process, such as ten thousand labeled photographs of cats and dogs, or a spreadsheet of past loan applications and whether each one defaulted. **Training data** is the specific portion of a data set actually used to teach a machine-learning model its patterns, as distinguished from data set aside later to check whether that learning actually generalizes.

**Model training** is the computational process of adjusting a machine-learning model's internal parameters using training data, so that the model's outputs increasingly match the correct answers in that data -- the spam filter's training process is literally the act of searching for the specific word-pattern weights that best separate the labeled spam emails from the labeled legitimate ones. The result of a completed training process is a **prediction model**: a trained artifact that takes a new, previously unseen input and produces an output -- a prediction, a classification, a recommendation -- based entirely on the patterns it learned during training, without needing the original training data present at the moment it makes that prediction.

!!! mascot-tip "Ask What the Model Was Trained On Before You Trust Its Output"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Whenever you evaluate an AI system's prediction, ask a concrete question first: what training data taught it this pattern, and how similar is my current situation to that training data? A prediction model is only as trustworthy as the training data's fit to the case you're actually asking it about.

Two specific ways this learning process can go wrong deserve names of their own, because both produce a model that looks fine in testing yet fails in the real world. **Overfitting** occurs when a model learns the training data's specific quirks and noise so closely that it fails to generalize to new, unseen data -- a spam filter that memorizes the exact subject lines of the training emails, rather than the underlying word patterns that generalize to new spam, will score perfectly on training data and then fail on the very next unfamiliar spam email it encounters. **Model drift** occurs when a deployed model's accuracy degrades over time because the real-world patterns it is applied to have shifted away from the patterns present in its original training data -- a fraud-detection model trained before a new scam technique became common will keep confidently applying its now-outdated patterns unless it is retrained, exactly the kind of unexamined, aging mental model Chapter 2 warned against, now automated at scale.

The chart below makes overfitting visible by tracking a model's error on training data against its error on data it has never seen, as training continues.

#### Diagram: Training vs. Validation Error -- Spotting the Overfitting Point

<iframe src="../../sims/overfitting-error-curves/main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Training vs. Validation Error -- Spotting the Overfitting Point MicroSim fullscreen](../../sims/overfitting-error-curves/main.html){ .md-button }

<details markdown="1">
<summary>Training vs. Validation Error -- Spotting the Overfitting Point</summary>
Type: chart
**sim-id:** overfitting-error-curves<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: given a live chart of training error and validation error over training time, the learner will identify the specific point where continued training begins to overfit the model, and explain why the two curves diverge after that point (Bloom: Analyzing).

Canvas: responsive Chart.js line chart, full container width, fixed 400px height, redrawn on window resize.

Visual design: an x-axis labeled "Training Epoch" from 0 to 50, and a y-axis labeled "Error Rate." Two lines: "Training Error" (declining smoothly and continuously toward zero as epochs increase) and "Validation Error" (declining alongside training error until roughly epoch 15, then turning upward and increasing steadily afterward). A vertical dashed marker line is drawn automatically at the epoch where validation error reaches its minimum, labeled "Overfitting Begins Here."

Controls (p5.js-style built-in equivalents adapted for a Chart.js context): a `createSlider()`-style range control labeled "Training Epoch," from 0 to 50, that moves a vertical playhead across the chart; a text readout beside the slider reports both curves' current error value at the selected epoch.

Interaction: hovering over either line at any epoch shows a tooltip with that curve's exact error value at that point. A "Highlight Overfitting Zone" button shades the region after the dashed marker line, visually distinguishing "still learning" from "now overfitting."

Implementation: Chart.js line chart with two pre-computed data series (a smooth monotonic decay for training error, a decay-then-rise curve for validation error), a custom Chart.js plugin drawing the dashed vertical marker at the validation-error minimum, canvas resized via Chart.js's built-in `responsive: true` option.
</details>

## Neural Networks and Deeper Learning

Not every machine-learning model is built the same way internally, and one architecture in particular now underlies most of the field's recent progress. A **neural network** is a machine-learning model loosely inspired by connected neurons in a biological brain, made up of layered nodes where each node combines its inputs using adjustable numeric weights, and passes the result forward through the network toward a final output. A single node in a neural network computes a weighted sum of its inputs, adds a bias term, and passes that sum through an activation function \( f \):

\[ y = f\left(\sum_{i} w_i x_i + b\right) \]

where each \( x_i \) is an input value, each \( w_i \) is that input's learned weight, \( b \) is a learned bias, and \( f \) squashes the result into the range the next layer expects. Model training, for a neural network specifically, means searching for the exact weight and bias values across every node in every layer that make the network's final output match the training data as closely as possible.

The diagram below lets you step through exactly how one layer of a neural network transforms a set of inputs into an output, using the same weighted-sum-plus-activation calculation described above.

#### Diagram: Inside a Neural Network Layer

<iframe src="../../sims/neural-network-layer-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Inside a Neural Network Layer diagram fullscreen](../../sims/neural-network-layer-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Inside a Neural Network Layer</summary>
Type: diagram
**sim-id:** neural-network-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/linear-algebra/tree/main/docs/sims/neural-network-layer

Learning objective: given a small neural network layer with adjustable input values and weights, the learner will compute the weighted sum, apply an activation function, and explain how changing one weight changes the layer's output (Bloom: Applying).

Canvas: 700x420 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: three input nodes on the left labeled \( x_1, x_2, x_3 \), each connected by a labeled weighted edge (\( w_1, w_2, w_3 \)) to one output node on the right labeled \( y \). A small bias box feeds into the output node alongside the three weighted edges.

Controls (p5.js built-in controls only, per this book's control conventions): three `createSlider()` controls for \( x_1, x_2, x_3 \) (range -5 to 5), three more for \( w_1, w_2, w_3 \) (range -2 to 2), and one for the bias \( b \) (range -5 to 5), all defaulting to values that produce a clearly positive output.

Behavior: as any slider moves, the diagram recomputes the weighted sum live, displays it as text ("Weighted sum = 3.20"), passes it through a sigmoid activation function, and displays the final output \( y \) both as a number and as the output node's fill brightness (brighter for values closer to 1, dimmer for values closer to 0).

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, weighted sum and sigmoid activation recomputed on every slider change.
</details>

!!! mascot-thinking "A Neural Network Is Just Weighted Sums, Stacked and Repeated"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    However large and mysterious a modern neural network sounds, notice that the diagram above is the entire mechanism -- multiply, add, squash. Everything a huge model does is that same three-step operation, repeated across millions or billions of connected nodes arranged in many layers. The scale is what changed; the underlying arithmetic is genuinely this simple.

## Large Language Models and Generative AI

Stacking enough neural-network layers, and training them on an enormous amount of text, produces a specific and now very familiar kind of model. A **large language model** is a neural network trained on vast quantities of text to predict the most probable next word (or word-fragment) given the words that came before it, and doing this prediction step repeatedly, one word at a time, is what lets it generate entire coherent sentences and paragraphs. Given the partial sentence "the cat sat on the," a large language model assigns a high probability to "mat" and a much lower probability to "airplane," based purely on patterns learned from the text it was trained on -- it has no understanding of cats or mats in any human sense, only a very well-calibrated statistical sense of which word plausibly comes next.

A large language model is one prominent example of a broader category. **Generative AI** is any AI system that creates new content -- text, images, audio, code -- rather than only classifying or predicting a label for existing content, and a large language model generating a paragraph of text is generative AI applied specifically to language. The way a person interacts with a generative AI system has its own name and its own skill. **Prompt engineering** is the practice of carefully designing the input text given to a generative AI system in order to reliably produce a more useful or accurate output -- specifying the exact format, tone, and constraints wanted, rather than leaving the model to guess at what was actually needed, the same way a well-specified search query returns better results than a vague one.

Because a large language model is only ever predicting a plausible next word rather than checking a fact against reality, it can produce fluent, confident, and completely wrong output. **AI hallucination** is the phenomenon in which a generative AI system produces output that is fluent and plausible-sounding but factually incorrect or entirely fabricated -- a large language model confidently citing a court case or a scientific paper that does not exist is hallucinating, not lying, because the model has no internal concept of "true" separate from "statistically plausible given my training data."

!!! mascot-warning "Fluent Does Not Mean True"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is trusting a generative AI system's output simply because it reads confidently and grammatically correct. Fluency is a property of the language model's next-word prediction, not a signal about factual accuracy. Always verify a specific, checkable claim -- a citation, a statistic, a date -- against an independent source before repeating it.

A different training approach altogether, better suited to tasks with no single correct labeled answer, learns from consequences instead of examples. **Reinforcement learning** is a training approach in which a model learns by taking actions in an environment and receiving rewards or penalties based on the outcomes, gradually favoring actions that lead to higher reward -- a system learning to play a video game by trying moves and getting a higher score for good ones, with no human ever labeling "this exact move was correct," is reinforcement learning in its purest form.

## People and Machines Sharing the Work

None of these systems operate in a vacuum -- a real deployment always involves some division of labor between the AI system and the humans responsible for its output. **Automation** is the use of technology to perform a task with minimal or no ongoing human intervention, once that technology has been set up and deployed. **Autonomy** goes a step further, describing a system's capacity to make and act on its own decisions within some defined scope, without needing a human to approve each individual decision as it happens -- a factory robot that always performs the identical welding motion is automated but not autonomous, while a warehouse robot that independently chooses its own path around obstacles it has never seen before is exercising real autonomy within that narrow task.

Two related terms describe how deliberately humans stay involved even as autonomy increases. **Human-in-the-loop** describes a system design in which a human reviews, and can override, an AI system's output before that output takes effect, rather than letting the system act fully independently -- a loan-approval model that flags its recommendation for a human loan officer's final sign-off, rather than approving or denying the loan itself, keeps a human in the loop. **Human oversight** is the broader, ongoing practice of monitoring an AI system's behavior after deployment, watching for the model drift or emerging failure patterns this chapter already named, rather than trusting a system's initial testing to hold true forever.

## Governing AI Responsibly

Once an AI system's decisions genuinely affect people's lives -- a loan, a medical diagnosis, a hiring decision -- a cluster of responsibility-focused concepts becomes essential rather than optional. **AI alignment** is the practice of designing an AI system so that its actual behavior matches the goals and values its human developers and users genuinely intend, rather than optimizing a narrow, literal proxy for that goal in a way that technically succeeds while missing the real intent -- a content-recommendation system optimized purely for "time spent watching" that starts surfacing outrage-inducing content because outrage keeps people watching longer is a system that is well-optimized but poorly aligned.

Three related qualities determine how much people can actually trust and check an AI system's behavior. **Explainability** is the degree to which an AI system's specific decision can be described in terms a human can understand -- explaining that a loan application was denied specifically because of a high debt-to-income ratio, rather than simply reporting "denied" with no reason given. **Transparency (AI)** is the broader degree to which an AI system's existence, purpose, and general method of operation are disclosed to the people affected by it or interacting with it, distinct from explaining any one specific decision. **Accountability (AI)** is the principle that a specific person or organization -- never the AI system itself -- remains responsible for an AI system's decisions and their consequences, ensuring there is always a human answer to "who is responsible for this outcome."

The table below reinforces this responsible-AI cluster now that each term has been defined individually.

| Concept | What it answers | Example failure without it |
|---|---|---|
| AI alignment | Does the system pursue what we actually intended? | Optimizing engagement produces outrage, not value |
| Explainability | Why did the system make this specific decision? | A denied loan applicant gets no usable reason |
| Transparency (AI) | Do affected people know this system exists and how it works? | A hiring algorithm operates without candidates' knowledge |
| Accountability (AI) | Who is responsible when it goes wrong? | An error gets blamed on "the algorithm" with no owner |

Formalizing all of this into standing organizational policy is its own discipline, echoing Chapter 18's data governance and Chapter 20's governance model in a new domain. **AI governance** is the system of policies, oversight roles, and decision rights an organization establishes to manage how it develops, deploys, and monitors AI systems responsibly -- who approves a new model's deployment, who audits it for bias, who owns the response when it fails. Because AI systems and their effects routinely cross national borders, some of this work now happens above any single organization or even any single country. **Global AI governance** is the emerging set of international norms, agreements, and coordinating institutions aimed at managing AI's risks and benefits across national boundaries, still far less mature than any single nation's own internal AI governance, since no comparable global body yet holds the authority a national regulator holds within its own borders.

!!! mascot-encourage "Nobody Has This Fully Solved Yet -- Including the Experts"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If AI alignment and global AI governance feel unsettled and unfinished compared to the tidier definitions earlier in this chapter, that's because they genuinely are unfinished -- these are active, unresolved areas of research and policy, not settled engineering practice like an algorithm's fixed steps. You're not missing something obvious; you're looking at the actual frontier.

## Key Takeaways

You can now explain how an AI model is trained and what can go wrong when it is deployed:

- An **algorithm** is a fixed sequence of steps; **artificial intelligence** is the broader field of human-like task performance; **machine learning** narrows that to systems that learn from a **data set**, specifically its **training data**, through **model training** to produce a **prediction model**.
- **Overfitting** and **model drift** are the two classic ways a trained model's accuracy fails to hold up in the real world.
- A **neural network** builds a prediction from layered weighted sums; a **large language model** is a neural network that predicts text one word at a time, powering **generative AI**, guided by **prompt engineering**, and vulnerable to **AI hallucination**; **reinforcement learning** trains a model from rewards instead of labeled examples.
- **Automation** and **autonomy** describe how independently a system acts; **human-in-the-loop** design and ongoing **human oversight** keep people involved regardless.
- **AI alignment**, **explainability**, **transparency (AI)**, and **accountability (AI)** make an AI system trustworthy in practice, formalized through **AI governance** and, increasingly, **global AI governance**.

!!! mascot-celebration "You Just Built the Entire AI Vocabulary This Book Needs"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From a simple long-division algorithm all the way to global AI governance, you now have the precise vocabulary to reason about any AI system you encounter -- what it actually is, how it learns, how it can fail, and who is responsible when it does. Next up: applying this vocabulary to the specific feedback loops that make AI systems speed up, compound advantage, and sometimes produce disparate outcomes.
