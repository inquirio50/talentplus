# create route table for the public subnets
resource "aws_route_table" "public-rtb" {
  vpc_id = aws_vpc.reelcruit-vpc.id

  tags = { Name = "Public-Route-Table" }
}


# create route for the public route table and attach the internet gateway
resource "aws_route" "public-rtb-route" {
  route_table_id         = aws_route_table.public-rtb.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.igw.id
}


# associate all public subnets to the public route table
resource "aws_route_table_association" "reelcruit-public-subnet-one-assoc" {
  subnet_id      = aws_subnet.reelcruit-public-subnet-one.id
  route_table_id = aws_route_table.public-rtb.id
}

resource "aws_route_table_association" "reelcruit-public-subnet-two-assoc" {
  subnet_id      = aws_subnet.reelcruit-public-subnet-two.id
  route_table_id = aws_route_table.public-rtb.id
}


