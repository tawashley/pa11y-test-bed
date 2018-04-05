var chalk = require('chalk');
var cliTruncate = require('cli-truncate');

function output(results) {
    results.forEach(singleUrlResults => {
        outputSingleUrlResults(singleUrlResults);
    });
}

function augementResultsData(pa11yResults) {
    var { issues } = pa11yResults;
    var issuesList = {}
    var numberOfIssues = {
        error: 0,
        warning: 0,
        notice: 0
    };

    issues.forEach(function(issue) {
        numberOfIssues[issue.type]++;

        if(issuesList[issue.code] === undefined) {
            issuesList[issue.code] = {count: 0, issues: []};
        }

        console.log(issue);

        issuesList[issue.code].issues.push({
            message: issue.message,
            context: issue.context,
            selector: issue.selector,
            type: issue.type
        })

        issuesList[issue.code].count = issuesList[issue.code].count + 1;
    })

    return {
        numberOfIssues,
        issuesList
    }
}

function outputSingleUrlResults(results) {
    var { numberOfIssues, issuesList } = augementResultsData(results);

    console.log('');
    console.log(chalk.underline(`Breakdown of Pa11y results for "${results.pageUrl}"`));
    console.log('');
    console.log(`Errors: ${chalk.underline(numberOfIssues.error)}`);
    console.log(`Warnings: ${chalk.underline(numberOfIssues.warning)}`);
    console.log(`Notices: ${chalk.underline(numberOfIssues.notice)}`);
    console.log('');

    for (var issueCode in issuesList) {
        console.log(chalk.bold.white.underline(issueCode));
        console.log(`${issuesList[issueCode].count} ${issuesList[issueCode].count > 1 ? "issues" : "issue" } found`)
        console.log('');

        issuesList[issueCode].issues.forEach(function(issue) {
            console.log(` · ${chalk.underline(issue.type.toUpperCase())}: ${chalk.bold(issue.message)}`);
            console.log('      ' + cliTruncate(issue.context.replace(/\n/g, ''), 80));
            console.log('      ' + chalk.dim(issue.selector));
            console.log('');
        });
    }
}

module.exports = {
    output
};
