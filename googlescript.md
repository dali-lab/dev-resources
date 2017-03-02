# DALI's Google Apps Script
Author: Pat Xu

At the start of each term we onboard anywhere from a few to a few dozen people. I wrote a Google Apps Script to help speed up this process. Read on to learn how to use the Script

Developers, go [here](./googlescript-dev.md).

We use [this](https://docs.google.com/a/dali.dartmouth.edu/forms/d/e/1FAIpQLScVCWzrwjg4vfyTpvM162d9ZMy2zxUMY-GSuAxpTWBmdo_m8w/viewform) Google Form to get new member information.

## Creating Emails
- [this script](https://docs.google.com/a/dali.dartmouth.edu/forms/d/e/1FAIpQLSfMvbnWtDLdKTxKyPDRRnpkc29yn_YbY8iYDqibNuVxzwfJZA/viewform) pulls responses from the Member Personnel Form and does a few things:
  1. parses for their first and last name
  1. makes a new email `[first].[last]@dali.dartmouth.edu`
  1. creates an email with password "welcometodali"
  1. adds the email to a group called `[term]@dali.dartmouth.edu`
- a couple things to note:
  - the Script pulls **all** responses from the Form. maybe this behavior needs to be changed, or maybe we should just make a new form each term.
  - the Script pulls the current term from the [DALI Lab Hours](https://docs.google.com/spreadsheets/d/1thFB3xyX5wVN9gdz_K0pk3fUjwLxXIWyJ_rlK7A4TYg/edit#gid=188556850) spreadsheet
