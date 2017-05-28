Very simple HN reader using lightning components and some third party API.


There is a URL change handler for each action that uses _fetch_() for client side calls.
Calls are cached automagically. _Comments_ use recursion to maintain indentation.


A nice side effect of using URLs is performance - you can use unbound expressions for your actions!




[Demo here](https://sjurgis.github.io/lightning-hacker-news/)