# Guide to setting up DALI repos

## Problems this attempts to solve
- Current DALI developers do not understand developer best practices, this guide will be part of the process of building up these skills

### If devs have not read these guides, read immediately before working on a repo:

* [Dev resources (iTerm, atom) - if you have a white terminal you better read this](https://github.com/dali-lab/dev-resources)
* [Git - if you are asking what git add does, you should drop what you're doing and go through this](https://github.com/dali-lab/gitivity)

### Basic features we want to add to each repo (This should be done by the Core DEV on the team):

 * [Protected Branch on Master](https://help.github.com/articles/defining-the-mergeability-of-pull-requests/) - Disables force-pushes to this branch and prevents it from being deleted.
	* Enabling required reviews for pull requests (this can be up for discussion, but the dev III / core devs on the team should be doing these)
	* Enabling required status checks (this should be turned on for teams with tests setup)
		* Guide to setting up Travis CI (https://github.com/dali-lab/dev-resources/blob/master/travis.md) 
 * Forcement of code additions through pull requests and not pushing straight to master 
 	* Ask devs to add this to their `.git/hooks`: [prevent pushing to master pre-push hook](https://gist.github.com/jason-feng/ae866a63f088cd4a03ef7a14136c6c6a) and [lint pre-push hook](https://gist.github.com/jason-feng/5ec9d86718440f80ade96eec8fc67d0c) 
 * It would definitely be nice to setup tests for each repo, but many DALI projects are probably not at this level


###### Footnote
By no means is this an absolute guide. This is V1.0 and will need continuous tweaking, please add suggestions through PRs.

###### Stuff used to make this:
 * [markdown-editor](https://jbt.github.io/markdown-editort) for Markdown editing
