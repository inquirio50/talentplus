data "tls_certificate" "reelcruit" {
  url = aws_eks_cluster.reelcruit-cluster.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "reelcruit" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = data.tls_certificate.reelcruit.certificates[*].sha1_fingerprint
  url             = data.tls_certificate.reelcruit.url
}