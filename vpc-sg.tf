resource "aws_security_group" "reelcruit-sg" {
  name        = "reelcruit-sg"
  description = "Allows defined inbound traffic for this webservers"
  vpc_id      = aws_vpc.reelcruit-vpc.id

  dynamic "ingress" {
    for_each = toset(local.ports_in)
    content {
      description = ""
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  dynamic "egress" {
    for_each = toset(local.ports_out)
    content {
      description = ""
      from_port   = egress.value
      to_port     = egress.value
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  tags = { Name = "reelcruit-security-group" }
}
