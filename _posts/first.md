{{{
  "title": "Introduction, and Using LINQPad with Simple.Data",
  "tags": ["simple.data", "linqpad", "devtools"],
  "category": "simple.data",
  "date": "2014-02-27",
  "preview": "The feature I'm really going to be focusing on here is it's ability to be used as a scratchpad of sorts, and dump out the results into a nice, navigable table..."
}}}

## What is Simple.Data?

Simple.Data is a great micro-orm-ish thing, similar in a lot of ways to dapper / petapoco / etc, but with just a little bit more feature rich (ability to create linq-like dynamic queries that resolve to POCOs easily being the killer for me)

It's generally a great DB access component for when you don't feel the need to use any of the heavier ORMs, and don't fancy writing a whole bunch of messy ADO style code.

One of the slight downers with it, is that there's no profiling tools (other than SQL Server Profiler) - and certainly nothing that lets you test out poke around with the results in an easy way.

## Using LINQPad with Simple.Data

LINQPad is another great tool that has nearly replaced SQL Server Management Studio in my day-to-day group of tools. If you're not familiar with it, I'd strongly recommend giving it a try (the basic non-intellisensed version of it is free.)

The feature I'm really going to be focusing on here is it's ability to be used as a scratchpad of sorts, and dump out the results into a nice, navigable table. 

A few screenshots of what to expect lie below:

<div class="blog-item-img">
<!-- BEGIN CAROUSEL -->            
	<div class="front-carousel">
		<div id="myCarousel" class="carousel slide">
			<div class="carousel-inner">
				<div class="item">
					<img src="/img/uploaded/ienumerablecastedobject.png" alt="object casted to your POCO type" />
				</div>
				<div class="active item">
					<img src="/img/uploaded/childofcastedimage.png" alt="Child of object casted to your POCO type" />
				</div>
				<div class="item">
					<img src="/img/uploaded/uncastedresult.png" alt="Dynamic result set" />
				</div>
				<div class="item">
					<img src="/img/uploaded/itemwithindynamicresult.png" alt="Item within dynamic result set" />
				</div>
				<div class="item">
					<img src="/img/uploaded/sqlforquery.png" alt="Sql query generated from Simple.Data command" />
				</div>
			</div>
			<!-- Carousel nav -->
			<a class="carousel-control left" href="#myCarousel" data-slide="prev">
				<i class="fa fa-angle-left"></i>
			</a>
			<a class="carousel-control right" href="#myCarousel" data-slide="next">
				<i class="fa fa-angle-right"></i>
			</a>
		</div>                
	</div>
</div>


### Prerequisities 

* LINQPad - http://www.linqpad.net/ (take note of where you've installed this - usually `C:\Program Files (x86)\LINQPad4`)
* simple.data - https://github.com/markrendle/Simple.Data

The rest of this explanation assumes you have LINQPad installed, and have the Simple.Data (coupled with an adapter of your choice) binaries in a known place. Make sure this is done.

If you are using the [Premium](http://www.linqpad.net/Purchase.aspx) version of LINQPad, you will be able to resolve the assemblies using NuGet, and will not need to have the Simple.Data binaries floating around.

### Installing

First up, I've created a trace-listener-interceptor, in order to push the SQL (or whatever DB type query) into the SQL window for LINQPad, a semi-formatted format. I've been really lazy with the formatting part of this, and just done a few bits to make it slightly more readable. Any contributions to this would be gratefully accepted. 

The code is available on [github](https://github.com/timbooker/Simple.Data.Linqpad.Tracelistener). 

You should clone + compile this, and [add it to your GAC](http://msdn.microsoft.com/en-us/library/dkkx7f79.aspx).

You will now need to set up this tracelistener with LINQPad. To do this, navigate to your LINQPad installation directory (e.g. `C:\Program File(x86)\LINQPad4\`), and create a new file - `linqpad.config`.

You should now paste the below in.

```xml
<configuration>
    <system.diagnostics>
	<sources>
	      <source name="Simple.Data">
        <listeners>
          <add name="Simple.Data"/>
        </listeners>
      </source>
	  </sources>
	<switches>
		<add name="Simple.Data" value="Verbose" />
	</switches>
	    <sharedListeners>
      <add name="Simple.Data"
        type="Simple.Data.Linqpad.Tracelistener.SqlTraceListener, Simple.Data.Linqpad.Tracelistener, Version=1.0.0.0, Culture=neutral, PublicKeyToken=568be0996a7cc8bf"
      />
    </sharedListeners>
    	<trace autoflush="true">
    		<listeners>
    			<add name="logListener" type="System.Diagnostics.TextWriterTraceListener" initializeData="cat.log" />
    			<add name="consoleListener" type="Simple.Data.Linqpad.Tracelistener.SqlTraceListener, Simple.Data.Linqpad.Tracelistener, Version=1.0.0.0, Culture=neutral, PublicKeyToken=568be0996a7cc8bf"/>
    		</listeners>
    	</trace>
    </system.diagnostics>
</configuration>
```


Next, you'll need to navigate to `C:\Users\username\Documents\LINQPad Queries` (this assumes Windows 7, but basically the place where your user docs are stored in your OS.) This is where the custom queries for LINQPad get saved. 

__Take note that you'll need to change the directories to whatever would be appropriate for your machine.__

__You should also note that in order to get the result as it would be if casted to as POCO in your machine, you will need to add a reference to the assembly on which the POCO definitions reside.__

#### If using Standard version
```xml
<Query Kind="Program">
  <Connection>
  </Connection>
  <Output>DataGrids</Output>
  <Reference>C:\location\for\your\entity\assembly\Data.dll</Reference>
  <GACReference>Simple.Data.Linqpad.Tracelistener, Version=1.0.0.0, Culture=neutral, PublicKeyToken=568be0996a7cc8bf</GACReference>
  <Reference>C:\location\for\Simple.Data</Reference>
  <Reference>C:\location\for\Simple.Data.Ado</Reference>
  <Reference>C:\location\forSimple.Data.SqlServer</Reference>
  <Namespace>Namespace.For.Your.Pocos</Namespace>
</Query>

void Main()
{
 	var db = Simple.Data.Database.OpenConnection("");

	var result = db.WebsiteVisits.Get(123);
	
	((object)result).Dump("Data Returned");
}
```

#### If using [Premium](http://www.linqpad.net/Purchase.aspx) 
```xml
<Query Kind="Program">
  <Connection>
  </Connection>
  <Output>DataGrids</Output>
  <Reference>C:\location\for\your\entity\assembly\Data.dll</Reference>
  <GACReference>Simple.Data.Linqpad.Tracelistener, Version=1.0.0.0, Culture=neutral, PublicKeyToken=568be0996a7cc8bf</GACReference>
  <NuGetReference>Simple.Data.Ado</NuGetReference>
  <NuGetReference>Simple.Data.SqlServer</NuGetReference>
  <Namespace>Namespace.For.Your.Pocos</Namespace>
</Query>

void Main()
{
 	var db = Simple.Data.Database.OpenConnection("");

	var result = db.WebsiteVisits.Get(123);
	
	((object)result).Dump("Data Returned");
}
```

Finally, you must enable the 'Always use Fresh Application Domains' setting within LINQPad. This is done by going to Edit => Preferences => Advanced.

It should look a little like this - 

![Preferences](http://i.imgur.com/EqgygNx.png "Preferences")

Restart LINQPad, and start querying off the db object!