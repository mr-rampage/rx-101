# Reactive Extensions

A library that provides a way of performing asynchronous operations on event streams and data streams.

# Code of today demands
- Reactive
- Parallelisable
- Composable

# Use cases
  - Asychronous & event based computation (UI)
  - Consume asynchronous data (Web sockets, web workers)
  - Reduce blocking on web services (Micro-services)
  - Concurrent programming (web workers)

# Use Cases & Comparisons
https://memegenerator.net/instance/63888879

- Callbacks
  - No composition
  - Leads to callback hell

- Futures (Promises)
  - Composable with $q.all, but beyond 1 level of compositions things can get ugly

# History #
- Part of Microsoft .Net and open sourced in 2012
- Netflix ported it to Java
- Cross-platform
  - Java, Scala, C#, C++, Clojure, JavaScript, Python, JRuby, Android, Swift, and more

# Who uses it
- Java 9(http://reactive-streams.org)
- Javascript - currently in stage 1 as es-observables (es7, es8?)
- Netflix
- Angular 2
- Couchbase
- Github

# Comparable Libraries
- Akka
- Spring Reactor

- Bacon.js
- Kefir.js

## Support
- Java 6 for RxJava
- IE6 for RxJS

# How does it work?
- Quick demo on Rx Marbles

- Create an event stream or data stream
- Compose and transform streams with operators
- Subscribe to any stream to perform side effects

## Simple API

- Observables + Observers

- Observable
  - subscribe(Observer)

- Observer - 3 methods
  - onNext(T data)
  - onCompleted()
  - onError(Throwable t)

# Simple example of a Username component
  - Username must be between 3 and 32 characters long
  - Username must be alphanumeric
  - Username must not be taken
  - Username must not be offensive
  - Username must not exist in more than 5 data breaches
  - Username component must respond within 1 second

# Step 1: Create the observable
  - Everything can be a stream

  - Convert your DOM element into a stream of usernames

# Step 2: Apply any operators
  - Create an Availability stream from the username stream

  - Apply simple checks to avoid unnecessary REST calls
  - Debounce complex checks

  - Combine these streams to provide a final result

# Step 3: Subscribe to the observable
  - Create an observer that reacts to the stream

  - When username is unavailable do a side effect

# Step 1: Create a service
  - Create a service that returns an Observable

  - All services should return an Observable as a result

# Step 2: Apply any operators
  - Create a new observable from existing streams

  - Apply simple checks to avoid unnecessary REST calls
  - Combine complex checks to provide a final result

# Step 3: Subscribe to the observable
  - Controller reacts to the stream

  - Provide a deferredResult upon subscription

# Challenges
  - Thinking in Reactive takes time - letting go of imperative and stateful habits
    - All JS code used constants
  - Testing asynchornous code can be tricky 
    - Inject the Rx.TestScheduler to control the clock
    - Use Mockito & Rx.Observable.just to control streams & subscribe to streams to perform assertions
  - Observers should implement onError. Errors not handled will be tricky to trace when streams are combined.

# Useful starting points
- Intro to Reactive Programming(https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- Mastering observables(http://docs.couchbase.com/developer/java-2.0/observables.html)
- Saipent Evaluation of Rx(https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjb87XotJfNAhVD34MKHSc6BQwQFggdMAA&url=http%3A%2F%2Fwww.sapient.com%2Fcontent%2Fdam%2Fsapient%2Fsapientglobalmarkets%2Fpdf%2Fthought-leadership%2Freactive_extensions.pdf&usg=AFQjCNEDKK_1gqzkmzxRu9TUDYgUXzlDGQ&bvm=bv.124088155,d.amc)

- Practical RxJava Workshop(https://github.com/simonbasle/practicalRx)
- Practical RxJava presentation(https://spring.io/blog/2016/01/04/springone2gx-2015-replay-introducing-rxjava-into-a-spring-boot-rest-api)

- Bacon.js Tutorial(http://nullzzz.blogspot.ca/2012/11/baconjs-tutorial-part-i-hacking-with.html)

- RxJs + ES6 Workshop(https://github.com/channikhabra/yarr)

- Reactive Manifesto(http://reactivemanifesto.org)
- RxMarbles(http://rxmarbles.com/)
