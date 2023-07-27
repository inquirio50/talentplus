# create route table for the private subnets 
resource "aws_route_table" "private-rtb" {
  vpc_id = aws_vpc.reelcruit-vpc.id

  tags = { Name = "Private-Route-Table" }
}


# create route for the private route table and attatch a nat gateway to it
resource "aws_route" "private-rtb-route" {
  route_table_id         = aws_route_table.private-rtb.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat-gateway.id
}


# associate all private subnets to the private route table
resource "aws_route_table_association" "reelcruit-private-subnet-one-assoc" {
  subnet_id      = aws_subnet.reelcruit-private-subnet-one.id
  route_table_id = aws_route_table.private-rtb.id
}

resource "aws_route_table_association" "reelcruit-private-subnet-two-assoc" {
  subnet_id      = aws_subnet.reelcruit-private-subnet-two.id
  route_table_id = aws_route_table.private-rtb.id
}

resource "aws_route_table_association" "reelcruit-datalayer-subnet-assoc" {
  subnet_id      = aws_subnet.reelcruit-datalayer-subnet.id
  route_table_id = aws_route_table.private-rtb.id
}

