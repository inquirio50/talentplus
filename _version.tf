terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.4"
    }

    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}
