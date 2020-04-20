FROM node:buster

ENV SHELL /bin/bash

USER root

#RUN apt-get update -y && apt-get install -y \
#gnupg2 \
#apt-transport-https \
#ca-certificates && \
RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://packages.cloud.google.com/apt cloud-sdk main" \
    | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Install Python dependencies from requirements.txt if it exists
#COPY .devcontainer/requirements.txt.temp requirements.txt* /workspace/
#RUN if [ -f "requirements.txt" ]; then pip install -r requirements.txt && rm requirements.txt; fi

RUN apt-get update -y && apt-get install -y \
    google-cloud-sdk \
    google-cloud-sdk-app-engine-python \
    google-cloud-sdk-app-engine-python-extras \
    google-cloud-sdk-cbt \
    google-cloud-sdk-cloud-build-local \
    google-cloud-sdk-bigtable-emulator \
    kubectl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
#rm /var/log/lastlog /var/log/faillog

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32 \
    && echo "deb http://archive.ubuntu.com/ubuntu bionic universe" | tee -a /etc/apt/sources.list \
    && apt-get update -y && apt-get install -y \
    fonts-firacode

#RUN pip install pylint autopep8

#RUN apt-get update -y && apt-get install -y \
#    systemd \
#    libxss1 && \
#    apt-get clean && \
#    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#ARG USERNAME=vscode
#ARG USER_UID=1010
#ARG USER_GID=1000

#RUN groupadd --gid $USER_GID $USERNAME \
#    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

#RUN useradd --uid $USER_UID --gid $USER_GID -m $USERNAME
#
#USER $USERNAME
#
#RUN mkdir -p /home/$USERNAME/.vscode-server /home/$USERNAME/.vscode-server-insiders \
#    && chown ${USER_UID}:${USER_GID} /home/$USERNAME/.vscode-server*

USER node

RUN mkdir -p ~/.vscode-server ~/.vscode-server-insiders \
    && chown node:node ~/.vscode-server*
