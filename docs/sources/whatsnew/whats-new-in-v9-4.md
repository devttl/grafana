---
aliases:
  - /docs/grafana/latest/guides/whats-new-in-v9-4/
description: Feature and improvement highlights for Grafana v9.4
keywords:
  - grafana
  - new
  - documentation
  - '9.4'
  - release notes
title: What's new in Grafana v9.4
weight: -33
---

# What’s new in Grafana v9.4

Welcome to Grafana 9.4! Read on to learn about [add short list of what's included in this release]. For even more detail about all the changes in this release, refer to the [changelog](https://github.com/grafana/grafana/blob/master/CHANGELOG.md).

## Feature

[Generally available | Available in experimental/beta] in Grafana [Open Source, Enterprise, Cloud Free, Cloud Pro, Cloud Advanced]

Description. Include an overview of the feature and problem it solves, and where to learn more (like a link to the docs).

> **Note:** You must use relative references when linking to docs within the Grafana repo. Please do not use absolute URLs. For more information about relrefs, refer to [Links and references](/docs/writers-toolkit/writing-guide/references/).

## Alert email templating

We've improved the design and functionality of email templates to make template creation much easier and more customizable. The email template framework utilizes MJML to define and compile the final email HTML output. Sprig functions in the email templates provide more customizable template functions.

{{< figure src="/static/img/docs/alerting/alert-templates-whats-new-v9.3.png" max-width="750px" caption="Email template redesign" >}}

## Log details redesign

The details section of a log line has been updated. Previously some of the interactions, such as filtering, showing statistics or toggling the visibility were split across "Labels" and "Detected fields". With the recent changes those two sections were unified into one and the interactions are available for all fields.

{{< figure src="/static/img/logs/log-details-whats-new-9-4.png" max-width="750px" caption="Log details redesign with interactions" >}}

## Service account expiration dates

We have included a new configuration option, disabled by default. This will allow us to require an expiration date limit for all newly created service account tokens.

This will not affect existing tokens, however newly created tokens will require an expiration date that doesn't exceed the configuration option `token_expiration_day_limit`.

## OAuth providers setting for skip org role sync

Grafana integrates with different auth providers and have a demand for specific providers to skip syncronization for their organization roles. This option is now available for user who want to be able to manage their org roles from Grafana itself.

This option allows you to skip syncronization from your configured OAuth provider specifically in the auth provider section under `skip_org_role_sync`. Previously users could only do this for certain providers using the `oauth_skip_org_role_sync_update` option, but this would include all of the configured providers.

## RBAC support for Grafana OnCall plugin

We're rolling out RBAC support to Grafana plugins, with Grafana OnCall being the first plugin to fully support RBAC.
Previously Grafana OnCall relied on the Grafana basic roles (eg. Viewer, Editor, and Admin) for authorization within
the plugin.

Before RBAC support in Grafana OnCall, it was only possible to allow your organization's users to either view everything,
edit everything, or be an admin (which allowed edit access plus a few additional behaviours). With this new functionality,
organizations will be able to harness fine-grained access control within Grafana OnCall.

For example, you could assign a user in your organization, whom has the Viewer basic role (note that a user must still
have a basic role assigned) the new Grafana OnCall RBAC role of "Schedules Editor". This would allow the user to view
everything in Grafana OnCall, and also allow them to edit OnCall Schedules

## SAML auto login

We've added auto-login support for SAML authentication, which you can turn on with the `auto_login` configuration option. We also
have a unified configuration style among all authentication providers. Instead of using
`oauth_auto_login`, use the new `auto_login` option to enable automatic login for specific OAuth providers.

## Loki datasource query validation

We added support to validate queries and visually display errors as a query is being written, without having to execute it to receive this feedback. This feature supports single and multi-line queries, with and without variables.

{{< figure src="/media/docs/grafana/logs-loki-query-validation-whats-new-9-4.png" max-width="750px" caption="Loki query validation" >}}

## Loki logs sample in Explore

For Loki metric queries in Explore, you are now able to see the sample of log lines that contributed to the displayed results. To see these logs, click on the collapsed "Logs sample" panel under your graph or table panel. If you would like to interact with your log lines or modify the log query, click on the "Open logs in split view" button and the log query will be executed in the split view.

{{< figure src="/media/docs/grafana/logs-sample-whats-new-9-4.png" max-width="750px" caption="Logs sample in Explore" >}}

## New data source connection page in Dashboards and Explore

When you start your journey to create a dashboard or explore your data, but you don't have a data source connected yet, you’ll be shown a page that tells you this and guides you to set up a first connection.

Administrators can choose between selecting one of the most popular data sources or viewing the full list of them. Editors are guided to contact their administrator to configure data sources. In both cases, there's also an option to continue without setting up a data source and to use sample data instead.

This is currently a beta feature that can be accessed by enabling the `datasourceOnboarding` feature toggle.

{{< figure src="/media/docs/grafana/screenshot-datasource-connection-onboarding-whats-new-9-4.png" max-width="750px" caption="Admin view of data source connection page on dashboard creation" >}}

## Command palette enhancements

The command palette has been updated to provide a more efficient way to navigate Grafana. Now you can search and access all pages as well as recent dashboards, making it easier to perform tasks without taking your hands off the keyboard.

Use the keyboard shortcut cmd + K on Mac or ctrl + K on Linux/Windows to launch the command palette.

Read more about using the command palette [in the documentation.](https://grafana.com/docs/grafana/latest/search/)

{{< figure src="/static/img/docs/navigation/command-palette-9-4.gif" max-width="750px" caption="Grafana command palette" >}}

## Nav navigation

Early access on Grafana Cloud

Grafana’s navigation has been reorganized to make it easier for you to access the data you need. With this update, you'll be able to quickly navigate between features, giving you full visibility into the health of your systems.

The new navigation is being gradually rolled out to users on Grafana Cloud.

_Note:_ The Grafana documentation has not yet been updated to reflect changes to the navigation.

{{< figure src="/static/img/docs/navigation/navigation-9-4.png" max-width="750px" caption="Grafana new navigation" >}}

## Auditing and Usage Insights: Support for Loki multi-tenancy

*This feature is available for Enterprise customers*
This feature adds support to push analytics events and auditing logs to Loki with multi-tenancy mode, by specifying a tenant id. 

## Reporting: Enable changing the report scale factor

*This feature is available for Enterprise customers*
Scale factor is a new feature for reports that allows users to change the dimension of the panels of the PDF document. It allows you to show more columns in the tables zooming out or show panels bigger zooming in.
You can modify the scale factor for each report in the report editor and/or when you share the whole PDF directly from the dashboard page.

{{< figure src="/media/docs/grafana/FormatReportScheduler9.4.png" max-width="750px" caption="Scale factor feature in Report format page" >}}

{{< figure src="/media/docs/grafana/FormatReportShare9.4.png" max-width="750px" caption="Scale factor feature in Share functionality" >}}