import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { GithubOidc } from '../src';

describe('github oidc provider', () => {
  test('basic configuration', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new GithubOidc(stack, 'MyProvider', {
      username: 'myuser',
      repository: 'myrepo',
    });

    // THEN
    // has custom resource that creates provider
    Template.fromStack(stack).resourceCountIs('Custom::AWSCDKOpenIdConnectProvider', 1);


    // has iam role
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'token.actions.githubusercontent.com:sub': 'repo:myuser/myrepo:ref:refs/heads/main',
              },
            },
            Principal: {
              Federated: {
                Ref: 'MyProvidergithuboidc418E600D',
              },
            },
          },
        ],
      },
    });
  });

  test('provided provider', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new GithubOidc(stack, 'MyProvider', {
      username: 'myuser',
      repository: 'myrepo',
      provider: iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
        stack,
        'open-id',
        'arn:aws:iam::000000000000:oidc-provider/token.actions.githubusercontent.com',
      ),
    });

    // THEN
    // no custom resource created
    Template.fromStack(stack).resourceCountIs('Custom::AWSCDKOpenIdConnectProvider', 0);

    // has iam role
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'token.actions.githubusercontent.com:sub': 'repo:myuser/myrepo:ref:refs/heads/main',
              },
            },
            Principal: {
              Federated: 'arn:aws:iam::000000000000:oidc-provider/token.actions.githubusercontent.com',
            },
          },
        ],
      },
    });
  });
});