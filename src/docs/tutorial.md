# Tutorial

In this section you will quickly replicate an experiment using the Empirical Framework. 
We assume you already setup [**emp**](/docs) on your computer and authenticated with the server.
<!--iframe width="640" height="360" src="https://www.youtube.com/embed/KChv8gCbhFg" frameborder="0" allowfullscreen></iframe>-->

We adapted a <a target=_blank href=https://github.com/mnielsen/neural-networks-and-deep-learning>popular tutorial</a> 
for building a Neural Network to the [Empirical Framework](/docs/framework). In this experiment we're training the neural net 
while simultaneously evaluating its accuracy. At the end of the training iterations we save
the final accuracy and display it.

## Replicate an experiment
You can replicate the whole experiment in one single command:

```
emp run empirical/mnist-sample/x/Hke43sz5e
```

This will clone the source code from GitHub, checkout the appropriate version, 
build the experiment's Docker image, download the required datasets, 
run the experiment as a Docker container, and save the results on your computer. 

**All in one single command**.

In this case the experiment consists of training a neural network on the MNIST dataset
for 10 epochs of training.

## Modify the experiment
Now let's try modifying the code and run another experiment locally. 
The code was save to a temp directory that you'll find in the logs.
Let's change the algorithm to run 3 epochs instead of 10. 

Inside the code directory, open ``main.py`` and you'll notice line ``4`` 
reads  
```epochs = 10```

Change this line to read  
```epochs = 3```

Save your changes to ``main.py`` and push your project to a new GitHub repository.

## Run your experiment from GitHub
Now you can run your experiments directly from your new GitHub repository:
```
emp run mnist https://github.com/<your-username>/<your-repo>
```

This should've run 3 epochs of training instead of 10, which you should 
see reflected in the logs.

## Save your results
You have successfully replicated an experiment and ran your own modified version. 
Now it's time to save the results of your experiments. 

While running your experiment ``emp`` saved a report of your experiment along with the logs and
any results generated to a directory called Workspace. You can see in the logs, the last line should 
say something like:
```
 Workspace saved to /home/my-username/empirical/workspaces/mnist-B1CNiyWKe

```
If you look into that directory you should see something like:
```
$ ls -l /home/my-username/empirical/workspaces/mnist-B1CNiyWKe
-rw-r--r-- 1 root        root           162 Feb 27 23:58 accuracy.json
-rw-rw-r-- 1 my-username my-username   2406 Feb 27 23:58 experiment.log
-rw-rw-r-- 1 my-username my-username    644 Feb 27 23:58 experiment.report.yml
-rw-r--r-- 1 root        root        502821 Feb 27 23:58 network.json
-rw-r--r-- 1 root        root            39 Feb 27 23:58 overall.json
```

### Push your results
**NOTE:** You need to be [authenticated](/docs#authenticate-with-the-server) to save your results.

You can now push those results to the cloud where you can visualize them on the dashboard and share them 
with your peers:
```
$ emp push -f /home/my-username/empirical/workspaces/mnist-B1CNiyWKe my-username/mnist-sample
PUSH:
Created new project: my-username/mnist-sample
Created experiment.
Uploaded 4 artifacts.
See your experiment at http://empiricalci.com/my-username/mnist-sample/x/SXs4_33-
```

---

You have successfully:
- replicated an experiment
- modified the replicated code 
- ran an experiment on the modified version
- Saved its results back to [empiricalci.com](/)

Now learn how to use the framework to create your own experiments in the next section.

----

<a class='next-doc' href='/docs/framework'>Next: Framework</a>
