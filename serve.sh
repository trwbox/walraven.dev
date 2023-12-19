#!/bin/bash


unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    MSYS_NT*)   machine=Git;;
    *)          machine="UNKNOWN:${unameOut}"
esac

# If the machine is a Mac
if [ ${machine} == "Mac" ]; then
    # Check for lima and nerdctl
    if [ `which nerdctl.lima` ]; then
        # If there is no lima instance set, set it to website
        if [ -z "$LIMA_INSTANCE" ]; then
            export LIMA_INSTANCE=website
        fi

        # Check if the lima instance is running
        if [ `limactl list ${LIMA_INSTANCE} | awk 'NR==2 {print $2}' | grep "Stopped"` ]; then
            echo "Lima instance ${LIMA_INSTANCE} is not running, starting"
            limactl start ${LIMA_INSTANCE}
        else
            echo "Lima instance ${LIMA_INSTANCE} is running"
        fi
        echo "nerdctl.lima is installed"
        echo "Using lima with instance ${LIMA_INSTANCE}"
        nerdctl.lima compose up
    else
        echo "No runtime for MacOS found"
    fi
elif [ ${machine} == "Linux" ]; then
    # Check for docker and docker-compose
    if [ `which docker` ] && [ `which docker-compose` ]; then
        echo "Docker and docker-compose are installed"
        docker-compose up
    elif [ `which nerdctl` ]; then
        echo "nerdctl is installed"
        nerdctl compose up
    else
        echo "No runtime for Linux found"
    fi
else
    echo "No runtime found"
fi
