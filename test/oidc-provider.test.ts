import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GithubActionRole } from '../src';

describe('GithubActionRole construct', () => {
  test('basic configuration with one repo', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new GithubActionRole(stack, 'MyProvider', {
      repos: ['myuser/myrepo'],
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
              StringLike: {
                'token.actions.githubusercontent.com:sub': ['repo:myuser/myrepo:*'],
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

  test('basic configuration with multiple repos', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new GithubActionRole(stack, 'MyProvider', {
      repos: [
        'myuser/myrepo',
        'myuser/myrepo2',
        'myuser/myrepo3',
      ],
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
              StringLike: {
                'token.actions.githubusercontent.com:sub': [
                  'repo:myuser/myrepo:*',
                  'repo:myuser/myrepo2:*',
                  'repo:myuser/myrepo3:*',
                ],
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
    new GithubActionRole(stack, 'MyProvider', {
      repos: ['myuser/myrepo'],
      provider: GithubActionRole.existingGithubActionsProvider(stack),
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
              StringLike: {
                'token.actions.githubusercontent.com:sub': ['repo:myuser/myrepo:*'],
              },
            },
            Principal: {
              Federated: {
                'Fn::Join': [
                  '',
                  [
                    'arn:aws:iam::',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    ':oidc-provider/token.actions.githubusercontent.com',
                  ],
                ],
              },
            },
          },
        ],
      },
    });
  });

  test('Policy has correct permissions', () => {
    // GIVEN
    const stack = new Stack();

    // WHEN
    new GithubActionRole(stack, 'MyProvider', {
      repos: ['myuser/myrepo'],
    });

    // THEN
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      Policies: [{
        PolicyDocument: {
          Statement: [{
            Action: 'sts:AssumeRole',
            Resource: '*',
            Effect: 'Allow',
            Condition: {
              'ForAnyValue:StringEquals': {
                'iam:ResourceTag/aws-cdk:bootstrap-role': [
                  'deploy',
                  'lookup',
                  'file-publishing',
                  'image-publishing',
                ],
              },
            },
          }, {
            Action: 'ecr:GetAuthorizationToken',
            Resource: '*',
            Effect: 'Allow',
          }],
        },
      }],
    });
  });
});
