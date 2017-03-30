# Framework

The Empirical Framework is designed to make it easier to develop and replicate
computational scientific research. This is achieved by requiring users to
use a **protocol** where the experiments must be
implemented as [Docker Images](https://docs.docker.com/engine/tutorials/dockerimages/).
These images contain the whole research environment including code, OS and dependencies. 
The **protocol** also defines **datasets** that are consumed by the experiment and **results** as the output of the experiments.
Implementing experiments with these **protocols** means they are completely self-contained and portable 
which makes them easy to share and execute without any time spent on setup.

## Objectives
The Empirical Framework is designed to improve separation of concerns when developing and running your experiments.
- Separate the datasets from your experiments by providing a standard mechanism to download and cache your data
- Encapsulate the research environment by Dockerizing your project and running it as a container
- Persist your experiment artifacts and results
- Visualize and compare your results across different versions

## Architecture
The architecture of the framework can be seen in the following diagram:

![image](/images/standalone-arch.png)

Your research code lives inside a container with your whole research environment, specified by a Docker image.  
The container has access to 2 folders from the host computer 
that are are mounted on the container as volumes named ``/data`` and ``/workspace``. 
The ``/data`` volume is a read-only directory where you'll find any datasets that you defined.
The ``/workspace`` volume is a read-write directory where you can persist any output artifacts that your
experiment produces.  
The framework also allows you to send your results to the Empirical platform where they can be visualized
and compared. 

## Adopting the framework
For your project to be compatible with the Empirical Framework,
you need to make the following adjustments:
1. Define your protocols: Create a ``empirical.yml``
2. Define your environment: Create a ``Dockerfile``
3. Separate your data: Provide the resources URLs in the ``dataset`` section
4. Save your outputs and overall results: Save output to ``/workspace`` 

These steps are explained below.

## Define your protocols
The first step is to define the **protocols** that are going to be followed by your experiments.
You do this by creating an ``empirical.yml`` file at the root directory of your project.
This is the file that the [emp](/docs) reads to build and run your experiments.
In this file you name your **protocols** and define the instructions to build your environment
as a Docker image and download and cache your datasets.
The file has the following format:
```yml
protocols:
  my-protocol:
    environment:
      build: .
    dataset:
      myfile.csv:
        url: "https://example.com/myfile.csv"
        hash: "34dacd938383839202002ach029323"
```

The top node in the yml file is always ``protocols``, you can list multiple protocols under that node.
In this case ``my-protocol`` is the name of your protocol.  
Each protocol must define an``environment`` and optionally a ``dataset``.

The ``environment`` must have a ``build`` parameter which defines the path to the 
<a href=https://docs.docker.com/engine/reference/commandline/build/#/build-with-path target=_blank>build context</a>.
It can optionally provide a ``dockerfile`` parameter pointing to the [Dockerfile](#encapsulate-your-environment) 
if it's not located in the root directory or if it has a different file name than the standard "Dockerfile".  

The optional ``dataset`` parameter contains the URLs of the data files required by the experiment
as well as a checksum hash used for validating the download and cache the data.
See the ["Separate your data"](#separate-your-data) section for information on how to define your ``dataset``. 

## Encapsulate your environment
Your environment is defined by a [Docker Image](https://docs.docker.com/engine/tutorials/dockerimages/), 
this allows you to package your application with all of its dependencies into  a container that can be used anywhere. 
You can define a Docker image by creating a ``Dockerfile`` which contains 3 main things:
1. Provide a base image and install the dependencies necessary for your project to run
2. Add your code into the image. 
3. Define an entrypoint to the image. This is the command that runs your experiments.

A sample ``Dockerfile`` would look like this:
```Dockerfile
# Provide a base image
FROM python:2.7
# Install your dependencies
RUN pip install numpy
# Add your research code
COPY . /code
# Set the command to run your experiment
ENTRYPOINT ["python", "/code/main.py"]
```

You can learn more about how to create a Dockerfile [here](https://docs.docker.com/engine/reference/builder/).

## Separate your data
When you're using any datasets or files to run your experiments,
it's a good practice to always have data and code separate.
The ``dataset`` is defined by providing a set of resources required
to run your experiments. For each file or directory you need to provide an name or ``key``
and under the ``key`` node provide a download URL (``url``)
and a checksum (``hash``) to validate and cache the download on your system. 

The ``key`` that you give to your resources is important as this is going to be used
to create the path where they're going to be available to the experiment container.
In the example below these files will be available to the container at ``/data/answers.csv``
and ``/data/data.csv`` respectively.

```yml
dataset:
  answers.csv: 
    url:  https://raw.githubusercontent.com/empiricalci/fixtures/master/answers.csv
    hash: 3d7219dab4803e82ad97ece9a49fc25c6fd3762a369236d131cb729f32946ff2
  data.csv: 
    url:  https://raw.githubusercontent.com/empiricalci/fixtures/master/data.csv
    hash: 75821d9915567987edd0ff3271e276c922218c638e05efb2955a32c4526abdd9
```
The ``hash`` argument can be omitted, however it's not recommended since without it your data cannot be **validated**
or **cached**. This means that the resources will be downloaded every time the experiment is run.
See the [data section](/docs/data) to learn how to obtain the checksum ``hash``.

## Save your results

### Artifacts
You can persists any output generated by your experiments by saving the files to the ``/workspace`` directory
within your container. 

### Results
You can also define results to be visualized directly on the web dashboard.
This works by parsing specific files you define on your protocol under the results section:
```yaml
protocols:
  my-protocol:
    ...
    results:
      my-result:
        type: table
        ...
```
Depending on the result type, the data you need to specify might be different.
Currently we support only tables, but soon we'll add different graph types.

#### Table
In order to generate a table. You need to specify a result with ``type: table`` 
and a ``data`` property pointing to its content. It should look something like this:

```yaml
  results:
    acc-table:
      type: table
      title: Training accuracy
      data: training.json
```
Where ``training.json`` is a json file saved in to your ``/workspace`` containing
the table data in an array, where each item of the array is a row,
and each row is also an array with the values of each cell.
Note that all rows should have the same number of cells.
```json
 [
   ['Epoch', 'Accuracy'],
   [0, 8.9864],
   ....
   [9, 9.3368]
 ]
```

Whenever you push the experiment to the server, this result will be visible directly
in the dashboard:

![image](https://cdn-images-1.medium.com/max/800/1*cGhL8lttgCLuIvXtxPk8DQ.png)

### Overall
Finally, empirical allows you to provide an overall metric to show the performance of your experiments.
You do this by saving a special file at ``/workspace/overall.json``.
The format of this file is the following:

```json
{
  metric: 'Accuracy',
  value: 0.93408
}
```
This will be show in the online dashboard like this:

![image](https://cloud.githubusercontent.com/assets/689720/23242927/84400074-f930-11e6-8ffd-884747275b18.png)

## Run
Once everything is setup you can run your experiment using [**emp**](https://github.com/empiricalci/emp):
```
 emp run <my-protocol> </path/to/code>
```

This will do the following:
1. Build the Docker Image that has your environment and code
2. Download your datasets
3. Execute your experiment as a Docker container
4. Save the results of the experiments into a unique folder

## Push
You can then push your results to the web dashboard.
The web dashboard allows you to easily visualize your results
and share them with your peers so they can replicate your experiment.

```
 emp push -f /path/to/experiment-directory username/project-name
```

