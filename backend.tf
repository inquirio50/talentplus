#terraform {
#backend "s3" {
#bucket         = "reelcruit-state-bucket-prod"
#key            = "Prod_Infrastructure/terraform.tfstate"
#region         = "eu-west-1"
#dynamodb_table = "terraform_state"
#}
#}