version = 0.1
[dev]
[dev.deploy]
[dev.deploy.parameters]
stack_name = "wf-just-orders"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-12ky6ivps081q"
s3_prefix = "wf-just-orders"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
parameter_overrides = "StackTagName=\"dev\" EnvironmentTagName=\"dev\" EnvironmentAPIGatewayStageName=\"dev\""
