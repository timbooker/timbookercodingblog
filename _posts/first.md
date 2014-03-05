{{{
  "title": "Introduction, and Using LinqPad with Simple.Data",
  "tags": ["simple.data", "linqpad", "devtools"],
  "category": "simple.data",
  "date": "2014-02-27"
}}}

Blog!
--- 

Put simply, I've been planning on getting started with blogging for a while. I occasionally come up with things that would be useful to more people than just me, generally get half a blog post written up, and leave it there. It's been this way for several years - and it's time for that to change. 

With that, let's get started with something sort-of-useful.

What is Simple.Data?
---

Simple.Data is a great micro-orm-ish thing, similar in a lot of ways to dapper / petapoco / etc, but with just a little bit more feature rich (ability to create linq-like dynamic queries that resolve to POCOs easily being the killer for me)

It's generally a great DB access component for when you don't feel the need to use any of the heavier ORMs, and don't fancy writing a whole bunch of messy ADO style code.

Using LinqPad with Simple.Data
---

LinqPad is another great tool that has nearly replaced SQL Server Management Studio in my day-to-day group of tools. If you're not familiar with it, I'd strongly recommend giving it a try (the basic non-intellisensed version of it is free.)

The feature I'm really going to be focusing on here is it's ability to be used as a scratchpad of sorts, and dump out the results into a nice, navigable table. 

Prerequisities 
====

* linqpad - http://www.linqpad.net/ 
* simple.data - https://github.com/markrendle/Simple.Data



