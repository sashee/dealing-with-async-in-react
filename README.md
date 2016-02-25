# Dealing with async in React

This is a demonstration repo for a blog post.

Dealing with long running asynchronous tasks in React is a challenge. While the framework does not impose any restrictions
on setting state on a different cycle, you might easily encounter timing errors.

## Using a process that does not rely on props

* [Error live demo](http://sashee.github.io/dealing-with-async-in-react/dist/BasicError.html)
* [Solution live demo](http://sashee.github.io/dealing-with-async-in-react/dist/BasicErrorSolution.html)

This is an easy case. For a long running operation, you can not rely on the component is still mounted. For example
the user might already navigated away.

## Using a process that relies on props

* [Error live demo](http://sashee.github.io/dealing-with-async-in-react/dist/PropsError.html)
* [A slightly improved version live demo](http://sashee.github.io/dealing-with-async-in-react/dist/PropsErrorCheck.html)
* [Solution live demo](http://sashee.github.io/dealing-with-async-in-react/dist/PropsErrorTimestamp.html)
* ["A hack" live demo](http://sashee.github.io/dealing-with-async-in-react/dist/PropHack.html)

If the long running operation does rely on the props, it is tougher. The first instinct is to check whether the
value in the props is the same as that was when the operation started (second link). Unfortunately it is not enough.
If the user changed the props back and forth, then there will be multiple successful modifications.

The solution is to store a timestamp when the operation started and check that. That is guaranteed to be different,
no matter the user changed the value multiple times.

For a hacky solution, if you set the component's key, then it will be a different component, and you only need
to check the mountedness. The drawback (and that's why you shouldn't use it) is it is set at the parent component
and not at the child; if you forget it at even one occasion, it will blow your app. Use the proper solution instead.
