#!/usr/bin/env bash
BRANCH=builds
TARGET_REPO=mwitte/EmberChat.git
DIST_FOLDER=dist
CLONE_FOLDER=builds

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo -e "Starting to deploy to Github Pages\n"
    if [ "$TRAVIS" == "true" ]; then
        git config --global user.email "travis@travis-ci.org"
        git config --global user.name "Travis"
    fi

    echo -e "Cloning $TARGET_REPO with branch $BRANCH\n"
    git clone --quiet --branch=$BRANCH https://${GH_TOKEN}@github.com/$TARGET_REPO $CLONE_FOLDER > /dev/null

    # go into clone folder
    cd $CLONE_FOLDER

    # remove all files/dirs except some
    ls -1|egrep -v "(.git|Readme.md)"|xargs rm -rf

    echo -e "Add $DIST_FOLDER\n"
    rsync -rv --exclude=.git  ../$DIST_FOLDER/* .
    echo -e "Add, commit and push files\n"

    git add -A
    git commit -a -m "Travis build $TRAVIS_BUILD_NUMBER pushed to Github [ci skip]"
    git push -fq origin $BRANCH > /dev/null
    echo -e "Deployment completed\n"
fi