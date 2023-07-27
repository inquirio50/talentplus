resource "aws_security_group" "reelcruit-datalayer-sg" {
  name        = "reelcruit-datalayer-sg"
  vpc_id      = aws_vpc.reelcruit-vpc.id
  description = "Datalayer Security Group"

  tags = { Name = "reelcruit-datalayer-sg" }
}

resource "aws_security_group_rule" "allow_from_web_to_efs" {
  type              = "ingress"
  from_port         = 2049
  to_port           = 2049
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.reelcruit-datalayer-sg.id
}

resource "aws_security_group_rule" "allow_from_efs_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.reelcruit-datalayer-sg.id
}
