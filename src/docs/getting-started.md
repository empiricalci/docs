# Getting Started

Empirical provides a standard framework for experimentation 
that encapsulates each experiment and makes them portable. 
By adopting this framework you will be able to use our platform 
to run and keep track of your experiments

## Install the empirical package manager
The *empirical package manager* a.k.a. **emp** is a command line interface for running
experiments using the [Empirical Framework](/docs/framework).

## Dependencies
There are only 2 requirements:

- **Node.js** is a JavaScript runtime required to run  this program on your computer. 
Download and install Node.js <a target='_blank' href='https://nodejs.org/en/'>from here</a>. 
**Note:** Node.js v7 is not yet compatible.
- **Docker** allows us to create self-contained portable environments that work accross different platforms. 
Follow <a target='_blank' href='https://docs.docker.com/engine/installation/'>these instructions</a> to install Docker

## Install
**emp** is supported on Windows, Mac and Linux. You can install the tool using ``npm``. 
```
npm install -g empirical-cli
```

### Configure
Empirical uses a directory to cache all the datasets downloaded and to save any files 
generated during the tests or experiments. This defaults to ``~/empirical``. 
You can change this by doing:

```
emp configure
```

## Authenticate with the server
Authenticating with [empiricalci.com](https://empiricalci.com) allows you to save the results of your experiments
and share them with your peers.  
1. If you haven't done so, sign up for an account on [empiricalci.com](http://empiricalci.com)  
2. Login using the CLI: ``emp login`` will ask for your credentials and store them on your computer  

----

You're done setting up the *Empirical Package Manager*. Continue to 
the next section for a quick tutorial.

---
<a class='next-doc' href='/docs/tutorial'>Next: Tutorial</a>
