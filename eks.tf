# EKS Cluster 
resource "aws_eks_cluster" "reelcruit-cluster" {
  name     = "reelcruit-cluster"
  role_arn = aws_iam_role.reelcruit-cluster-policy.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.reelcruit-private-subnet-one.id,
      aws_subnet.reelcruit-private-subnet-two.id
    ]
  }

  depends_on = [aws_iam_role_policy_attachment.reelcruit-AmazonEKSClusterPolicy]

  tags = { Name = "reelcruit-eks-cluster" }
}