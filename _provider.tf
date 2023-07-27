# Configure the AWS Provider
provider "aws" {
  region = "eu-west-1"
  # profile = "reelcruiter"
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.reelcruit-cluster.endpoint
  token                  = data.aws_eks_cluster_auth.reelcruit-cluster.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.reelcruit-cluster.certificate_authority.0.data)
}

# provider "kubernetes" {
#   config_path    = "~/.kube/config"
#   config_context = "arn:aws:eks:us-east-1:054550991362:cluster/reelcruit-cluster"
# }