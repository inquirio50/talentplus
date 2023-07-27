locals {
  public-tags = {
    "kubernetes.io/role/elb"                  = "1"
    "kubernetes.io/cluster/reelcruit-cluster" = "shared"
  }
  private-tags = {
    "kubernetes.io/role/internal-elb"         = "1"
    "kubernetes.io/cluster/reelcruit-cluster" = "shared"
  }
  tag = {
    "kubernetes.io/cluster/reelcruit-cluster" = "shared"
  }
}

locals {
  ports_in  = [22, 80, 3000, 8080, 443]
  ports_out = [0]
}

