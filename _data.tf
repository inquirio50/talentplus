data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_eks_cluster" "reelcruit-cluster" {
  name = resource.aws_eks_cluster.reelcruit-cluster.id
}


data "aws_eks_cluster_auth" "reelcruit-cluster" {
  name = resource.aws_eks_cluster.reelcruit-cluster.id
}


output "endpoint" {
  value = data.aws_eks_cluster.reelcruit-cluster.id
}
