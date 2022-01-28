set -x
npx cdk-assets --path "cdk.out/assembly-StageA/StageABucketStackEAC67DBE.assets.json" --verbose publish "bdb08b9984816ecf43301a0c6d8913e270ee2448940b6b95e430dd222a4d90be:489318732371-us-east-1"
npx cdk-assets --path "cdk.out/assembly-StageB/StageBBucketStackDF3FFF07.assets.json" --verbose publish "bdb08b9984816ecf43301a0c6d8913e270ee2448940b6b95e430dd222a4d90be:489318732371-eu-west-1"