resource "aws_eip" "nat-eip" {
  vpc        = true
  depends_on = [aws_internet_gateway.igw]

  tags = { Name = "reelcruit-eip" }
}

resource "aws_nat_gateway" "nat-gateway" {
  allocation_id = aws_eip.nat-eip.id
  subnet_id     = aws_subnet.reelcruit-public-subnet-one.id
  depends_on    = [aws_internet_gateway.igw]

  tags = { Name = "reelcruit-nat-gateway" }
}
