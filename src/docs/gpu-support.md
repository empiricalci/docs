
# GPU Support

GPU support is provided for Linux via 
[nvidia-docker](https://github.com/NVIDIA/nvidia-docker).
Follow the instructions on the ["Quick start"](https://github.com/NVIDIA/nvidia-docker#quick-start) to install it.

**Note:** Currently Windows and MacOS are not supported since they
rely on VMs to run Docker. See [this issue](https://github.com/NVIDIA/nvidia-docker/issues/101) for more information.

## Run experiments with GPU support
In order to run an experiment that relies on GPU, 
your Docker image should be based on one of the images provided by Nvidia.
You can find a list of available images [here](https://github.com/NVIDIA/nvidia-docker/wiki/List-of-available-images).

Also, you should add ``gpu_enabled: true`` atrribute under your protocol's ``environment`` section.

### Example
Here's how a ``Dockerfile`` and ``empirical.yml`` look for a simple test that just prints out
the output of ``nvidia-smi``

#### Dockerfile
```
FROM nvidia/cuda:7.5-devel
```

#### empirical.yml
```
protocols:
  nvidia-test:
    environment:
      build: .
      gpu_enabled: true
      entrypoint: nvidia-smi
```
