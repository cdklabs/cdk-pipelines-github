# Configuring a GitHub Action Role for GitHub Workflows

There are two ways to authenticate to AWS in your GitHub Workflow:

  - [Configuring an OpenID Connect Role](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) (recommended)
  - Long-lived AWS Credentials stored as GitHub Secrets.

This document details how to manually set up the OpenID Connect Role (called the
GitHub Action Role). Furthermore, if you are reading this, you have decided not 
to utilize the
[`GithubActionRole`](https://github.com/cdklabs/cdk-pipelines-github/blob/main/README.md#githubactionrole-construct)
construct that this library provides. 

## Manually set up the GitHub Action Role

* Step 1: Add the Identity Provider to AWS and set up a Role Trust Policy

  The IAM role you provide must reference the GitHub OIDC identity
  provider as a trusted entity. You must also set up a trust relationship between
  the IAM role and your GitHub repository. For a step-by-step tutorial on how to
  set this up, see
  [Configuring OpenID Connect in AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services).

* Step 2: Configure the Role's Permissions

  In addition to setting up a relationship between GitHub and AWS, the IAM role 
  must also have permissions to assume CDK bootstrapped IAM roles and permissions 
  to access ECR repositories (if you plan on referencing Docker assets in your 
  workflow).

  Here is a minimum set of permissions for the IAM role: 

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Condition": {
          "ForAnyValue:StringEquals": {
            "iam:ResourceTag/aws-cdk:bootstrap-role": [
              "deploy",
              "lookup",
              "file-publishing",
              "image-publishing"
            ]
          }
        },
        "Action": "sts:AssumeRole",
        "Resource": "*",
        "Effect": "Allow"
      },
      {
        "Action": "ecr:GetAuthorizationToken",
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }
  ```

* Step 3: Send your Role's arn to your GitHub Workflow

  You now have a role with the necessary permissions to allow GitHub Actions
  to assume the role and execute CloudFormation deployments on your behalf. What's
  left is to send that role's arn into your GitHub Workflow, so it knows to use it:

  ```ts
  import { App } from 'aws-cdk-lib';
  import { ShellStep } from 'aws-cdk-lib/pipelines';
  import { GithubWorkflow } from 'cdk-pipelines-github';

  const app = new App();

  const pipeline = new GithubWorkflow(app, 'Pipeline', {
    synth: new ShellStep('Build', {
      commands: [
        'yarn install',
        'yarn build',
      ],
    }),
    githubActionRoleArn: '// your role arn here',
  });
  ```