# Archetypes

In software engineering we use the concept of design patterns to create a name of a recurring solution to problems.  In Systems Thinking we use the term [archetype](glossary.md#archetype) to describe a ideal example that illustrates a systems thinking concept.

If you would like to contribute a new Archetype please do the following:

1. Check to see if we don't already have it in our list
2. Write up a short description and add it to our [issues](https://github.com/dmccreary/systems-thinking/issues) list.  If you have a [Causal Loop Diagram](https://en.wikipedia.org/wiki/Causal_loop_diagram) for your new archetype please leave a link to the drawing.
3. We will assign an editor to add your diagram to our master list of archetypes.

Note our use of [Creative Commons Attribution NonCommercial ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) for all content on this web site.

This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.



#### Network Effect


#### Tragedy of the Commons
A situation in economic science when individual users, who have open access to a resource unhampered by shared social structures or formal rules that govern access and use, act independently according to their own self-interest and, contrary to the common good of all users, cause depletion of the resource through their uncoordinated actions.

The term is derived from an 1833 story by the English economist William Forster Lloyd in which cattle herders share a common parcel of land. They originally used a social convention where the cows graze.  This was the custom in English villages at the time.  One one or more farmers break the convention the common land becomes over used, the grass dies, and it is no longer useful to anyone in the village.

In graph systems thinking (GST) we think of commons as a central area that each business unit puts shared information about shared customers.  If business units only want to read data but not publish their data there is no clear integrated view of a customer.  Social convention requires each business unit to share their data in a central knowledge graph.

We summarize this archetype as "the more it is used, the less value it has".

* [Wikipedia page on Tragedy of the Commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons)
* Also known as: TotC

#### The Slow Peak Hours Server
This is a variation of the [Tragedy of the Commons](#tragedy-of-the-commons) where a central server becomes slower the mote it is used.  During peak hours, when there are most users using the server, the response time is slower.  This discourages teams from using shared data in decision making dashboards that need to render in real-time.

