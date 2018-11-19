## Remaining Tasks
- Implement Dupe Checker
- Better styling around the people cards (and generally all over the page)
- Refactor code in the PeoplePage to contain less logic. It should be more of an orchestrator
- Don't let the user click go next after no data is pulled
- Fix performance:
  - Idea: Cache people info in a local DB. The site is suffering since every page needs to load from the API on every page.
  - Idea: People.all should iterate until it pulls all available people from the API. May be dangerous given synchronous nature of ruby. May not scale well.
