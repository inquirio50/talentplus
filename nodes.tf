resource "aws_eks_node_group" "private-nodes" {
  cluster_name    = aws_eks_cluster.reelcruit-cluster.name
  node_group_name = "reelcruit-private-nodes"
  node_role_arn   = aws_iam_role.reelcruit-nodes-policy.arn

  subnet_ids = [
    aws_subnet.reelcruit-private-subnet-one.id,
    aws_subnet.reelcruit-private-subnet-two.id
  ]

  capacity_type  = "ON_DEMAND"
  instance_types = ["c5.xlarge"]

  scaling_config {
    desired_size = 3
    max_size     = 5
    min_size     = 1
  }

  update_config { max_unavailable = 1 }

  labels = { "role" = "general" }

  depends_on = [
    aws_iam_role_policy_attachment.reelcruit-AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.reelcruit-AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.reelcruit-AmazonEC2ContainerRegistryReadOnly
  ]

  tags = { Name = "reelcruit-private-node-group" }
}